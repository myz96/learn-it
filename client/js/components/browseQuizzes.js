import renderQuiz from "./renderQuiz.js"

// Home page to browse all quizzes
const browseQuizzes = async () => {
    const main = document.querySelector('#quiz-div')

    try {
        const response = await axios.get('/api/quizzes')
        if (response.data.length === 0) {
            main.innerHTML = `<div id='quiz-div'>You don't have any quizzes yet. <br> Click the + icon above to create one now!</div>` 
        } 
            main.innerHTML = `
            `
            for (let quiz of response.data) {
                const deleteQuiz = async (quizId) => {
                    await axios.delete(`/api/quizzes/${quizId}`)
                    container.remove()
                }

                const container = document.createElement('div')
                container.style.paddingBottom = '110px'
                const deleteIcon = document.createElement('i')
                const image = document.createElement('img')
                const cardBody = document.createElement('div')
                const cardTitle = document.createElement('h5')
                const cardSubtitle = document.createElement('h6')
                const cardParagraph = document.createElement('p')
                const button = document.createElement('a')

                const shareIcon = document.createElement('a')
                shareIcon.classList.add('btn')
                shareIcon.classList.add('custom-btn')
                shareIcon.style.position = 'absolute'
                shareIcon.style.bottom = '130px'
                shareIcon.style.right = '10px'
                shareIcon.innerText = 'Share Quiz'
                cardBody.append(shareIcon)
                shareIcon.addEventListener('click', function(event) {
                    const shareUrlDiv = document.createElement('div')
                    shareUrlDiv.classList.add('share-url-div')
                    shareUrlDiv.style.position = 'absolute'
                    shareUrlDiv.style.bottom = '0px'
                    shareUrlDiv.style.left = '0px'
                    shareUrlDiv.style.width = '100%'
                    const currentURL = `${window.location.origin}/`
                    shareUrlDiv.innerHTML = 
                    `To share with a friend, just send them this link: 
                    <a href="${currentURL}share?id=${quiz.id}">${currentURL}share?id=${quiz.id}</a>
                    <span class='close-share-url-div'>(Close)</span>`
                    cardBody.append(shareUrlDiv)
                    const closeShareUrlBtn = document.querySelector('.close-share-url-div')
                    closeShareUrlBtn.addEventListener('click', function() {
                        shareUrlDiv.remove()
                    })
                })

                container.classList.add('card')
                container.style.width = '18rem'
                container.style.position = 'relative'
                deleteIcon.classList.add('fas')
                deleteIcon.classList.add('fa-trash')
                deleteIcon.style.position = 'absolute'
                deleteIcon.style.top = '10px'
                deleteIcon.style.right = '10px'
                deleteIcon.style.cursor = 'pointer'
                deleteIcon.onclick = () => deleteQuiz(quiz.id)
                image.classList.add('card-img-top')
                image.style.height = '200px'
                image.style.objectFit = 'cover'
                cardBody.classList.add('card-body')
                cardTitle.classList.add('card-title')
                cardSubtitle.classList.add('card-subtitle')
                cardSubtitle.classList.add('mb-2')
                cardSubtitle.classList.add('text-muted')
                cardParagraph.classList.add('card-text')
                button.href = '#' 
                button.classList.add('btn')
                button.classList.add('custom-btn')

                const quizResponse = await axios.get(`/api/quizzes/${quiz.id}`)
                cardTitle.textContent = quizResponse.data[0].title
                cardSubtitle.textContent = quizResponse.data[0].difficulty
                cardParagraph.textContent = quizResponse.data[0].topic
                image.src = quizResponse.data[0].image_url
                button.textContent = 'Take Quiz'

                main.append(container)
                container.append(image)
                container.append(cardBody)
                cardBody.append(cardTitle)
                cardBody.append(cardSubtitle)
                cardBody.append(cardParagraph)
                cardBody.append(button)
                cardBody.append(deleteIcon)

                button.addEventListener('click', function(event) {
                    // Put quiz data into same format that createQuiz passes to renderQuiz
                    const quizQuestions = quizResponse.data[0].quiz
                    const quizObject = {}
                    quizObject.data = {}
                    quizObject.data.quiz = quizQuestions
                    quizObject.data.id = quiz.id
                    const quizDiv = document.querySelector('#quiz-div')
                    quizDiv.innerHTML = ""
                    renderQuiz((quizObject))
                })
            }

            main.style.display = 'grid'
            main.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))'
            main.style.gridGap = '20px'
            main.style.justifyItems = 'center'
        } catch {
        main.innerHTML = `<div id='quiz-div'>Internal server error</div>` 
    }
}

export default browseQuizzes