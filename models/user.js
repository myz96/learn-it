const db = require("../database/db")

const getAllChallenges = async () => {
  const result = await db.query("SELECT id, name FROM challenges;")
  return result.rows
}

const getChallengeById = async (id) => {
  const result = await db.query(`SELECT * FROM challenges WHERE id = $1;`, [id])
  return result.rows
}

const deleteChallengeById = async (id) => {
  const result = await db.query('DELETE FROM challenges WHERE id = $1', [id])
  return result.rows
}

const createChallenge = async (name, description, address) => {
  const sql = "INSERT INTO challenges (name, description, address) VALUES ($1, $2, $3) RETURNING *;"
  const result = await db.query(sql, [name, description, address])
  return result.rows
}

const updateChallengeById = async (id, name, description, address) => {
  let paramPosition = 2
  const valuesToUpdate = []
  const params = [id]

  if(name){
    params.push(name)
    valuesToUpdate.push(`name = $${paramPosition}`)
    paramPosition++
  }

  if(description){
    params.push(description)
    valuesToUpdate.push(`description = $${paramPosition}`)
    paramPosition++
  }

  if(address){
    params.push(address)
    valuesToUpdate.push(`address = $${paramPosition}`)
    paramPosition++
  }

  const sql = `UPDATE challenges SET ${valuesToUpdate.join(', ')} WHERE id = $1 RETURNING *`
  const result = await db.query(sql, params)
  return result.rows
}

module.exports = {
  getAllChallenges
  , getChallengeById
  , deleteChallengeById
  , createChallenge
  , updateChallengeById
}