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
  CONSTRAINT fk_quizzes_users
    FOREIGN KEY (user_id)
    REFERENCES users(id)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  quiz_id INT,
  question TEXT,
  choices TEXT,
  CONSTRAINT fk_questions_quizzes
    FOREIGN KEY (quiz_id)
    REFERENCES quizzes(id)
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  user_id INT, 
  quiz_id INT,
  question_id INT,
  user_answer TEXT,
  correct_answer TEXT,
  correct INT,
  CONSTRAINT fk_answers_users
    FOREIGN KEY (user_id)
    REFERENCES users(id),
  CONSTRAINT fk_answers_quizzes
    FOREIGN KEY (quiz_id)
    REFERENCES quizzes(id),
  CONSTRAINT fk_answers_questions
    FOREIGN KEY (question_id)
    REFERENCES questions(id)
);


