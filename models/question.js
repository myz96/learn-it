const db = require("../database/db")

const getAllQuestions = async (id) => {
  const result = await db.query(`SELECT * FROM questions WHERE user_id = $1;`, [id])
  return result.rows
}

const getQuestionById = async (id) => {
  const result = await db.query(`SELECT * FROM questions WHERE id = $1;`, [id])
  return result.rows
}

const deleteQuestionById = async (id) => {
  const result = await db.query('DELETE FROM questions WHERE id = $1', [id])
  return result.rowCount
}

const deleteQuestionByQuizId = async (id) => {
  const result = await db.query('DELETE FROM questions WHERE quiz_id = $1', [id])
  return result.rowCount
}

const createQuestion = async (user_id, quiz_id, question, user_answer, correct) => {
  const sql = "INSERT INTO questions (user_id, quiz_id, question, user_answer, correct) VALUES ($1, $2, $3, $4, $5) RETURNING *;"
  const result = await db.query(sql, [user_id, quiz_id, question, user_answer, correct])
  return result.rows
}

module.exports = {
  getAllQuestions
  , getQuestionById
  , deleteQuestionById
  , createQuestion
  , deleteQuestionByQuizId
}