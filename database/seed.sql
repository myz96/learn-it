INSERT INTO users (email, password_hash, first_name, last_name) VALUES ('mz@example.com', 'password_hash', 'Michael', 'Zhao');

INSERT INTO quizzes (user_id, quiz, title, topic, difficulty, context, image_url) VALUES (1, 1, 'Simpsons', 'The Simpsons Quiz', 'Easy', 'From Season 1-4 in Simpsons', 'https://source.unsplash.com/collection/happy-people');

INSERT INTO questions (user_id, quiz_id, question, user_answer, correct) VALUES (1, 1, 'What is the name of Homer''s favorite bar?', 'B', 1);
INSERT INTO questions (user_id, quiz_id, question, user_answer, correct) VALUES (1, 1, 'What is the name of Bart''s best friend?', 'B', 0);
INSERT INTO questions (user_id, quiz_id, question, user_answer, correct) VALUES (1, 1, 'What is the name of the Simpsons'' next-door neighbor?', 'D', 0);
