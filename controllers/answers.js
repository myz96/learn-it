const express = require('express')
const { getAllAnswers, getAnswerById, createAnswer, deleteAnswerById, updateAnswerById } = require('../models/answer')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const result = await getAllAnswers()
        return (result.length === 0) ? res.sendStatus(404) : res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await getAnswerById(id)
        return res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { userId, quizId, questionID, userAnswer, correctAnswer, correct } = req.body

        if (!userId || !quizId || !questionID || !userAnswer || !correctAnswer || !correct) {
            const customError = new Error("Must include user id, quiz id, question id, user answer, correct answer and whether or not the answer was correct.")
            customError.status = 400
            return next(customError)
        } 
    
        const result = await createAnswer(userId, quizId, questionID, userAnswer, correctAnswer, correct)
        return res.status(200).json(result[0])
    } catch (error) {
        return next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) 
            return res.status(400).json({ message: 'Invalid answer ID' })

        const result = await deleteAnswerById(id)

        return res.status(200).json({ message: 'Answer deleted successfully' })
    } catch (error) {
        return next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const { userId, quizId, questionID, userAnswer, correctAnswer, correct } = req.body

        if (!userId && !quizId && !questionID && !userAnswer && !correctAnswer && !correct) {
            const customError = new Error("We require at least one value for user id, quiz id, question id, user answer, correct answer and whether or not the answer was correct.")
            customError.status = 400
            return next(customError)
        }

        const updatedAnswer = await updateAnswerById(id, userId, quizId, questionID, userAnswer, correctAnswer, correct)
       
        return res.status(200).json(updatedAnswer)  
    } catch (error) {
        return next(error)
    }
})

module.exports = router