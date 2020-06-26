import mongoose from 'mongoose';
import config from '../config/config';

module.exports = function () {
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

  mongoose.connection.on('connected', () => {
    console.log(`mongoose default connection open on ${config.db}`);
  });
};
