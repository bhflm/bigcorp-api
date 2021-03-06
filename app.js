const express = require('express');
const bodyParser = require('body-parser');
const Util = require('util');
const config = require('./app/config');
const logger = require('./app/logger');
const routes = require('./app/routes');

const init = () => {
  const ENVIRONMENT = config.ENV || 'development';
  // Set up the express app
  const app = express();
  const port = config.PORT || 8080;

  // loaders
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Require routes into app
  routes.init(app);
  if (ENVIRONMENT !== 'testing') {
    app.listen(port);
  }

  module.exports = app;
  logger.info(`BIG CORP API - ENV: ${ENVIRONMENT} RUNNING @ PORT:${port}`);
};

init();
