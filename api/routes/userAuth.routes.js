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

userRoute.post('/api/auth/signin', UserChecks.checkSignin, UserAuth.signIn);

export default userRoute;
