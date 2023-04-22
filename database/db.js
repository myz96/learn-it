const pg = require('pg')

const db = new pg.Pool({
  database: 'sei-project-3'
})

module.exports = db