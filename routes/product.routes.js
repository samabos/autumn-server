const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/product", [authJwt.verifyToken], controller.products);
  app.get("/api/product/:id", [authJwt.verifyToken], controller.productById);
  app.get("/api/product/keyword/:keyword", [authJwt.verifyToken], controller.productByKeyword);
  app.post("/api/product/search", [authJwt.verifyToken], controller.productByFilter);
  app.post("/api/product/add",  [authJwt.verifyToken], controller.productAdd);
  app.post("/api/product/update",  [authJwt.verifyToken, authJwt.isAdmin], controller.productUpdate);
  app.post("/api/product/delete",  [authJwt.verifyToken, authJwt.isAdmin], controller.productDelete);

};