const { Configuration, OpenAIApi } = require("openai")

const fetchImage = async (prompt) => {
    const config = new Configuration({
        apiKey: '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'
    })

    const openai = new OpenAIApi(config)

    const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: '1024x1024'
    })

    return response.data.data[0].url
}

module.exports = {fetchImage}