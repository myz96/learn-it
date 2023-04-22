const express = require('express'); 
const axios = require('axios')
require('dotenv').config()
// const { getQuiz } = require('../models/');

const router = express.Router()

// API route for getting a quiz from chatGPT
// Uses query params, so can be /quiz&q=high-school-chemistry
router.get("/quiz", async (req, res, next) => {
    try {
        const searchQuery = req.query.q
        response = await fetchQuizFromLLM(searchQuery)
        res.send('searchQuery: ' + response)
    } catch(error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

async function fetchQuizFromLLM(quizQuery) {
    const promptText = `Please provide a quiz with 6 multiple choice questions of medium difficulty on the topic ${quizQuery}. Provide response as a JSON object. Indicate which is the correct answer with a boolean. Only provide a JSON object, don't provide anything else.`  
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
