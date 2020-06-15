import app from './index';
import config from './api/config/config';

if (process.env.NODE_ENV === 'test') {
  app.listen(config.test_port, () => console.log(`Listening on port ${config.test_port} ...`));
} else {
  app.listen(config.port, () => console.log(`Listening on port ${config.port} ...`));
}
