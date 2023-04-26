import browseQuizzes from "./components/browseQuizzes.js";
import createQuiz from "./components/createQuiz.js";
import renderHeader from "./components/renderHeader.js";
import renderLoadingPage from "./components/renderLoading.js";
import renderProgressPage from "./components/renderProgress.js";
import renderQuiz from "./components/renderQuiz.js";

const initialise = async () => {
    try {
        const res = await axios.get('/api/session')
        const data = res.data

        if ('user' in data){
            renderHeader(data.user)
            browseQuizzes()
        } else {
            window.location = '/login.html'
        }
    } catch (error) {
        window.location = '/login.html'
        console.log(error)
    }
}

initialise()

// browseQuizzes()
// renderProgressPage()
// renderLoadingPage()
// createQuiz()
// renderQuiz()

// const initialise = async () => {
//     try {
//         const res = await axios.get('/api/session')
//         const data = res.data

//         if ('user' in data){
//             renderQuiz()
//         } else {
//             window.location = '/signup.html'
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// initialise()
