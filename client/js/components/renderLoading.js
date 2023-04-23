const renderLoadingPage = () => {
    const main = document.querySelector('#quiz-div')

    main.innerHTML = `
        <div class="spinner-border" role="status">
           <span class="sr-only">Loading...</span>
        </div>
        <h3>Creating your quiz...</h3>
    `
}

export default renderLoadingPage