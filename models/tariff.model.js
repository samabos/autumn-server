const mongoose = require("mongoose");

const Tariff = mongoose.model(
  "Tariff",
  new mongoose.Schema({
    Header: String,
    HSCode: String,
    Description: String,
    DUTY: mongoose.Decimal128,
    LEVY: mongoose.Decimal128,
    VAT: mongoose.Decimal128,
    NAC: mongoose.Decimal128,
    SUR: mongoose.Decimal128,
    ETLS: mongoose.Decimal128,
    CISS: mongoose.Decimal128
  })
);

module.exports = Tariff;