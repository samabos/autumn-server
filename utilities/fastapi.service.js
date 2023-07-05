
const axios = require('axios');



async function mlModelFastAPI (req){

    const postData = { text: req };
    try{
        const response = await axios.post('http://127.0.0.1:8000/predict', postData);
        return response.data
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
    return [];
}

module.exports = {mlModelFastAPI}