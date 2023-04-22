// quizResponse represents a typical response from Chat GPT when we ask for a JSON object

// Prompt was something like this:
// Please provide a quiz with 6 multiple choice questions of medium difficulty on the topic
// "the simpsons". Provide response as a JSON object. Indicate which is the correct 
// answer with a boolean. Only provide a JSON object, don't provide anything else.  

// What other info might be useful to have in JSON object..? 
// * Quiz topic name (ChatGPT seems to be good at generating a quiz name even given a messy input e.g. if passed highschoolgeometry it will return High School Geometry
// * Quiz difficulty
// * Quiz type (e.g. multiple choice, text) - or would we always do multi choice to keep it simple 
// * Number of questions in quiz, number of answers 

const quizResponse = {
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
  
  // Returns the next question. 
  // This will eventually just be an API call to our Node express server
  let questionCounter = 0
  let playerPoints = 0
  const numberOfQuestions = 5
  function getNextQuestion() {
    questionCounter++
    if (questionCounter <= numberOfQuestions) {
      return quizResponse.questions[questionCounter]
    } else {
      return false
    }
  }
  
  // Renders the quiz
  function renderQuiz() {
        playerPoints = 0
        questionCounter = 0
        renderNextQuestion()
  }
  
  // Removes the current question from the DOM
  function deleteCurrentQuestion() {
    const quizQuestion = document.querySelector('.quizQuestion')
    quizQuestion && quizQuestion.remove()
  }
  
  // Renders the next question 
  function renderNextQuestion() {
    deleteCurrentQuestion()
    const quizQuestion = getNextQuestion()
  
    // If there's a quizQuestion, render it. If not, render the end of quiz message. 
    if (quizQuestion) {
        const quizQuestionDiv = document.createElement('div')
        quizQuestionDiv.classList.add('quizQuestion')
        quizQuestionDiv.innerHTML = `<h3>${quizQuestion.question}</h3>`
        for (let option of quizQuestion.options) {
            const quizAnswer = document.createElement('div')
            quizAnswer.innerHTML = option.text
            quizAnswer.classList.add('quizButton')
            if (option.correct) {
                quizAnswer.addEventListener('click', correctOptionHandler)
            } else {
                quizAnswer.addEventListener('click', incorrectOptionHandler)
            }
            quizQuestionDiv.appendChild(quizAnswer)
        }
        const quizDiv = document.querySelector('#quiz-div')
        quizDiv.appendChild(quizQuestionDiv)
       } else {
        renderEndOfQuizPage()
       }
    }
  
  // Renders the end of quiz page
  function renderEndOfQuizPage() {
    const quizQuestionDiv = document.createElement('div')
    quizQuestionDiv.innerHTML = `<h3>End of quiz!</h3>
    You got ${playerPoints} questions correct!`
    const quizDiv = document.querySelector('#quiz-div')
    quizDiv.appendChild(quizQuestionDiv)
  } 
  
  // Handles a player getting the correct answer
  function correctOptionHandler(event) {
    playerPoints++
    event.target.classList.add('correctAnswer')
    setTimeout(renderNextQuestion, 1000)
  }
  
  // Handles a player getting the wrong answer
  function incorrectOptionHandler(event) {
    event.target.classList.add('incorrectAnswer')
    setTimeout(renderNextQuestion, 1000)
  }
  
  renderQuiz()
  
  
  
  //
  // Everything below this line is a work in progress
  //
  
  
  // TODO - create a Quiz object - work in progress 
  class Quiz {
    constructor(questions) {
      this.score = 0
      this.questions = questions // Array of questions?
      this.numberOfQuestions = questions.length
      this.questionCounter = 0
      this.pointsPerQuestion = 5
    }
  
    // Currently assumes multiple choice, hence uses an index. kahoot allows free entry. 
    submitAnswer(question, answerIndex) {
      const points = this.gradeAnswer(question, answer)
      this.score += points 
      this.questionCounter ++
      this.loadNextQuestion()
    }
  
    // Initially set points to 5 - kahoot adjusts based on time
    gradeAnswer(question, answerIndex) {
      if (question.answerIndex['correct'] === true) {
        return this.pointsPerQuestion 
      } else {
        return 0
      }
    }
    loadNextQuestion() {
      // TODO - use this to load next question
    }
  
  }
  
  // TODO - create a question object
  class Question {
    // TODO
  }
  
  // TODO - make this a single page app?
  
  function getQuiz(quizString) {
    // Fetches the quizObject for a given quizString (e.g. High School History)
  }