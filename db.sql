CREATE DATABASE like_system;
USE like_system;

CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_ip VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE like_counter (
    id INT PRIMARY KEY,
    total_likes INT DEFAULT 0
);

INSERT INTO like_counter (id, total_likes) VALUES (1, 0);

