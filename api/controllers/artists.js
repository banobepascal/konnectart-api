import Artist from '../models/artist';

class Artists {
  async getAllArtists(req, res) {
    const artists = await Artist.find();
    const artist = artists.map((username) => username);
    res.status(200).json({
      status: 'OK',
      artists: artist,
    });
  }

  async getArtistByUsername(req, res) {
    const username = await Artist.findOne({ username: req.params.username });

    return res.status(200).json({
      status: 'OK',
      artist: {
        firstname: username.firstname,
        lastname: username.lastname,
        username: username.username,
      },
    });
  }
}

export default new Artists();
