import express from 'express';
import Artists from '../controllers/artists';

const artistsRoute = express.Router();

artistsRoute.get('/api/konnectart/artists', Artists.getAllArtists);
artistsRoute.get('/api/konnectart/artists/:username', Artists.getArtistByUsername);

export default artistsRoute;
