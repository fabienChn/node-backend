const getAuth = require('../helpers/getAuth');
const Message = require('../models/message');
const User = require('../models/user');

const conversation_index = async (req, res) => {
  // TODO: join by receiver and emitter
  // Message.find()
  //   .sort({ created_at: -1 })
  //   .then((result) => {
  //     res.json(result);
  //   });

  const auth = await getAuth(req.cookies.jwt);

  const users = await User.find({ _id: { $ne: auth.id}});

  const message = await Message
      .findOne({ 
        $or: [{ receiver: auth, emitter: users[0] }, { receiver: users[0], emitter: auth }]
      })
      .sort({ createdAt: -1 });

  res.json(message);

  // const messages = users.map(async (user) => {
  //   return await Message
  //     .findOne({ 
  //       $or: [{ receiver: auth, emitter: user }, { receiver: user, emitter: auth }]
  //     });
  //     // .sort({ created_at: -1 })
  //     // .exec();
  // });

  // console.log({ messages });
  // res.json(messages);

  // const conversations = await Message.find({ $or: [ { 'receiver': auth }, { 'emitter': auth }]});
  // const conversations = Message.aggregate([
  //   { $group: { _id: { receiver: userId, receiver: authId } } }
  // ]);

  // res.json(conversations);
  // res.json(conversations);
}

const conversation_details = async (req, res) => {
  console.log('BLABLABLALABLABLAA');
  const id = req.params.id;

  res.json(req.params);
  // const auth = await getAuth(req.cookies.jwt);

  // const interlocutor = await User.findById(id);
  
  // const conversations = await Message.find({ $or: [ { 'receiver': auth, 'emitter': interlocutor }, { 'emitter': auth, 'receiver': interlocutor }]});

  // if (conversations.length === 0) {
  //   res.status(404).send('404 not found.');
  // }

  // res.json(conversations);
};

// const conversation_post = (req, res) => {
//   const { body } = req;

//   const conversation = new Message({
//     title: body.title,
//     snippet: body.snippet,
//     body: body.body,
//   })

//   conversation.save()
//     .then((result) => {
//       res.json(result);
//     });
// };

// const conversation_delete = (req, res) => {
//   const id = req.params.id;

//   Message.findByIdAndDelete(id)
//     .then(() => res.status(201).json());
// };

module.exports = {
  conversation_index,
  conversation_details,
  // conversation_post,
  // conversation_delete,
}