const mongoose = require('mongoose');
const dotenv = require('dotenv');

const getUsersSeeds = require('./getUsersSeeds');
const getMessagesSeeds = require('./getMessagesSeeds');
const User = require('../models/user');
const Message = require('../models/message');

dotenv.config();

const dbCredentials = `${process.env.USERNAME}:${process.env.PASSWORD}`;
const dbURI = `mongodb+srv://${dbCredentials}@nodetuts.5fddx14.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MONGODB CONNECTED!'))
  .catch((err) => console.log(err));

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(getUsersSeeds());

  console.log('--- users seeded ---');

  const users = await User.find();

  await Message.deleteMany({});
  await Message.insertMany(
    getMessagesSeeds(users.map(user => user.id))
  );

  console.log('--- messages seeds ---');
};

seedDB().then(() => {
  mongoose.connection.close();
});