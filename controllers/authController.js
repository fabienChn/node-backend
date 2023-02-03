const User = require('../models/user');

const handleErrors = (e) => {
  let errors = { email: '', password: ''};

  console.log(e.code);

  if (e.code === 11000) {
    errors.email = 'that email is already registrered';

    return errors;
  }

  if (e.message.includes('user validation failed')) {
    Object.values(e.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).send({ errors: handleErrors(e) });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  
  res.send('login');
};

const logout = (req, res) => {
  res.send('logout');
};

module.exports = {
  signup,
  login,
  logout,
}