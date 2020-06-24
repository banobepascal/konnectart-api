import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true
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
  isAdmin: Boolean,
}));

export default User;
