/* eslint-disable import/no-unresolved */
import getCoords from 'utls/getCoords';

export default class Popover {
  constructor(popover, btn) {
    this.popover = popover;
    this.btn = btn;
  }

  init() {
    const arrow = document.createElement('div');
    arrow.classList.add('arrow');
    this.popover.append(arrow);
    this.btn.addEventListener('click', this.click.bind(this));
  }

  setPos() {
    const btnCoords = getCoords(this.btn);
    this.popover.style.top = `calc(${btnCoords.y}px - 0.5rem)`;
    this.popover.style.left = `${btnCoords.x + this.btn.clientWidth / 2}px`;
  }

  click() {
    this.setPos();
    this.popover.classList.toggle('visible');
    this.btn.classList.toggle('active');
  }
}
