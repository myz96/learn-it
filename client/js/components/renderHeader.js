import browseQuizzes from "./browseQuizzes.js"
import createQuiz from "./createQuiz.js"
import renderProgressPage from "./renderProgress.js"


const renderHeader = (user) => {
  const header = document.querySelector('#header')
  header.innerHTML = `
    <h1 class="logo">Scavenger Hunt</h1>
    <p>Logged in as ${user.first_name} <button class="logout-btn">Logout</button></p>
    <ul id="navlist">
      <li role="button" data-render="quizList">Quizzes</li>
      <li role="button" data-render="addQuiz">Add Quiz</li>
      <li role="button" data-render="progress">Progress</li>
    </ul>
  `

  header.addEventListener('click', async ({ target }) => {
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
        browseQuizzes()
        break;
      case 'addQuiz':
        createQuiz()
        break
      case 'progress':
        renderProgressPage()
        break
    }
  })
}

export default renderHeader
