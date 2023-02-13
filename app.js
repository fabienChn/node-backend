const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');

const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const { requireAuth } = require('./middlewares/authMiddleware');

const app = express(); 
dotenv.config();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

// database
const dbCredentials = `${process.env.USERNAME}:${process.env.PASSWORD}`;
const dbURI = `mongodb+srv://${dbCredentials}@nodetuts.5fddx14.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen(4000))
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

// run when client connects
io.on('connection', (socket) => {
  // Welcome current user
  socket.emit('message', 'Welcome to ChatCord!');

  // Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat.');

  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'a user has left the chat');
  });

  socket.on('chatMessage', (msg) => {
    // TODO: save in db (the user sent a message )
    io.emit('message', msg);
  })
});

// routes
app.use('/blogs', requireAuth, blogRoutes);
app.use('/conversations', requireAuth, conversationRoutes);
app.use(authRoutes);

app.use((_, res) => {
  res.status(404).send('404 No found');
});