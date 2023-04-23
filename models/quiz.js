const db = require("../database/db")

const getAllQuizzes = async () => {
  const result = await db.query("SELECT id, quiz FROM quizzes;")
  return result.rows
}

const getQuizById = async (id) => {
  const result = await db.query(`SELECT * FROM quizzes WHERE id = $1;`, [id])
  return result.rows
}

const deleteQuizById = async (id) => {
  const result = await db.query('DELETE FROM quizzes WHERE id = $1', [id])
  return result.rowCount
}

const createQuiz = async (user_id, quiz, title, topic, difficulty, context) => {
  const sql = "INSERT INTO quizzes (user_id, quiz, title, topic, difficulty, context) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;"
  const result = await db.query(sql, [user_id, quiz, title, topic, difficulty, context])
  return result.rows
}

const updateQuizById = async (id, user_id, quiz, title, prompt, difficulty, context) => {
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
    addUpdate('quiz', quiz)
    addUpdate('title', title)
    addUpdate('prompt', prompt)
    addUpdate('difficulty', difficulty)
    addUpdate('context', context)
  
    const sql = `UPDATE quizzes SET ${valuesToUpdate.join(', ')} WHERE id = $1 RETURNING *`
    const result = await db.query(sql, params)
    return result.rows
  }

module.exports = {
  getAllQuizzes
  , getQuizById
  , deleteQuizById
  , createQuiz
  , updateQuizById
}