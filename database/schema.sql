DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT
);

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  user_id INT,
  quiz TEXT,
  title TEXT,
  topic TEXT,
  difficulty TEXT,
  context TEXT,
  image_url TEXT,
  CONSTRAINT fk_quizzes_users
    FOREIGN KEY (user_id)
    REFERENCES users(id)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INT, 
  quiz_id INT,
  question TEXT,
  user_answer TEXT,
  correct TEXT,
  CONSTRAINT fk_questions_users
    FOREIGN KEY (user_id)
    REFERENCES users(id)
);


