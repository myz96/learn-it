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

async function fetchQuizFromLLM(quizQuery) {
    const numberOfQuestions = 6

    const promptText = `
    Please provide a quiz with ${numberOfQuestions} multiple choice questions 
    of ${quizQuery.difficulty} difficulty level 
    on the topic ${quizQuery.topic}. 
    Please incorporate questions with the context: ${quizQuery.context}.
    Provide response as a JSON object. The top level of the JSON object shall be named questions.
    Each possible option to the question shall be named option. 
    Under each possible option, indicate whether it is correct or incorrect with a boolean named correct. 
    Only provide a JSON object, don't provide anything else in your response.`  

    const apiUrl = 'https://api.openai.com/v1/chat/completions'

    const requestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [{ role: "user", content: promptText}] // promptText}]
      };
    
    // const requestHeaders = {
    //     'Content-Type': 'application/json',
    //     'Authorization': "Bearer " + process.env.API_KEY //,
    //   };
    // const response = await axios.post(apiUrl, requestBody, requestHeaders)

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.API_KEY 
         }, 
         body: JSON.stringify(requestBody)
    })
    const responseBody = await response.json()

    const quizResponse = responseBody.choices[0].message.content  || false
    console.log(quizResponse)
    return quizResponse
    }
    //console.log('res data: ', response)

module.exports = router
