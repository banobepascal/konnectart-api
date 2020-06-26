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

  async checkSignin(req, res, next) {
    const checkUsername = await User.findOne({ username: req.body.username });
    if (!checkUsername) {
      return res.status(404).json({
        error: 'Invalid username or password',
      });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUsername.password
    );

    if (!checkPassword) {
      return res.status(404).json({
        error: 'Invalid username or password',
      });
    }

    next();
  }
}

export default new UserChecks();
