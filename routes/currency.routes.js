const { authJwt } = require("../middlewares");
const controller = require("../controllers/currency.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  app.get("/api/currency", controller.currency);
  app.get("/api/currency/:code", controller.currencyByCode);

}