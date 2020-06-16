import mongoose from 'mongoose';
import Joi from 'joi';

const Image = mongoose.model('Images', new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
}));

function validateImage(image) {
  const schema = {
    name: Joi.buffer().required(),
  };

  return Joi.validate(image, schema);
}

// exports.imageSchema = imageSchema;
exports.Image = Image;
exports.validate = validateImage;
