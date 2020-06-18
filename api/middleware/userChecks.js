import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user';

class UserChecks {
  async checkSignup(req, res, next) {
    const checkUsername = await User.findOne({ username: req.body.username });
    if (checkUsername) {
      return res.status(409).json({
        error: 'username already taken, please choose another username',
      });
    }

    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(409).json({
        error: 'email already exists, please choose another email',
      });
    }

    next();
  }
}

export default new UserChecks();
