const express = require('express')
const bcrypt = require('bcrypt')

const db = require('../database/db')

const router = express.Router()

const generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

router.post('/', (req, res, next) => {
  const { first_name, last_name, email, password } = Object.entries(req.body).reduce((o, [k, v]) => {
    o[k] = v.trim()
    return o
  }, {})


  let validationMessages = []

  if (!first_name) {
    validationMessages.push('First name is required')
  }

  if (!last_name) {
    validationMessages.push('Last name is required')
  }

  if (!email) {
    validationMessages.push('email is required')
  }

  if (!password) {
    validationMessages.push('password is required')
  }

  if (validationMessages.length) {
    return res.status(400).json({
      success: false,
      message: 'Signup form invalid',
      validationMessages
    })
  }

  const password_hash = generateHash(password)
  const sql = `
    INSERT INTO users(first_name, last_name, email, password_hash) 
    VALUES($1, $2, $3, $4)
    RETURNING id, first_name, last_name, email
    `
  db.query(sql, [first_name, last_name, email, password_hash])
    .then(dbRes => res.json({ success: true, user: dbRes.rows[0] }))
    .catch((err) => {
      if (err.code === '23505' && err.constraint === 'users_email_key') {
        err = new Error('Email already in use')
        err.status = 400
      }
      next(err)
    })
})

module.exports = router
