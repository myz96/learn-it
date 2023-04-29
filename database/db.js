const pg = require('pg')

const db = new pg.Pool(process.env.DATABASE_URL ? { 
  connectionString: process.env.DATABASE_URL
} : {
  database: 'sei_project_3'
})

module.exports = db