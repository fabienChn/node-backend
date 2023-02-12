const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  emitter: {
    type: User, 
    required: true,
  },
  receiver: {
    type: User,
    required: true,
  },
}, { timestamps: true }); 

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;