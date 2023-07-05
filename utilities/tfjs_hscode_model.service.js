// JavaScript
const tf = require("@tensorflow/tfjs");
require('@tensorflow/tfjs-node');



async function mlModel (req){
    try{
        const model = await tf.loadLayersModel('file://tfjs_hscodesmodel/model.json');
        const prediction = model.predict(req);
        console.log(prediction);
        const response = prediction
        return response;
    }catch(err){
        console.log(err);
        return null;
    }
}

module.exports = {mlModel}