const pg = require('pg')

const db = new pg.Pool({
  database: 'scavenger_hunt'
})

module.exports = db