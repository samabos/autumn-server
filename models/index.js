const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");
db.product = require("./product.model");
db.currency = require("./currency.model");
db.hscode = require("./hscode.model");
db.requirement = require("./requirement.model");
db.searchLog = require("./searchLog.model");
db.keyword = require("./keyword.model");
db.tariff = require("./tariff.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;