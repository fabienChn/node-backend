const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express(); 

// database
const username = 'fabienChn';
const password = 'Henridu13.';
const dbURI = `mongodb+srv://${username}:${password}@nodetuts.5fddx14.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev'));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

// routes
app.get('/', (req, res) => {
  res.send({
    he: 'hehe'
  });
});
app.use('/blogs', requireAuth, blogRoutes);
app.use(authRoutes);

app.use((_, res) => {
  res.status(404).send('404 No found');
})