const db = require("../models");
const { hscode : HSCode, user : User } = db;


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion (req){
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req,
    max_tokens: 100,
    temperature: 0,
    });
    console.log(response.data.choices[0].text);
    return response;
}

module.exports = {runCompletion}

