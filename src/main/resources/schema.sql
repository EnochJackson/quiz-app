DESC options;

--@block
SELECT * from questions;

--@block
DELETE FROM users
WHERE username <> 'admin';


--@block
SELECT * FROM users;

--@BLOCK
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE options;
TRUNCATE TABLE questions;

SET FOREIGN_KEY_CHECKS = 1;

--@BLOCK
DELETE FROM options;
DELETE FROM questions;

--@block
DELETE FROM questions WHERE id NOT IN (SELECT DISTINCT question_id FROM options);

--@block
SELECT * FROM questions WHERE id NOT IN (SELECT DISTINCT question_id FROM options);


--@block
INSERT INTO questions (text) VALUES
('What is 2 + 2?'),
('What is the capital of France?'),
('Who wrote "Hamlet"?');

--@block
-- Q1: What is 2 + 2?
INSERT INTO options (text, question_id, correct) VALUES
('3', 1, 0),
('4', 1, 1),
('5', 1, 0);

-- Q2: What is the capital of France?
INSERT INTO options (text, question_id, correct) VALUES
('London', 2, 0),
('Paris', 2, 1),
('Berlin', 2, 0);

-- Q3: Who wrote "Hamlet"?
INSERT INTO options (text, question_id, correct) VALUES
('Charles Dickens', 3, 0),
('William Shakespeare', 3, 1),
('Leo Tolstoy', 3, 0);


--@block
SELECT * from options;

--@block
CREATE TABLE IF NOT EXISTS quiz_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_questions INT NOT NULL,
    correct_answers INT NOT NULL,
    score INT NOT NULL
);