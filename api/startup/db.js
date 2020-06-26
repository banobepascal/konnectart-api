import mongoose from 'mongoose';
import config from '../config/config';

const dbDebug = require('debug')('app:db');

module.exports = () => {
  if (process.env.NODE_ENV === 'test') {
    mongoose
      .connect(config.test_db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => dbDebug(`mongoose default connection open on ${config.test_db}`))
      .catch((err) => dbDebug('Failed to connect', err));
  } else {
    mongoose
      .connect(config.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => dbDebug(`mongoose default connection open on ${config.db}`))
      .catch((err) => dbDebug('Failed to connect', err));
  }

  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
};
