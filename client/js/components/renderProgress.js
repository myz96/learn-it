// Page for users to see their progress
// Show highscore
// Show % correct for all quizzes
// Show all previous questions

const renderProgressPage = async () => {
    const main = document.querySelector('#quiz-div')
    main.style.gridTemplateColumns = '1fr'
    main.innerHTML = ``

    // Creating elements
    const scoreContainer = document.createElement('div')
    const answersContainer = document.createElement('div')

    scoreContainer.style.display = 'flex'
    scoreContainer.style.width = '70%'
    scoreContainer.style.justifyContent = 'space-evenly'

    scoreContainer.innerHTML = `
    <div class="card mb-3" style="max-width: 18rem;">
        <div class="card-header">High Score</div>
        <div class="card-body">
            <h5 class="card-title highscore"></h5>
            <p class="card-text">questions answered correctly!</p>
        </div>
    </div>
    <div class="card mb-3" style="max-width: 18rem;">
        <div class="card-header">Percent Correct</div>
        <div class="card-body">
            <h5 class="card-title percent-correct"></h5>
            <p class="card-text">of all quiz answers were answered correctly</p>
        </div>
    </div>
    `
    main.append(scoreContainer)
    main.append(answersContainer)

    const highscoreElement = document.querySelector('.highscore')
    const percentCorrectElement = document.querySelector('.percent-correct')
    
    // Getting all answers
    const response = await axios.get(`/api/questions/`)

    // Calculating high score
    const groupedData = response.data.reduce((accumulator, answer) => {
        const quizId = answer.quiz_id
        if (!accumulator[quizId])
            accumulator[quizId] = []
        accumulator[quizId].push(answer)
        return accumulator
    }, {})

    let highscore = 0
    for (const quizId in groupedData) {
        const quizData = groupedData[quizId]
        const totalScore = quizData.reduce((accumulator, correct) => {
            const points = (correct.correct === 'true') ? 1 : 0
            return accumulator + points
        }, 0)
        if (totalScore > highscore)
            highscore = totalScore
    }

    console.log('res.data is', response.data)
    // Calculating percentage correct
    const numberCorrect = response.data.reduce((accumulator, correct) => {
        const points = (correct.correct === 'true') ? 1 : 0
        return accumulator + points 
    }, 0)
    const numberQuestions = response.data.length
    const percentCorrect = (numberCorrect/numberQuestions).toFixed(2) * 100

    // Displaying calculations
    highscoreElement.textContent = highscore
    percentCorrectElement.textContent = `${percentCorrect}%`

    // Create table
    // For each answer in table, show the quiz title, question, user_answer, correct answer, and correct
    answersContainer.innerHTML = `
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Quiz</th>
            <th scope="col">Question</th>
            <th scope="col">Answer</th>
            <th scope="col">Correct</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `
    const tbody = document.querySelector('tbody')

    for (let answer of response.data) {
        const row = document.createElement('tr')
        const questionIdCell = document.createElement('td')
        const quizTitleCell = document.createElement('td') 
        const questionCell = document.createElement('td') 
        const answerCell = document.createElement('td') 
        const correctCell = document.createElement('td') 
        
        const { id:questionId, quiz_id:quizId, user_answer:userAnswer,correct } = answer

        const quizResponse = await axios.get(`/api/quizzes/${quizId}`)
        const questionResponse = await axios.get(`/api/questions/${questionId}`)

        questionIdCell.textContent = questionId
        quizTitleCell.textContent = quizResponse.data[0].title 
        questionCell.textContent = questionResponse.data[0].question
        answerCell.textContent = userAnswer
        correctCell.textContent = correct

        row.append(questionIdCell)
        row.append(quizTitleCell)
        row.append(questionCell)
        row.append(answerCell)
        row.append(correctCell)
        tbody.append(row)
    }
}

export default renderProgressPage
