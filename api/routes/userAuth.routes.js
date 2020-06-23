import express from 'express';
import ArtistAuth from '../controllers/artistAuth';
import Validation from '../middleware/validation';
import ArtistChecks from '../middleware/userChecks';

const artistRoute = express.Router();

artistRoute.post(
  '/api/auth/signup',
  Validation.validateArtistInputs,
  ArtistChecks.checkSignup,
  ArtistAuth.signUp
);

artistRoute.post('/api/auth/signin', ArtistChecks.checkSignin, ArtistAuth.signIn);

export default artistRoute;
