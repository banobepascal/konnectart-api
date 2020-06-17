import express from 'express';
import config from './api/config/config';

const app = express();

require('./api/startup/routes')(app);
require('./api/startup/db')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
