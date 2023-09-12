const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

const USERS_PATH = "/api/users";
const AUTH_PATH = "/api/auth";
const SEARCH_PATH = "/api/search";
const PRODUCTS_PATH = "/api/products";
const CATEGORIES_PATH = "/api/categories";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.connectDB();

    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(AUTH_PATH, require("../routes/auth"));
    this.app.use(USERS_PATH, require("../routes/users"));
    this.app.use(SEARCH_PATH, require("../routes/search"));
    this.app.use(PRODUCTS_PATH, require("../routes/products"));
    this.app.use(CATEGORIES_PATH, require("../routes/categories"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
