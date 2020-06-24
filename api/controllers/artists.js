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
}

export default new Artists();
