import mongoose from 'mongoose';
import Joi from 'joi';

const Image = mongoose.model(
  'Content',
  new mongoose.Schema({
    caption: {
      type: String,
      min: 0,
      max: 140,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
      required: true,
    },
  })
);

function validateImage(image) {
  const schema = {
    caption: Joi.string().min(0).max(140).required(),
    image: Joi.string().min(0).max(140).required(),
  };

  return Joi.validate(image, schema);
}

// exports.imageSchema = imageSchema;
exports.Image = Image;
exports.validate = validateImage;
