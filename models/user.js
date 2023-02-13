const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  name: {
    type: String,
    require: [true, 'Please enter a name'],
    minlength: [3, 'Minimum name length is 3 characters'],
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw Error('incorrect email');
  }

  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    throw Error('incorrect password');
  }

  return user;
}

const User = mongoose.model('user', userSchema);

module.exports = User;