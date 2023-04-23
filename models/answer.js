const db = require("../database/db")

const getAllAnswers = async (id) => {
  const result = await db.query("SELECT * FROM answers WHERE user_id = $1;", [id])
  return result.rows
}

const getAnswerById = async (id) => {
  const result = await db.query(`SELECT * FROM answers WHERE id = $1;`, [id])
  return result.rows
}

const deleteAnswerById = async (id) => {
  const result = await db.query('DELETE FROM answers WHERE id = $1', [id])
  return result.rowCount
}

const createAnswer = async (user_id, quiz_id, question_id, user_answer, correct_answer, correct) => {
  const sql = "INSERT INTO answers (user_id, quiz_id, question_id, user_answer, correct_answer, correct) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;"
  const result = await db.query(sql, [user_id, quiz_id, question_id, user_answer, correct_answer, correct])
  return result.rows
}

const updateAnswerById = async (id, user_id, quiz_id, question_id, user_answer, correct_answer, correct) => {
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
  
    addUpdate('user_id', user_id)
    addUpdate('quiz_id', quiz_id)
    addUpdate('question_id', question_id)
    addUpdate('user_answer', user_answer)
    addUpdate('correct_answer', correct_answer)
    addUpdate('correct', correct)
  
    const sql = `UPDATE answers SET ${valuesToUpdate.join(', ')} WHERE id = $1 RETURNING *`
    const result = await db.query(sql, params)
    return result.rows
  }

module.exports = {
  getAllAnswers
  , getAnswerById
  , deleteAnswerById
  , createAnswer
  , updateAnswerById
}