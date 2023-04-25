import renderQuizList from "./browseQuizzes.js"
import renderRules from "./renderRules.js"
import renderCreateQuiz from "./createQuiz.js"

const renderHeader = (user) => {
  const header = document.querySelector('#header-nav')
  header.innerHTML = `
    <h1>Scavenger Hunt</h1>
    <p>Logged in as ${user.name} <button class="logout-btn">Logout</button></p>
    <ul id="navlist">
      <li role="button" data-render="quizList">Quizzes</li>
      <li role="button" data-render="rules">Rules</li>
      <li role="button" data-render="addQuiz">Add Quiz</li>
    </ul>
  `

  header.addEventListener('click', ({ target }) => {
    if (target.className === 'logout-btn') {
      return fetch('/api/session', {
        method: 'DELETE'
      }).then(() => {
        window.location = '/login.html'
      })
    }
    const render = target.dataset.render
    switch (render) {
      case 'quizList':
        renderQuizList()
        break;
      case 'rules':
        renderRules()
        break
      case 'addQuiz':
        renderCreateQuiz()
        break
    }
  })
}

export default renderHeader
