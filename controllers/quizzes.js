const express = require('express')
const { getQuizById, createQuiz, deleteQuizById, updateQuizById, getAllQuizzesbyUserId } = require('../models/quiz')
const { fetchQuizFromLLM } = require('../models/fetchQuiz')
const { fetchImage } = require('../models/fetchImage')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const id = req.session.user.id
        const result = await getAllQuizzesbyUserId(id) // Replace with user session
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
        const { title, topic } = req.body
        const userId = req.session.user.id
        console.log(userId)

        const difficulty = req.body.difficulty || 'medium'
        const context = req.body.context || ''
        const quizQuery = { topic, difficulty, context }

        if (!quizQuery) {
            const customError = new Error("Quiz cannot be empty")
            customError.status = 400
            return next(customError)
        } 

        // // Mock data
        const quiz = {
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

        const imgUrl = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-M4tHPAmLSbtutEWD7DSkmcHM/user-k1CSFIT7U70b8IDeJ3WYKOJT/img-QnPgAg5wXpDMUfJZ69VkCS4t.png?st=2023-04-27T10%3A57%3A46Z&se=2023-04-27T12%3A57%3A46Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-27T11%3A42%3A02Z&ske=2023-04-28T11%3A42%3A02Z&sks=b&skv=2021-08-06&sig=5zOEVujZ4a5mkA4FSQr93mj5ub1Q8LEwe%2BV9gH2WsqM%3D'

        // const quizResponse = await fetchQuizFromLLM(quizQuery)
        // const quiz = JSON.parse(quizResponse)
        // const imgUrl = await fetchImage(topic)

        // console.log(quiz)
        // console.log(imgUrl)
        // Store JSON quiz into quiz database
        const quizResult = await createQuiz(userId, quiz, title, topic, difficulty, context, imgUrl)

        return res.status(200).json(quizResult[0])
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