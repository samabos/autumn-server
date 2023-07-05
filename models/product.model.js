const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); 

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    Keyword: String,
    Class: String,
    Code: String,
    Tags: Array,
    CreatedBy: String,
    Created: Date,
    ModifiedBy: String,
    Modified: Date,
    IsActive: Boolean,
  }).plugin(mongoosePaginate)
);

module.exports = Product;

