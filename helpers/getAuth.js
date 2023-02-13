const jwtDecode = require('jwt-decode');
const User = require('../models/user');

const getAuth = async (token) => {
  const { id } = jwtDecode(token);

  return await User.findById(id);
};

module.exports = getAuth;