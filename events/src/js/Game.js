/* eslint-disable import/no-unresolved */
import goblin from 'imgs/goblin.png';
import bang from 'imgs/bang.png';
import randInt from 'utls/randInt';
import ActiveValue from './ActiveValue';

export default class Game {
  constructor(board, rows = 4, cols = 4) {
    this.board = board;
    this.options = { rows, cols };
    this.state = { x: 0, y: 0, e: 'stop' };

    this.hit = new ActiveValue('.score .hit', 0);
    this.miss = new ActiveValue('.score .miss', 0);
    this.img = new Image();

    const click = this.click.bind(this);
    this.board.addEventListener('click', click);

    this.fillField();
  }

  start() {
    const showGoblin = this.showGoblin.bind(this);
    this.timer = setInterval(showGoblin, 1000);
  }

  over() {
    this.state.e = 'stop';
    clearInterval(this.timer);
  }

  click(event) {
    if (this.state.e === 'goblin') {
      const cell = event.target.closest('div.cell');
      if ((cell) && (`cell-${this.state.y}-${this.state.x}` === cell.id)) {
        this.img.src = bang;
        this.state.e = 'bang';
        this.hit.value += 1;
      }
    }
    this.board.classList.add('click');
    setTimeout(
      () => this.board.classList.remove('click'),
      100,
    );
  }

  fillField() {
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

  showGoblin() {
    const genNextCoords = () => {
      const x = randInt(this.options.cols, 1);
      const y = randInt(this.options.rows, 1);
      if ((this.state.y === y) && (this.state.x === x)) {
        return genNextCoords();
      }
      return { x, y };
    };

    if (this.state.e === 'goblin') {
      this.miss.value += 1;
    }
    if (this.miss.value >= 5) {
      this.over();
      return;
    }

    this.state = genNextCoords();
    const target = document.querySelector(`#cell-${this.state.y}-${this.state.x}`);
    this.img.src = goblin;
    this.state.e = 'goblin';
    target.appendChild(this.img);
  }
}
