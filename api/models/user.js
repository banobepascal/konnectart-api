import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import ENV from 'dotenv';

ENV.config();

const userSchema = new mongoose.Schema({
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
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isArtist: this.isArtist, isAdmin: this.isAdmin },
    process.env.JWT_KEY,
    {
      expiresIn: '1day',
    },
  );
  return token;
};

const User = mongoose.model('User', userSchema);

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
