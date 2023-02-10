const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtSignInToken = 'net ninja secret';

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, jwtSignInToken, (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.status(401).json('not authenticated');

        return;
      } else {
        console.log(decodedToken);
      }
    });
  } else {
    res.status(401).json('not authenticated');

    return;
  }

  next();
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, jwtSignInToken, async (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        // add user data to token;
        next();
      }
    });
  } else {

  }
};

module.exports = {
  requireAuth,
};