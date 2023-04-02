const mongoose = require("mongoose");

const Requirement = mongoose.model(
  "Requirement",
  new mongoose.Schema({
    Agency: String,
    Department: String,
    HSCode: String,
    HSCodeLocal: String,
    Description: String,
    ImportGuidelines: String,
    Forms: String,
    DocumentsDelivered: String,
    EstimatedTime: String,
    FormCost: String,
    ProductCost: String,
  })
);

module.exports = Requirement;