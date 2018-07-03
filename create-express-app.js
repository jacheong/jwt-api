const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/api');
const cors = require('cors');

function createExpressApp() {
    const app = express();

    app.use(cors());
    app.use(express.static(path.join(__dirname + "/public")));
    app.use('/api', express.static(path.join(__dirname + "/profiles")));
    app.use(bodyParser.json());

    app.use('/api', routes);

    return app;
}

module.exports = createExpressApp;