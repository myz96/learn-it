import browseQuizzes from "./browseQuizzes.js"
import createQuiz from "./createQuiz.js"
import renderEditUser from "./editUser.js"
import renderProgressPage from "./renderProgress.js"


const renderHeader = (user) => {
  const header = document.querySelector('#header')
  header.innerHTML = `
    <h1 class="logo">Logo</h1>
    <p>Logged in as ${user.first_name} <button class="profile-btn">Edit Profile</button><button class="logout-btn">Logout</button></p>
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
    if (target.className === 'profile-btn') {
      renderEditUser(user)
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
