-- Communicare database schema
-- Creates database and symptom reports table

CREATE DATABASE IF NOT EXISTS communicare;

USE communicare;

CREATE TABLE IF NOT EXISTS symptom_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    body_part VARCHAR(50) NOT NULL,
    symptom_type VARCHAR(50) NOT NULL,
    severity ENUM('mild', 'moderate', 'severe') NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'reviewed', 'resolved')
        NOT NULL DEFAULT 'pending'
);