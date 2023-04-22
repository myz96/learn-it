const express = require('express')
const { getAllQuestions, getQuestionById, deleteQuestionById, updateQuestionById } = require('../models/question')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const result = await getAllQuestions()
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
        const { quizId, question, choices } = req.body

        if (!quizId || !question || !choices) {
            const customError = new Error("Quiz ID, question and choices cannot be empty")
            customError.status = 400
            return next(customError)
        } 
    
        const result = await createQuiz(quizId, question, choices)
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

router.put('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const { quizId, question, choices } = req.body

        if (!quizId && !question && !choices) {
            const customError = new Error("We require at least one value for Quiz ID, question or choices")
            customError.status = 400
            return next(customError)
        }

        const updatedQuestion = await updateQuestionById(id, quizId, question, choices)
       
        return res.status(200).json(updatedQuestion)  
    } catch (error) {
        return next(error)
    }
})

module.exports = router