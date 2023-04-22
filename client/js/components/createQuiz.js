// Create user input page, that converts string into prompt below

import renderQuiz from "./renderQuiz.js"

// Prompt was something like this:
// Please provide a quiz with 6 multiple choice questions of medium difficulty on the topic
// "the simpsons". Please incorporate questions with [XYZ] context. Provide response as a JSON object. 
// Indicate which is the correct 
// answer with a boolean. Only provide a JSON object, don't provide anything else.  

const createQuiz = () => {
    const main = document.querySelector('#quiz-div')
    main.innerHTML = `
    <form id="create-quiz">
        <h1>Create new quiz</h1>
        <p><label for="title">Title</label><input type="text" name="title" id="title"></p>
        <p><label for="topic">Topic</label><input type="text" name="topic" id="topic"></p>
        <p><label for="difficulty">Difficulty</label><input type="text" name="difficulty" id="difficulty"></p>
        <p><label for="context">Context</label><textarea type="text" name="context" id="context" rows="4" cols= "50" placeholder="Insert additional context here"></textarea></p>
        <button type="submit"> Create quiz </button>
    </form>
    `

    document.querySelector('#create-quiz').addEventListener('submit', handleFormSubmit)
}

const handleFormSubmit = async (e) => {
    try {
        e.preventDefault()

        const body = Object.fromEntries(new FormData(e.target))
    
        const prompt = `
        Please provide a quiz with 6 multiple choice questions of ${body.difficulty} difficulty on ${body.topic}. 
        Please incorporate questions with ${context} context. 
        Provide response as a JSON object.
        Indicate which is the correct 
        Answer with a boolean. 
        Only provide a JSON object, don't provide anything else.  
        `
        // const response = Hit chatGPT api
        // add response to body object
    
        const response = await axios.post('/api/quizzes/', body)
        console.log(response)
    
        return renderQuiz()
    } catch (error) {
        console.log(error)
    }
} 

export default createQuiz