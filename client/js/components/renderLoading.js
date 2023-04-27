const renderLoadingPage = () => {
    const main = document.querySelector('#quiz-div')

    main.innerHTML = `
    <div id="loading">
        <div id="loading-text">Generating Content...</div>
    </div>
    `
    
    const phrases = [
        'Assembling your quizmaster toolkit, please wait...',
        'Crafting clever questions and captivating quizzes, hold tight!',
        'Molding masterful quizzes, give us a moment to gather greatness...',
        'Stitching together the fabric of your trivia tapestry, standby...',
        'Whipping up a batch of brain-teasing brainteasers, loading in progress...'
    ];
    
    let currentPhraseIndex = 0;
    
    function fadeIn(element) {
      let opacity = 0;
      element.style.opacity = opacity;
    
      const fadeInInterval = setInterval(() => {
        opacity += 0.05;
        element.style.opacity = opacity;
    
        if (opacity >= 1) {
          clearInterval(fadeInInterval);
          setTimeout(() => {
            fadeOut(element);
          }, 1000);
        }
      }, 100);
    }
    
    function fadeOut(element) {
      let opacity = 1;
      element.style.opacity = opacity;
    
      const fadeOutInterval = setInterval(() => {
        opacity -= 0.05;
        element.style.opacity = opacity;
    
        if (opacity <= 0) {
          clearInterval(fadeOutInterval);
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
          element.innerText = phrases[currentPhraseIndex];
          setTimeout(() => {
            fadeIn(element);
          }, 1000);
        }
      }, 100);
    }
    
    setTimeout(() => {
      fadeIn(document.getElementById('loading-text'));
    }, 1000);
}

export default renderLoadingPage