import Artist from '../models/artist';
import User from '../models/user';

class Artists {
  async getAllArtists(req, res) {
    const artists = await Artist.find();
    const data = [];
    artists.forEach((artist) => {
      const fullName = [artist.firstname, artist.lastname];
      data.push({
        fullName: fullName.join(' '),
        username: artist.username,
      });
    });
    return res.status(200).json({
      status: 'OK',
      artists: data,
    });
  }

  async getArtistByUsername(req, res) {
    const username = await Artist.findOne({ username: req.params.username });
    const fullName = [username.firstname, username.lastname];
    return res.status(200).json({
      status: 'OK',
      artist: {
        fullName: fullName.join(' '),
        username: username.username,
        followers: username.followers.length,
        bio: username.bio,
      },
    });
  }

  async followArtist(req, res) {
    const artist = await Artist.findOne({ username: req.params.username });
    const user = await User.findOneAndUpdate(req.body.username, {
      $push: {
        following: {
          _id: artist._id,
          username: artist.username,
        },
      },
    });
    console.log(user);
    return res
      .status(200)
      .json({ message: `You have followed ${artist.username}` });
  }
}

export default new Artists();
