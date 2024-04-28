const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); 

const HSCode = mongoose.model(
  "HSCode",
  new mongoose.Schema({
    _id: Object,
    Order: Number,
    Level: Number,
    Id: String,
    ParentId: String,
    Code: String,
    ParentCode: String,
    Description: String,
    SelfExplanatory: String,
  }).plugin(mongoosePaginate)
);

module.exports = HSCode;