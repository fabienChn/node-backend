const getMessagesSeeds = (userIds) => [
  {
    text: 'Hey',
    isLiked: false,
    emitter: userIds[0],
    receiver: userIds[1],
  },
  {
    text: 'Hi there!',
    isLiked: false,
    emitter: userIds[1],
    receiver: userIds[0],
  },
  {
    text: 'how are you today bro?',
    isLiked: false,
    emitter: userIds[0],
    receiver: userIds[1],
  },
  {
    text: 'VERY GOOOOOD, I\'m building a really cool messaging app rn.',
    isLiked: true,
    emitter: userIds[1],
    receiver: userIds[0],
  },
  {
    text: 'Hallo mama!',
    isLiked: false,
    emitter: userIds[0],
    receiver: userIds[2],
  },
];

module.exports = getMessagesSeeds;