const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

const app = express(); 

const username = 'fabienChn';
const password = 'Henridu13.';
const dbURI = `mongodb+srv://${username}:${password}@nodetuts.5fddx14.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send({
    he: 'hehe'
  });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).send('404 No found');
})