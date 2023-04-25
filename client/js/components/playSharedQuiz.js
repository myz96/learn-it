import renderQuiz from "./renderQuiz.js"
async function loadSharedQuiz() {
    // Get id from url, format is /share?id=3 where 3 is the quiz-id
    const currentURL = document.URL;
    const quizId = currentURL.replace(/.*\?id=/,"")
    // console.log('quiz ID: ', quizId)

    // Fetch the quiz data from our server
    const response = await axios.get(`/api/quizzes/${quizId}`)
    const quizQuestions = response.data[0].quiz
    
    // Put quiz data into same format that createQuiz passes to renderQuiz
    const quizObject = {}
    quizObject.data = {}
    quizObject.data.quiz = quizQuestions
    //console.log(quizObject)

    // Pass it to renderQuiz()
    return renderQuiz(quizObject)
}

loadSharedQuiz()


