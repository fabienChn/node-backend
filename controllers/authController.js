const jwt = require('jsonwebtoken');
const User = require('../models/user');

const handleErrors = (e) => {
  let errors = { email: '', password: '', name: ''};

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

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SIGN_IN_TOKEN, {
    expiresIn: maxAge, 
  });
};

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await User.create({ email, password, name });
    
    const token = createToken(user.id);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    res.status(400).json({ errors: handleErrors(e) });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user.id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    res.status(400).json({ errors: handleErrors(e) });
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });

  res.status(200).json({});
};

module.exports = {
  signup,
  login,
  logout,
}