// eslint-disable-next-line import/no-unresolved
import Board from './Board';

const board = new Board('#board');
board.render();
const observer = new MutationObserver(() => board.save());
observer.observe(board.el, {
  childList: true,
  subtree: true,
});
