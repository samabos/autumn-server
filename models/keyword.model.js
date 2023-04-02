const mongoose = require("mongoose");

const Keyword = mongoose.model(
  "Keyword",
  new mongoose.Schema({
    ParentKeyword: String,
    ChildKeyword: String
  })
);

module.exports = Keyword;