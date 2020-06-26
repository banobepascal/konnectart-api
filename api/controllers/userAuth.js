import User from '../models/user';
import Helpers from '../helpers/helpers';

class UserAuth {
  async signUp(req, res) {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isArtist: req.body.isArtist,
      isAdmin: req.body.isAdmin,
    });

    user.password = Helpers.hashpassword(user.password);
    await user.save();

    const token = Helpers.generateToken(user.id, user.isArtist, user.isAdmin);
    res.status(201).json({
      message: 'Your account has been created successfully',
      data: token,
    });
  }

  async signIn(req, res) {
    const checkUsername = await User.findOne({ username: req.body.username });
    const token = Helpers.generateToken(
      checkUsername.id,
      checkUsername.isArtist,
      checkUsername.isAdmin
    );
    return res.status(200).json({
      message: 'Successfully logged in',
      data: token,
    });
  }
}

export default new UserAuth();
