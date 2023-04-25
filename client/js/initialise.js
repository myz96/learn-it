import browseQuizzes from "./components/browseQuizzes.js";
import createQuiz from "./components/createQuiz.js";
import renderLoadingPage from "./components/renderLoading.js";
import renderProgressPage from "./components/renderProgress.js";
import renderQuiz from "./components/renderQuiz.js";

browseQuizzes()
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
