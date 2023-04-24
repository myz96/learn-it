const { validateJson } = require('./validateJson') 

async function fetchQuizFromLLM(quizQuery) {
    const numberOfQuestions = 6

    // This schema uses the 'JSON Schema' which is used by Ajv https://ajv.js.org/guide/getting-started.html
    // We can use this for testing, and can pass this to chatGPT so it knows what format we want
    const quizSchema = {
        type: "object",
        properties: {
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: 
                    {type: "string"},
                options: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            answer: {type: "string"},
                            correct: {type: "boolean"}
                        },
                        required: ["answer", "correct"],
                        additionalProperties: false 
                    }
                }
              },
              required: ["question", "options"],
              additionalProperties: false 
            }
          }
        },
        required: ["questions"],
        additionalProperties: false 
    }

    const promptText = `
    Please provide a quiz with ${numberOfQuestions} multiple choice questions 
    of ${quizQuery.difficulty} difficulty level 
    on the topic ${quizQuery.topic}. 
    Please incorporate questions with the context: ${quizQuery.context}.
    Provide response as a JSON object. 
    Only provide a JSON object, don't provide anything else in your response.
    The JSON object shall comply with the following schema: ${JSON.stringify(quizSchema)}`  

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

    if (validateJson(JSON.parse(quizResponse), quizSchema)) {
        return quizResponse
    }
    return false
    // console.log('validate Json returned: ', validateJson(JSON.parse(quizResponse), quizSchema))
    // console.log(quizResponse)
    // return quizResponse
}

//console.log('res data: ', response)

module.exports = { fetchQuizFromLLM }

