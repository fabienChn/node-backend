const jwt = require('jsonwebtoken');

const User = require('../models/user');

const handleErrors = (e) => {
  let errors = { email: '', password: ''};

  console.log(e.code);

  // wrong credentials
  if (e.message === 'incorrect email' || e.message === 'incorrect password') {
    errors.email = 'wrong credentials';
    errors.password = 'wrong credentials';
  }

  // duplicate email
  if (e.code === 11000) {
    errors.email = 'that email is already registrered';

    return errors;
  }

  // validation errors
  if (e.message.includes('user validation failed')) {
    Object.values(e.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const jwtSignInToken = 'net ninja secret';

const createToken = (id) => {
  return jwt.sign({ id }, jwtSignInToken, {
    expiresIn: maxAge, 
  });
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ user: user._id });
  } catch (e) {
    res.status(400).json({ errors: handleErrors(e) });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ user: user._id });
  } catch (e) {

    res.status(400).json({ errors: handleErrors(e) });
  }
};

const logout = (req, res) => {
  res.send('logout');
};

module.exports = {
  signup,
  login,
  logout,
}