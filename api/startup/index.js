import express from 'express';
import authRoute from '../routes/auth/auth.routes';

const app = express();
app.use(express.json());

app.use(authRoute);

export default app;
