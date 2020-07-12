import express from 'express';
import authRoute from '../routes/auth/auth.routes';
import artistsRoute from '../routes/artists.routes';

const app = express();
app.use(express.json());



export default app;
