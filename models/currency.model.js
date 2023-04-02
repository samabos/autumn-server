const mongoose = require("mongoose");

const Currency = mongoose.model(
  "Currencies",
  new mongoose.Schema({
    CurrencyCode: String,
    Rate: mongoose.Decimal128,
    TimeStamp: Date
  })
);

module.exports = Currency;