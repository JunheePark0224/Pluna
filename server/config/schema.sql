CREATE DATABASE Pluna;

USE Pluna;

CREATE TABLE Users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,            -- Users 테이블과 연관된 사용자 ID
    user_input JSON NOT NULL,                -- 사용자 입력 데이터 (JSON)
    recommendations JSON NOT NULL,           -- 추천 워크북 데이터 (JSON)
    schedule JSON NOT NULL,                  -- 생성된 스케줄 데이터 (JSON)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 생성 시각
    FOREIGN KEY (user_id) REFERENCES Users(id)       -- Users 테이블과 연결
);