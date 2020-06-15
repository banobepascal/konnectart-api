import mongoose from 'mongoose';
import express from 'express';
import config from './api/config/config';

const app = express();

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

export default app;
