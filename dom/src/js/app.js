// eslint-disable-next-line import/no-unresolved
import goblin from 'imgs/goblin.png';
import Game from './Game';

const game = new Game(
  document.querySelector('#gameBoard'),
  goblin,
);

game.start();
