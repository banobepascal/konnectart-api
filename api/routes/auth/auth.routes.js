import express from 'express';
import ArtistAuth from '../../controllers/auth/artistAuth';
import UserAuth from '../../controllers/auth/userAuth';
import Validation from '../../middleware/validation';
import UserChecks from '../../middleware/userChecks';

const authRoute = express.Router();

authRoute.post(
  '/api/auth/artist/signup',
  Validation.validateArtistSignup,
  UserChecks.checkSignup,
  ArtistAuth.signUp
);

authRoute.post(
  '/api/auth/artist/signin',
  UserChecks.checkArtistSignin,
  ArtistAuth.signIn
);

authRoute.post(
  '/api/auth/user/signup',
  Validation.validateUserSignup,
  UserChecks.checkSignup,
  UserAuth.signUp
);

authRoute.post(
  '/api/auth/user/signin',
  UserChecks.checkUserSignin,
  UserAuth.signIn
);

export default authRoute;
