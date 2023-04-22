INSERT INTO users (email, password_hash, first_name, last_name) VALUES ('mz@example.com', 'password_hash', 'Michael', 'Zhao');

INSERT INTO quizzes (user_id, quiz, prompt, difficulty, context) VALUES (1, 1, 'Simpsons', 'Easy', 'From Season 1-4 in Simpsons');

INSERT INTO questions (quiz_id, question, choices) 
VALUES (1, 'What is the name of the Simpsons'' next-door neighbor?', 
    '[
        {"text": "Moe", "correct": false},
        {"text": "Ned", "correct": true},
        {"text": "Lenny", "correct": false},
        {"text": "Carl", "correct": false}
    ]');
INSERT INTO questions (quiz_id, question, choices)
VALUES (1, 'What is the name of Bart''s best friend?', 
    '[
        {"text": "Milhouse", "correct": true},
        {"text": "Nelson", "correct": false},
        {"text": "Martin", "correct": false},
        {"text": "Ralph", "correct": false}
    ]');
INSERT INTO questions (quiz_id, question, choices) VALUES (1, 'What is the name of Homer''s favorite bar?', 
    '[
        {"text": "Moe''s Tavern", "correct": true},
        {"text": "The Rusty Nail", "correct": false},
        {"text": "The Drunken Clam", "correct": false},
        {"text": "The Alibi Room", "correct": false}
    ]');

INSERT INTO answers (user_id, quiz_id, question_id, user_answer, correct_answer, correct) VALUES (1, 1, 1, 'B', 'B', 1);
INSERT INTO answers (user_id, quiz_id, question_id, user_answer, correct_answer, correct) VALUES (1, 1, 2, 'B', 'A', 0);
INSERT INTO answers (user_id, quiz_id, question_id, user_answer, correct_answer, correct) VALUES (1, 1, 3, 'D', 'A', 0);
