const express = require("express");

const Auth = require("./middlewares/AuthMiddleware");

const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

const routes = express.Router();

// endpoints abertos
routes.post("/users", UserController.store);
routes.post("/auth/login", AuthController.login);

// endpoints proregidos
routes.get("/test", Auth.protect, (req, res) => {
  return res.json({
    tokenData: req.tokenData,
    now: Math.floor(Date.now() / 1000)
  });
});

module.exports = routes;
