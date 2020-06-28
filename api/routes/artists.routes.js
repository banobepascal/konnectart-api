import express from 'express';
import verifyToken from '../middleware/authorization';
import Artists from '../controllers/artists';
import UserChecks from '../middleware/userChecks';

const artistsRoute = express.Router();

artistsRoute.get('/api/konnectart/artists', Artists.getAllArtists);
artistsRoute.get(
  '/api/konnectart/artists/:username',
  UserChecks.checkUserName,
  Artists.getArtistByUsername
);
artistsRoute.patch(
  '/api/konnectart/artists/:username',
  verifyToken,
  UserChecks.checkUserName,
  // UserChecks.checkForArtist,
  Artists.followArtist
);

export default artistsRoute;
