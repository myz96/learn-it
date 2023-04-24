// Create user input page, that converts string into prompt below

import renderLoadingPage from "./renderLoading.js"
import renderQuiz from "./renderQuiz.js"

// Mock Data to be replaced with chatGPT api response


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
        body.userId = 1 // Replace with user session

        renderLoadingPage()
        const response = await axios.post('/api/quizzes', body)
        
        const main = document.querySelector('#quiz-div')
        main.innerHTML = ``
        
        console.log(response)
        return renderQuiz(response)
    } catch (error) {
        console.log(error)
    }
} 

export default createQuiz