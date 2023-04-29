const express = require('express')
const bcrypt = require('bcrypt')
const { createUser, getAllUsers, getUserByEmail, updateUserById, getUserById } = require('../models/user')

const router = express.Router()

const generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

// Sign up
router.post('/', async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, confirm_password } = Object.entries(req.body).reduce((o, [k, v]) => {
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
            return next(customError)
        }

        if (!email) {
            const customError = new Error("Please enter a valid email address")
            customError.status = 400
            return next(customError)
        }

        if (!password) {
            const customError = new Error("Please enter a password")
            customError.status = 400
            return next(customError)
        }

        if (password !== confirm_password) {
            const customError = new Error("Passwords do not match")
            customError.status = 400
            return next(customError)
        }

        const password_hash = generateHash(password)

        const result = await createUser(first_name, last_name, email, password_hash)
        const user = result[0]
        if (user) {
            console.log(user)
            req.session.user = user
        } 
        return res.status(200).json(result[0])
    } catch (error) {
        return next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers()
        return res.json(users)
    } catch (error) {
        next(error)
    }
})

router.get('/:email', async (req, res, next) => {
    try {
        const email = req.params.email
        const user = await getUserByEmail(email)
        if (user.length === 0) return res.status(404).end()
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const { first_name, last_name, email, password, confirm_password } = req.body

        if (!first_name) {
            const customError = new Error("Please enter your First Name")
            customError.status = 400
            return next(customError)
        }

        if (!last_name) {
            const customError = new Error("Please enter your Last Name")
            customError.status = 400
            return next(customError)
        }

        if (!email) {
            const customError = new Error("Please enter a valid email address")
            customError.status = 400
            return next(customError)
        }

        if (!password) {
            const customError = new Error("Please enter a password")
            customError.status = 400
            return next(customError)
        }

        if (password !== confirm_password) {
            const customError = new Error("Passwords do not match")
            customError.status = 400
            return next(customError)
        }

        const password_hash = generateHash(password)

        const result = await updateUserById(id, first_name, last_name, email, password_hash)
        
        // Update user with latest data from db 
        const newResult = await getUserByEmail(email)
        const newUserData = newResult[0]
        req.session.user = newUserData

        return res.status(200).json(result[0])
    } catch (error) {
        return next(error)
    }
})


module.exports = router
