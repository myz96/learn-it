const express = require('express')
const bcrypt = require('bcrypt')
const { getUserByEmail } = require('../models/user')
const router = express.Router()

const isValidPassword = (password, hash) => bcrypt.compareSync(password, hash)

router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body

        if(!email){
            const customError = new Error("Please enter your email address")
            customError.status = 400
            return next(customError)
        }
        if (!password) {
            const customError = new Error("Please enter your password")
            customError.status = 400
            return next(customError)
        }

        const result = await getUserByEmail(email)
        const user = result[0]

        if (user && isValidPassword(password, user.password_hash)){
            delete user.password_hash
            req.session.user = user
            return res.status(200).json({ message: "Successfully Logged in!", id: user.id})
        }

        const err = new Error("Invalid email address or password")
        err.status = 400
        throw err
    } catch (error) {
        return next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const { user } = req.session
        if (!user)
            return res.status(401).json({ message: "Not logged in" })
        return res.json({ user })
    } catch (error) {
        return next(error)
    }
})

router.delete('/', (req, res, next) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out" })
    })
})

module.exports = router