require('dotenv').config()

const express = require('express')
const session = require('express-session')

const db = require('./database/db')

const quizzesController = require('./controllers/quizzes')
const questionsController = require('./controllers/questions')
const usersController = require('./controllers/users')
const sessionController = require('./controllers/session')
const shareController = require('./controllers/share')

const logger = require('./middleware/logger')
const errorHandler = require('./middleware/error-handler')

const pgSession = require('connect-pg-simple')(session)

const app = express()
const PORT = process.env.PORT || 3000

// Set up middleware from express 
app.use(express.static('client'))
app.use(express.json())

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false, 
  saveUninitialized: false, // if true , all requests (even if nothing happens) will create session in db - used to track anon users. if false, will only save if create/add data. usually want false.  
  store: new pgSession({
    pool: db,
    createTableIfMissing: true, 
  })
}))

db.query(`DROP TABLE IF EXISTS answers;
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
`)

app.use(logger)

app.use('/api/quizzes', quizzesController)
app.use('/api/questions', questionsController)
app.use('/api/users', usersController)
app.use('/api/session', sessionController)
app.use('/share', shareController)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})
