const handleForm = async (e) => {
    e.preventDefault()

    const form = e.target
    const body = Object.fromEntries(new FormData(form))
    
    const errorText = document.querySelector('#errors')

    if (!body.email || !body.password) {
        errorText.textContent = "Email or password cannot be empty"
    } else {
        try {
            const response = await axios.post('/api/session', body)
            if (response.status !== 200) {
                errorText.textContent = "Email or password is incorrect" 
                return Promise.reject(response)
            } else {
                errorText.textContent = "Successfully logged in" 
                return window.location.replace('/')
            }
        } catch {
            errorText.textContent = "Email or password is incorrect" 
        }
    }
} 

document.querySelector('.auth-form').addEventListener('submit', handleForm)
