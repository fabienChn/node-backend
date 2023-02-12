const Message = require('../models/message');

const conversation_index = (req, res) => {
  // TODO: join by receiver and emitter
  // Message.find()
  //   .sort({ created_at: -1 })
  //   .then((result) => {
  //     res.json(result);
  //   });
}

const conversation_details = (req, res) => {
  const id = req.params.id;

  Message.findById(id)
    .then((result) => {
      if (result === null) {
        res.status(404).send('404 not found.');
      }

      res.json(result);
    });
};

const conversation_post = (req, res) => {
  const { body } = req;

  const conversation = new Message({
    title: body.title,
    snippet: body.snippet,
    body: body.body,
  })

  conversation.save()
    .then((result) => {
      res.json(result);
    });
};

const conversation_delete = (req, res) => {
  const id = req.params.id;

  Message.findByIdAndDelete(id)
    .then(() => res.status(201).json());
};

module.exports = {
  conversation_index,
  conversation_details,
  conversation_post,
  conversation_delete,
}