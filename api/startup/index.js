import express from 'express';
import authRoute from '../routes/auth/auth.routes';
import artistsRoute from '../routes/artists.routes';

const app = express();
app.use(express.json());

app.use(authRoute);
app.use(artistsRoute);

export default app;
