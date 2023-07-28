const express = require("express");

const app = express();

const bodyParser = express.json();

app.use(bodyParser);

module.exports = app;
