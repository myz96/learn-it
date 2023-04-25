const db = require("../database/db")

const getAllQuestions = async () => {
  const result = await db.query("SELECT * FROM questions;")
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

const createQuestion = async (user_id, quiz_id, question, user_answer, correct_answer) => {
  const sql = "INSERT INTO questions (user_id, quiz_id, question, user_answer, correct_answer) VALUES ($1, $2, $3, $4, $5) RETURNING *;"
  const result = await db.query(sql, [user_id, quiz_id, question, user_answer, correct_answer])
  return result.rows
}

module.exports = {
  getAllQuestions
  , getQuestionById
  , deleteQuestionById
  , createQuestion
}