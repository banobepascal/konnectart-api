import app from './api/startup/index';
import config from './api/config/config';

const appDebug = require('debug')('app:startup');

require('./api/startup/db')();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => appDebug(`Listening on port ${port}...`));

module.exports = server;
