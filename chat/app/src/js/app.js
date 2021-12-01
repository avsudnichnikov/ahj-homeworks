import Chat from './Chat';

const chat = new Chat(
  document.querySelector('#join'),
  document.querySelector('#chat'),
  'http://localhost:3000/users',
  'ws://localhost:3000/',
);

chat.init();
