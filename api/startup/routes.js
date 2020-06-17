import express from 'express';
import returns from '../controllers/returns';

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/returns', returns);
};
