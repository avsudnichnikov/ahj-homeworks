// eslint-disable-next-line import/no-unresolved
import randInt from 'utls/randInt';

export default class Game {
  constructor(board, goblin, rows = 4, cols = 4) {
    this.board = board;
    this.options = {
      rows,
      cols,
    };
    this.trg = { x: 0, y: 0 };

    this.img = new Image();
    this.img.src = goblin;

    for (let i = 1; i <= this.options.rows; i += 1) {
      const row = document.createElement('div');
      this.board.appendChild(row);
      for (let j = 1; j <= this.options.cols; j += 1) {
        const col = document.createElement('div');
        col.className = 'cell';
        col.id = `cell-${i}-${j}`;
        row.appendChild(col);
      }
    }
  }

  start() {
    const showImage = this.showImage.bind(this);
    this.timer = setInterval(showImage, 1000);
  }

  showImage() {
    const genNextCoords = () => {
      const x = randInt(this.options.cols, 1);
      const y = randInt(this.options.rows, 1);
      if ((this.trg.y === y) && (this.trg.x === x)) {
        return genNextCoords();
      }
      return { x, y };
    };
    this.trg = genNextCoords();
    const target = document.querySelector(`#cell-${this.trg.x}-${this.trg.y}`);
    target.insertBefore(this.img, target.firstChild);
  }
}
