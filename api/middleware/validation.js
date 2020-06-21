import Joi from 'joi';
import exceptionHandler from '../helpers/exceptions';

Joi.objectId = require('joi-objectid')(Joi);

const stringValidator = new RegExp('^(^[a-zA-Z])(?=.*[a-z])');
const validPassword = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,12})'
);
const joiValidations = Joi.string()
  .min(2)
  .max(50)
  .regex(stringValidator)
  .required();

class Validation {
  validateUserInputs(req, res, next) {
    const schema = {
      firstname: joiValidations.error(() => ({
        message:
          'firstname should start with a letter and minimum of 2 characters',
      })),
      lastname: joiValidations.error(() => ({
        message:
          'lastname should start with a letter and minimum of 2 characters',
      })),
      username: joiValidations.error(() => ({
        message:
          'username should start with a letter and minimum of 2 characters',
      })),
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email()
        .error(() => ({
          message: 'please enter valid email i.e. name@domain.com',
        })),
      password: Joi.string()
        .min(8)
        .max(255)
        .regex(validPassword)
        .required()
        .error(() => ({
          message: `password must not be less than 8 characters 
                    and must contain lowercase, uppercase letters, 
                    numbers and special characters (!@#$%^&*)`,
        })),
      confirmPassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .error(() => ({
          message: "Passwords don't match",
        })),
      isArtist: Joi.boolean().error(() => ({
        message: 'isArtist has to be a boolean',
      })),
      isAdmin: Joi.boolean().error(() => ({
        message: 'isAdmin has to be a boolean',
      })),
    };

    return exceptionHandler(Joi.validate(req.body, schema), res, next);
  }
}

export default new Validation();