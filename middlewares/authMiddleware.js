const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    console.log('No JWT token');
    res.status(401).json('not authenticated');

    return;
  }

  jwt.verify(token, process.env.JWT_SIGN_IN_TOKEN, (error, decodedToken) => {
    if (error) {
      console.log(error.message);
      res.status(401).json('not authenticated');

      return;
    }

    console.log(decodedToken);
  });

  next();
};

module.exports = {
  requireAuth,
};