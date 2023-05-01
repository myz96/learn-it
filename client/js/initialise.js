import browseQuizzes from "./components/browseQuizzes.js";
import renderHeader from "./components/renderHeader.js";

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
