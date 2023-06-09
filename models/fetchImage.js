const { Configuration, OpenAIApi } = require("openai")

const fetchImage = async (prompt) => {
    try {
        const config = new Configuration({
            apiKey: process.env.API_KEY
        })
    
        const openai = new OpenAIApi(config)
    
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '1024x1024'
        })
    
        return response.data.data[0].url
    } catch {
        return 'https://source.unsplash.com/collection/happy-people'
    }
}

module.exports = {fetchImage}