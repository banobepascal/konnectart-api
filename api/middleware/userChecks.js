import bcrypt from 'bcrypt';
import User from '../models/user';
import Artist from '../models/artist';

class UserChecks {
  async checkSignup(req, res, next) {
    const artistUsername = await Artist.findOne({
      username: req.body.username,
    });
    const checkUsername = await User.findOne({ username: req.body.username });
    if (artistUsername || checkUsername) {
      return res.status(409).json({
        username: 'username is already taken',
      });
    }

    const checkArtistEmail = await Artist.findOne({ email: req.body.email });
    const checkUserEmail = await User.findOne({ email: req.body.email });
    if (checkArtistEmail || checkUserEmail) {
      return res.status(409).json({
        email: 'email already in use',
      });
    }

    next();
  }

  async checkArtistSignin(req, res, next) {
    const artistUsername = await Artist.findOne({
      username: req.body.username,
    });

    if (!artistUsername) {
      return res.status(404).json({
        username: 'Invalid username or password',
      });
    }
    const checkArtistPassword = await bcrypt.compare(
      req.body.password,
      artistUsername.password
    );

    if (!checkArtistPassword) {
      return res.status(404).json({
        password: 'Invalid username or password',
      });
    }

    next();
  }

  async checkUserSignin(req, res, next) {
    const checkUsername = await User.findOne({ username: req.body.username });
    if (!checkUsername) {
      return res.status(404).json({
        username: 'Invalid username or password',
      });
    }

    const checkUserPassword = await bcrypt.compare(
      req.body.password,
      checkUsername.password
    );

    if (!checkUserPassword) {
      return res.status(404).json({
        password: 'Invalid username or password',
      });
    }

    next();
  }

  async checkUserName(req, res, next) {
    const checkUsername = await Artist.findOne({
      username: req.params.username,
    });
    if (!checkUsername) {
      return res.status(404).json({
        username: 'artist not found',
      });
    }

    next();
  }

  async checkFollower(req, res, next) {
    const artist = await Artist.findOne({ username: req.params.username });
    const checkFollower = artist.followers.find(
      (follower) => follower._id === req.user._id
    );
    if (checkFollower) {
      return res.status(409).json({
        error: `You already following ${artist.username}`,
      });
    }

    next();
  }
}

export default new UserChecks();
