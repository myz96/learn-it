const handleFormSubmit = async (e) => {
    e.preventDefault()

    const form = e.target
    // const action = form.dataset.action
    const body = Object.fromEntries(new FormData(form))

    const errorText = document.querySelector('#errors')
    const existingUser = await axios.get('/api/users/' + body.email)

    try {
        if (body.password.length < 8) {
            errorText.textContent = "Password must be at least 8 characters long"
        } else if (!body.first_name || !body.last_name || !body.email || !body.password) {
            errorText.textContent = "Name, email and password cannot be empty"
        } else if (existingUser.data[0]) {
            errorText.textContent = "Email address is already in use" 
        } else {
            const response = await axios.post('/api/users', body)
            console.log()

            if (response.status !== 200) {
                errorText.textContent = "Error" 
                return Promise.reject(response)
            } else {
                errorText.textContent = "Account successfully created"
                return window.location = '/'
            }
        }
    } catch {
        errorText.textContent = "Error" 
    }
} 

document.querySelector('.auth-form').addEventListener('submit', handleFormSubmit)
