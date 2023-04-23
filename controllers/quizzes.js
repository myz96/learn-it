const express = require('express')
const { getAllQuizzes, getQuizById, createQuiz, deleteQuizById, updateQuizById } = require('../models/quiz')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const result = await getAllQuizzes()
        return (result.length === 0) ? res.sendStatus(404) : res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await getQuizById(id)
        return res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { userId, quiz, title, topic, difficulty, context } = req.body

        if (!quiz) {
            const customError = new Error("Quiz cannot be empty")
            customError.status = 400
            return next(customError)
        } 
    
        const result = await createQuiz(userId, quiz, title, topic, difficulty, context)
        return res.status(200).json(result[0])
    } catch (error) {
        return next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) 
            return res.status(400).json({ message: 'Invalid quiz ID' })

        const result = await deleteQuizById(id)

        return res.status(200).json({ message: 'Quiz deleted successfully' })
    } catch (error) {
        return next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const { userId, quiz, title, topic, difficulty, context } = req.body

        if (!quiz && !title && !topic && !difficulty && !context) {
            const customError = new Error("We require at least one value for quiz, title, difficult or context")
            customError.status = 400
            return next(customError)
        }

        const updatedQuiz = await updateQuizById(id, userId, quiz, title, topic, difficulty, context)
       
        return res.status(200).json(updatedQuiz)  
    } catch (error) {
        return next(error)
    }
})

module.exports = router