const express = require('express');

const { transactionDetails } = require('./routes/routes');

class App {
  constructor() {
    this.app = express();
    this.routes();
  }

  routes() {
    // setting up the routes
    const router = express.Router();

    router.get('/status', (req, res) => {
      return res.send('{status: connected}');
    });

    router.get('/transaction/:txid', transactionDetails);

    this.app.use('/eth/api/v1', router);
  }
}

module.exports = new App().app;
