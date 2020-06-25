import Artist from '../models/artist';

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
        bio: username.bio,
        followers: username.followers.length,
      },
    });
  }

  async followArtist(req, res) {
    const artist = await Artist.findOne({ username: req.params.username });
    let follower = artist.followers.push(req.user.id);
    console.log(req.user._id);
    follower = await follower.save();
    return res
      .status(200)
      .json({ message: `You have followed ${req.params.username}` });
  }
}

export default new Artists();
