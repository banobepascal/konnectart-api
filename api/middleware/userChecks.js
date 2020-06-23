import bcrypt from 'bcrypt';
import Artist from '../models/artist';

class ArtistChecks {
  async checkSignup(req, res, next) {
    const checkUsername = await Artist.findOne({ username: req.body.username });
    if (checkUsername) {
      return res.status(409).json({
        username: 'username is already taken',
      });
    }

    const checkEmail = await Artist.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(409).json({
        email: 'email already in use',
      });
    }

    next();
  }

  async checkSignin(req, res, next) {
    const checkUsername = await Artist.findOne({ username: req.body.username });
    if (!checkUsername) {
      return res.status(404).json({
        username: 'Invalid username or password',
      });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUsername.password
    );

    if (!checkPassword) {
      return res.status(404).json({
        password: 'Invalid username or password',
      });
    }

    next();
  }
}

export default new ArtistChecks();
