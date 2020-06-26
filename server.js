import app from './api/startup/index';
import config from './api/config/config';

require('./api/startup/db')();

if (process.env.NODE_ENV === 'test') {
  app.listen(config.test_port, () => console.log(`Listening on port ${config.test_port}...`));
} else {
  app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));
}

export default app;
