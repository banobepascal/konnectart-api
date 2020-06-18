import express from 'express';
import UserAuth from '../controllers/userAuth';
import Validation from '../middleware/validation';
import UserChecks from '../middleware/userChecks';

const userRoute = express.Router();

userRoute.post(
  '/api/auth/signup',
  Validation.validateUserInputs,
  UserChecks.checkSignup,
  UserAuth.signUp
);

export default userRoute;
