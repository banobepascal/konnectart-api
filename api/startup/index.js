import express from 'express';
import artistRoute from '../routes/userAuth.routes';

const app = express();
app.use(express.json());

app.use(artistRoute);

export default app;
