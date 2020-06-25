import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ENV from 'dotenv';

ENV.config();

class Helpers {
  static hashpassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static generateToken(id, username, isArtist, isAdmin) {
    const token = jwt.sign(
      {
        _id: id, username, isArtist, isAdmin
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1day',
      },
    );
    return token;
  }
}

export default Helpers;
