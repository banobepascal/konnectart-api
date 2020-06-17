import mongoose from 'mongoose';
import Joi from 'joi';

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
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
    isArtist: Boolean,
    isAdmin: Boolean,
  }),
);

function validateUser(user) {
  const schema = {
    firstname: Joi.string().min(2).max(20).required(),
    lastname: Joi.string().min(2).max(20).required(),
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required()
      .email(),
    password: Joi.string().min(8).max(1024).required(),
  };

  return Joi.validate(user, schema);
}

export default User;
exports.validate = validateUser;
