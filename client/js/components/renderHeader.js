import browseQuizzes from "./browseQuizzes.js"
import createQuiz from "./createQuiz.js"
import renderEditUser from "./editUser.js"
import renderProgressPage from "./renderProgress.js"


const renderHeader = (user) => {
  const header = document.querySelector('#header')
  header.innerHTML = `
  <div class="bg-white d-flex align-items-center fixed-top shadow" style="min-height: 56px; z-index: 6">
    <div class="container-fluid">
      <div class="row align-items-center">
        <!-- search -->
        <div class="col d-flex align-items-center">
          <!-- logo -->
          <a href="/">
            <img src="/img/logo.png" alt="logo" style="width:30px">
          </a>
        </div>
        <!-- nav -->
        <div class="col d-none d-xl-flex justify-content-center">
          <!-- home -->
          <div class="mx-4 nav__btn nav__btn-active" data-render="quizList">
            <button type="button" class="btn px-4" data-render="quizList">
              <i class="fas fa-home text-muted fs-4" data-render="quizList"></i>
            </button>
          </div>
          <!-- add quiz -->
          <div class="mx-4 nav__btn" data-render="addQuiz">
            <button type="button" class="btn px-4" data-render="addQuiz">
              <i class="fas fa-plus text-muted fs-4" data-render="addQuiz"></i>
            </button>
          </div>
          <!-- progress -->
          <div class="mx-4 nav__btn" data-render="progress">
            <button type="button" class="btn px-4" data-render="progress">
              <i class="fas fa-table text-muted fs-4" data-render="progress"></i>
            </button>
          </div>
        </div>
        <!-- menus -->
        <div class="col d-flex align-items-center justify-content-end">
          <!-- avatar -->
          <div class="align-items-center justify-content-center nav__btn d-none d-xl-flex" data-render="profile">
          <button type="button" class="btn px-4" style="display: flex; align-items: center;">
            <img src="https://source.unsplash.com/collection/nature" class="rounded-circle me-2" alt="avatar" style="width: 30px; height: 30px; object-fit: cover" data-render="profile"/>
            <p class="m-0 text-white" style="padding: 0 5px 0 10px;" data-render="profile">${user.first_name}</p>
          </button>
        </div>
          <!-- notifications -->
          <div>
          <button class="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2 logout-btn" style="width: 38px; height: 38px" type="button" data-render="logout">
            <i class="fas fa-arrow-right" data-render="logout"></i>
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `

  header.addEventListener('click', async ({ target }) => {
    const render = target.dataset.render
    switch (render) {
      case 'quizList':
        browseQuizzes()
        break
      case 'addQuiz':
        createQuiz()
        break
      case 'progress':
        renderProgressPage()
        break
      case 'profile':
        renderEditUser(user)
        break
      case 'logout':
        const logout = axios.delete('/api/session')
        window.location = '/login.html'
        break
    }
  })
}

export default renderHeader
