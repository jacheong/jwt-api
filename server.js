const HTTP_PORT = process.env.PORT || 8081;

const mongoose = require('mongoose');
const createExpressApp = require('./create-express-app');

require('dotenv').config();

mongoose.connect(process.env.DB_CONN);

createExpressApp().listen(HTTP_PORT, () => { console.log("Listening on port: " + HTTP_PORT); });