const express = require("express");

const JWTAuth = require("./middlewares/AuthMiddleware");

const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");
const TestController = require("./controllers/TestController");

const routes = express.Router();

// endpoints abertos
routes.post("/users", UserController.store);
routes.post("/auth/login", AuthController.login);
routes.post("/auth/refresh", AuthController.refresh);

// endpoints protegidos
routes.get("/test", JWTAuth.protect, TestController.test);

module.exports = routes;
