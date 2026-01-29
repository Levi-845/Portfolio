import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// MiddleWares
app.use(cors());
app.use(bodyParser.json());

// DB Connection
const db = mysql.createConnection({
  host: "localhost",               // mySQL Host
  user: "root",                   //  mySQL User
  password: "ahQR2F28HT9$#*;",   //  mySQL PassWord
  database: "like_system"       // DataBase Name
});

db.connect((err) => {
  if (err) {
    console.error("MySQL error: ", err);
    return;
  }
  console.log("MySQL Connected...");
});

// ✅ Get current like count
app.get("/likes", (req, res) => {
  db.query("SELECT total_likes FROM like_counter WHERE id = 1", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ count: result[0].total_likes });
  });
});

// ✅ Like button click
app.post("/like", (req, res) => {
  const user_ip = req.ip; // user ki IP lenge

  // check agar user already like kar chuka hai
  db.query("SELECT * FROM likes WHERE user_ip = ?", [user_ip], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length > 0) {
      return res.json({ message: "Already liked", success: false });
    }

    // insert new like
    db.query("INSERT INTO likes (user_ip) VALUES (?)", [user_ip], (err) => {
      if (err) return res.status(500).send(err);

      // counter update
      db.query("UPDATE like_counter SET total_likes = total_likes + 1 WHERE id = 1", (err2) => {
        if (err2) return res.status(500).send(err2);

        res.json({ message: "Like added", success: true });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});