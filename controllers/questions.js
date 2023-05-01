const express = require('express')
const { getAllQuestions, getQuestionById, deleteQuestionById, updateQuestionById, createQuestion } = require('../models/question')


const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const id = req.session.user.id
        const result = await getAllQuestions(id) 
        return (result.length === 0) ? res.sendStatus(404) : res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await getQuestionById(id)
        return res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { quizId, question, userAnswer, correct } = req.body
        const userId = req.session.user.id

        if (!quizId || !question || !userAnswer) {
            const customError = new Error("Quiz ID, question and answers cannot be empty")
            customError.status = 400
            return next(customError)
        } 
        
        const result = await createQuestion(userId, quizId, question, userAnswer, correct.toString())
        return res.status(200).json(result[0])
    } catch (error) {
        return next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) 
            return res.status(400).json({ message: 'Invalid question ID' })

        const result = await deleteQuestionById(id)

        return res.status(200).json({ message: 'Question deleted successfully' })
    } catch (error) {
        return next(error)
    }
})

module.exports = router