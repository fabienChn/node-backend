const jwt = require('jsonwebtoken');

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

module.exports = {
  requireAuth,
};