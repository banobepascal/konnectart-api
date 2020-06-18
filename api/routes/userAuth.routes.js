import express from 'express';
import UserAuth from '../controllers/userAuth';
import Validation from '../middleware/validations';

const userRoute = express.Router();

userRoute.post(
  '/api/auth/signup',
  Validation.validateUserInputs,
  UserAuth.signUp
);

export default userRoute;
