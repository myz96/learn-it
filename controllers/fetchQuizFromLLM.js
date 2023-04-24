const express = require('express'); 
const axios = require('axios')
require('dotenv').config()
// const { getQuiz } = require('../models/');

const router = express.Router()

// API route for getting a quiz from chatGPT
router.post("/api/quizzes/", async (req, res, next) => {
    try {
        const topic = req.body.topic
        const difficulty = req.body.difficulty || 'medium'
        const context = req.body.context || ''
        const quizQuery = { topic, difficulty, context }
        console.log(quizQuery)
        //const searchQuery = req.query.q
        response = await fetchQuizFromLLM(quizQuery)
        res.send(response)
    } catch(error) {
        console.log(error)
        return res.sendStatus(500)
    }
})



module.exports = router
