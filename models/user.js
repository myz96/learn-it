const db = require("../database/db")

const getAllUsers = async () => {
  const result = await db.query("SELECT id, email, first_name, last_name FROM users;")
  return result.rows
}

const createUser = async (first_name, last_name, email, password_hash) => {
  const sql = "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3) RETURNING first_name, last_name, email;"
  const result = await db.query(sql, [first_name, last_name, email, password_hash])
  return result.rows
}

const getUserByEmail = async (email) => {
  const result = await db.query("SELECT * FROM users WHERE email = $1;", [email])
  return result.rows
}

const deleteUserById = async (id) => {
  const result = await db.query('DELETE FROM users WHERE id = $1', [id])
  return result.rowCount
}

const updateUserById = async (id, name, email, password_hash) => {
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

  addUpdate('name', name)
  addUpdate('email', email)
  addUpdate('password_hash', password_hash)

  const sql = `UPDATE users SET ${valuesToUpdate.join(', ')} WHERE id = $1 RETURNING *`
  const result = await db.query(sql, params)
  return result.rows
}

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  updateUserById,
  deleteUserById
}