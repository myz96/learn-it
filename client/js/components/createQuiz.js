// Create user input page, that converts string into prompt below

import renderQuiz from "./renderQuiz.js"

// Mock Data to be replaced with chatGPT api response
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

        const quizResponse = mockData // Replace with chatGPT API using prompt above

        body.userId = 1 // Replace with user session
        body.quiz = quizResponse

        const response = await axios.post('/api/quizzes', body)
        console.log(response)
        
        const main = document.querySelector('#quiz-div')
        main.innerHTML = ``
        
        return renderQuiz()
    } catch (error) {
        console.log(error)
    }
} 

export default createQuiz