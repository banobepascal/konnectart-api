import Artist from '../../models/artist';
import Helpers from '../../helpers/helpers';

class ArtistAuth {
  async signUp(req, res) {
    const artist = new Artist({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio,
      isArtist: true,
      isAdmin: req.body.isAdmin,
    });

    artist.password = Helpers.hashpassword(artist.password);
    await artist.save();

    const token = Helpers.generateToken(
      artist.id,
      artist.username,
      artist.isArtist,
      artist.isAdmin
    );
    res.status(201).json({
      message: 'Your account has been created successfully',
      data: token,
    });
  }

  async signIn(req, res) {
    const artistUsername = await Artist.findOne({
      username: req.body.username,
    });
    const token = Helpers.generateToken(
      artistUsername.id,
      artistUsername.username,
      artistUsername.isArtist,
      artistUsername.isAdmin
    );
    return res.status(200).json({
      message: 'Successfully logged in',
      data: token,
    });
  }
}

export default new ArtistAuth();
