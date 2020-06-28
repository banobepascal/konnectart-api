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

  async addFollowing(req, res) {
    const user = await User.findOneAndUpdate(req.user._id, {
      $push: {
        following: {
          username: req.params.username,
        },
      },
    });

    return res
      .status(200)
      .json({ message: `You have followed ${user}` });
  }
}

export default new Artists();
