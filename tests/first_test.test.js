const mongoose = require('mongoose');
const app = require('./app');

// database
const dbCredentials = `${process.env.USERNAME}:${process.env.PASSWORD}`;
const dbURI = `mongodb+srv://${dbCredentials}@nodetuts.5fddx14.mongodb.net/test_db?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));