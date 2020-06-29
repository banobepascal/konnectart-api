import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  bio: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  isArtist: Boolean,
  isAdmin: Boolean,
  following: Array,
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
