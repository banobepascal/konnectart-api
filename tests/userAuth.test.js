// import mongoose from 'mongoose';
import request from 'supertest';
import User from '../api/models/user';
// import Helpers from '../api/helpers/helpers';

describe('api/returns', () => {
  let server;
  let token;
  const exec = () => {
    request(server).post('/api/returns').set('authorization', token);
  };
  beforeEach(async () => {
    server = require('../server');
    token = new User().generateAuthToken();
  });
  afterEach(async () => {
    await server.close();
  });

  it('should return 401 if client is not logged in', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });
});
