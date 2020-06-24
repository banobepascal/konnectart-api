import express from 'express';
import Artists from '../controllers/artists';

const artistsRoute = express.Router();

artistsRoute.get('/api/artists', Artists.getAllArtists);

export default artistsRoute;
