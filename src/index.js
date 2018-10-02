const express = require('express');
const bodyParser = require('body-parser');

class App {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    // configuration for the express app
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    // setting up the routes
    const router = express.Router();

    router.get('/status', (req, res) => {
      return res.send('{status: connected}');
    });

    this.app.use('/eth/api/v1', router);
  }
}

module.exports = new App().app;
