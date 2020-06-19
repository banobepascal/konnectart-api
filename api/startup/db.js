import mongoose from 'mongoose';
import config from '../config/config';

const dbDebug = require('debug')('app:db');

module.exports = () => {
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(config.test_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  mongoose.connection.on('connected', () => {
    dbDebug(`mongoose default connection open on ${config.db}`);
  });
};
