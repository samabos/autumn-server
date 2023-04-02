const mongoose = require("mongoose");

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
  })
);

module.exports = Product;