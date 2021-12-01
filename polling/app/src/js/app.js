import Polling from './Polling';

const polling = new Polling(
  document.querySelector('#polling'),
  'https://localhost:3000/messages/unread',
);

polling.start();
