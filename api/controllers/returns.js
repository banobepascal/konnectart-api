import express from 'express';
// import validate from '../middleware/validate';
import auth from '../middleware/authorization';

const router = express.Router();

router.post('/', [auth], (req, res) => {
});

export default router;
