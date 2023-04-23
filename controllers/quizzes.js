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
        const { userId, title, topic, difficulty, context } = req.body

        if (!quiz) {
            const customError = new Error("Quiz cannot be empty")
            customError.status = 400
            return next(customError)
        } 

        const prompt = `
        Please provide a quiz with 6 multiple choice questions of ${difficulty} difficulty on ${topic}. 
        Please incorporate questions with ${context} context. 
        Provide response as a JSON object.
        Indicate which is the correct 
        Answer with a boolean. 
        Only provide a JSON object, don't provide anything else.  
        `

        const mockData = {
            "questions": [
                {
                "question": "What is the name of the Simpsons' next-door neighbor?",
                "options": [
                    {"text": "Moe", "correct": false},
                    {"text": "Ned", "correct": true},
                    {"text": "Lenny", "correct": false},
                    {"text": "Carl", "correct": false}
                ]
                },
                {
                "question": "What is the name of Bart's best friend?",
                "options": [
                    {"text": "Milhouse", "correct": true},
                    {"text": "Nelson", "correct": false},
                    {"text": "Martin", "correct": false},
                    {"text": "Ralph", "correct": false}
                ]
                },
                {
                "question": "What is the name of Homer's favorite bar?",
                "options": [
                    {"text": "Moe's Tavern", "correct": true},
                    {"text": "The Rusty Nail", "correct": false},
                    {"text": "The Drunken Clam", "correct": false},
                    {"text": "The Alibi Room", "correct": false}
                ]
                },
                {
                "question": "What is the name of Lisa's jazz musician idol?",
                "options": [
                    {"text": "Bleeding Gums Murphy", "correct": true},
                    {"text": "Cool Cat", "correct": false},
                    {"text": "Fingers Murphy", "correct": false},
                    {"text": "Jazzy Joe", "correct": false}
                ]
                },
                {
                "question": "What is the name of the Simpson family's pet greyhound?",
                "options": [
                    {"text": "Santa's Little Helper", "correct": true},
                    {"text": "Laddie", "correct": false},
                    {"text": "Ziggy", "correct": false},
                    {"text": "Fido", "correct": false}
                ]
                },
                {
                "question": "What is the name of the town where the Simpsons live?",
                "options": [
                    {"text": "Springfield", "correct": true},
                    {"text": "Shelbyville", "correct": false},
                    {"text": "Capital City", "correct": false},
                    {"text": "Ogdenville", "correct": false}
                ]
                }
            ]
        }

        const quiz = mockData // Replace with chatGPT API using prompt above
    
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