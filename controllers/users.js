const express = require('express')
const bcrypt = require('bcrypt')
const createUser = require('../models/user')
const router = express.Router()

const generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

router.post('/', (req, res, next) => {
  const { first_name, last_name, email, password } = Object.entries(req.body).reduce((o, [k, v]) => {
    o[k] = v.trim()
    return o
  }, {})

  if (!first_name) {
    const customError = new Error("Please enter your First Name")
    customError.status = 400
    return next(customError)
  }

  if (!last_name) {
    const customError = new Error("Please enter your Last Name")
    customError.status = 400
    return next(customError)  }

  if (!email) {
    const customError = new Error("Please enter a valid email address")
    customError.status = 400
    return next(customError)  }

  if (!password) {
    const customError = new Error("Please your password")
    customError.status = 400
    return next(customError) 
  }

  const password_hash = generateHash(password)

  createUser(first_name, last_name, email, password_hash)
})

module.exports = router
