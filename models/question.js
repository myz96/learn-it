const db = require("../database/db")

const getAllQuestions = async () => {
  const result = await db.query("SELECT id, quiz_id, question FROM questions;")
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

const createQuestion = async (quiz_id, question, choices) => {
  const sql = "INSERT INTO questions (quiz_id, question, choices) VALUES ($1, $2, $3) RETURNING *;"
  const result = await db.query(sql, [quiz_id, question, choices])
  return result.rows
}

const updateQuestionById = async (id, quiz_id, question, choices) => {
    let paramPosition = 2
    const valuesToUpdate = []
    const params = [id]
  
    const addUpdate = (field, value) => {
      if (value) {
          params.push(value)
          valuesToUpdate.push(`${field} = $${paramPosition}`)
          paramPosition++
      }
    }
  
    addUpdate('quiz_id', quiz_id)
    addUpdate('question', question)
    addUpdate('choices', choices)
  
    const sql = `UPDATE questions SET ${valuesToUpdate.join(', ')} WHERE id = $1 RETURNING *`
    const result = await db.query(sql, params)
    return result.rows
  }

module.exports = {
  getAllQuestions
  , getQuestionById
  , deleteQuestionById
  , createQuestion
  , updateQuestionById
}