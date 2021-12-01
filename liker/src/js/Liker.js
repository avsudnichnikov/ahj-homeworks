import randInt from './utils/randInt';

export default class Liker {
  constructor(selector, size = 20) {
    this.el = document.querySelector(selector);
    this.el.classList.add('liker');
    this.el.style.setProperty('--heart-size', `${size}px`);
  }

  init() {
    this.el.addEventListener('click', () => this.like());
    this.el.style.setProperty('--like-amplitude', `${this.el.clientWidth}px`);
  }

  like() {
    const heart = document.createElement('div');
    heart.classList.add('heart', 'like', `like${randInt(4, 1)}`);
    this.el.append(heart);
    heart.addEventListener('animationend', () => {
      heart.remove();
    });
  }
}
