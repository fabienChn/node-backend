const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express(); 

const username = 'fabienChn';
const password = 'Henridu13.';
const dbURI = `mongodb+srv://${username}:${password}@nodetuts.5fddx14.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.get('/', (req, res) => {
  res.send({
    he: 'hehe'
  });
});

app.use('/blogs', blogRoutes);
app.use(authRoutes);

app.use((req, res) => {
  res.status(404).send('404 No found');
})