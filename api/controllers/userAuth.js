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

    user.password = await Helpers.hashpassword(user.password);
    await user.save();

    const token = Helpers.generateToken(user.id, user.isArtist, user.isAdmin);
    res.status(201).json({
      status: 201,
      message: 'Your account has been created successfully',
      data: token,
      user,
    });
  }
}

export default new UserAuth();
