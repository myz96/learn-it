const express = require('express')
const { getQuizById } = require('../models/quiz')
const path = require('path')

const router = express.Router()

// For now use id. In future, may be better to use a longer string (hash something in db?) 
// so people can't easily find + play other peoples quizzes by just changing the id number
router.get('/', async (req, res, next) => {
    try {
        // const id = parseInt(req.params.id)
        // console.log(id)
        // const quizResponse = await getQuizById(id)
        // console.log(quizResponse)

        // // Mock data
        // const quiz = {
        //     "questions": [
        //         {
        //         "question": "What is the name of the Simpsons' next-door neighbor?",
        //         "options": [
        //             {"text": "Moe", "correct": false},
        //             {"text": "Ned", "correct": true},
        //             {"text": "Lenny", "correct": false},
        //             {"text": "Carl", "correct": false}
        //         ]
        //         },
        //         {
        //         "question": "What is the name of Bart's best friend?",
        //         "options": [
        //             {"text": "Milhouse", "correct": true},
        //             {"text": "Nelson", "correct": false},
        //             {"text": "Martin", "correct": false},
        //             {"text": "Ralph", "correct": false}
        //         ]
        //         },
        //         {
        //         "question": "What is the name of Homer's favorite bar?",
        //         "options": [
        //             {"text": "Moe's Tavern", "correct": true},
        //             {"text": "The Rusty Nail", "correct": false},
        //             {"text": "The Drunken Clam", "correct": false},
        //             {"text": "The Alibi Room", "correct": false}
        //         ]
        //         },
        //         {
        //         "question": "What is the name of Lisa's jazz musician idol?",
        //         "options": [
        //             {"text": "Bleeding Gums Murphy", "correct": true},
        //             {"text": "Cool Cat", "correct": false},
        //             {"text": "Fingers Murphy", "correct": false},
        //             {"text": "Jazzy Joe", "correct": false}
        //         ]
        //         },
        //         {
        //         "question": "What is the name of the Simpson family's pet greyhound?",
        //         "options": [
        //             {"text": "Santa's Little Helper", "correct": true},
        //             {"text": "Laddie", "correct": false},
        //             {"text": "Ziggy", "correct": false},
        //             {"text": "Fido", "correct": false}
        //         ]
        //         },
        //         {
        //         "question": "What is the name of the town where the Simpsons live?",
        //         "options": [
        //             {"text": "Springfield", "correct": true},
        //             {"text": "Shelbyville", "correct": false},
        //             {"text": "Capital City", "correct": false},
        //             {"text": "Ogdenville", "correct": false}
        //         ]
        //         }
        //     ]
        // }

        // const quiz = JSON.parse(quizResponse)
        
        // Learnt this from stackoverlfow: https://stackoverflow.com/questions/25463423/res-sendfile-absolute-path
        return res.sendFile(path.join(__dirname, '../client', 'play.html'))

        //return res.status(200).json(quizResult[0])
    } catch (error) {
        return next(error)
    }
})

module.exports = router