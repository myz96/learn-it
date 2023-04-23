import createQuiz from "./components/createQuiz.js";
import renderLoadingPage from "./components/renderLoading.js";
import renderQuiz from "./components/renderQuiz.js";

renderLoadingPage()
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
