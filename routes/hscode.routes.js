const { authJwt } = require("../middlewares");
const controller = require("../controllers/hscode.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/hscode", [authJwt.verifyToken], controller.hscodes);
  app.get("/api/hscode/:id", [authJwt.verifyToken], controller.hsCodesById);
  app.get("/api/hscode/keyword/:code", [authJwt.verifyToken], controller.hsCodesByCode);
  app.post("/api/hscode/search", [authJwt.verifyToken], controller.hsCodesByFilter);

  app.post("/api/hscode/add",  [authJwt.verifyToken], controller.hsCodesAdd);
  app.post("/api/hscode/update",  [authJwt.verifyToken, authJwt.isAdmin], controller.hsCodesUpdate);
  app.post("/api/hscode/delete",  [authJwt.verifyToken, authJwt.isAdmin], controller.hsCodesDelete);

  app.post("/api/hscode/options", controller.hsCodesByOptionId);
  app.post("/api/hscode/code/options", controller.hsCodesByOptionCode);
  app.post("/api/hscode/search", controller.hsCodesByFilter);
  app.post("/api/hscode/ask", controller.hsAsk);
};