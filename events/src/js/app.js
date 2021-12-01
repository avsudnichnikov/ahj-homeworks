// eslint-disable-next-line import/no-unresolved
import Game from './Game';

const game = new Game(
  document.querySelector('#gameBoard'),
);

game.start();
