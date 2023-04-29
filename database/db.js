const pg = require('pg')

const db = new pg.Pool({
  database: 'sei_project_3'
})

module.exports = db