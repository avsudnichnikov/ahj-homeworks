export default class Card {
  constructor({ id, title, panel }) {
    if (!id || !title || !panel) {
      throw new Error('Expected id, title, panel, order');
    }
    this.id = +id;
    this.panel = +panel;
    this.title = title;
  }

  render(parent = null) {
    this.el = document.createElement('div');
    this.el.classList.add('card');

    const content = document.createElement('div');
    content.classList.add('card__content');
    this.el.dataset.id = this.id;
    content.innerText = this.title;

    const actions = document.createElement('div');
    this.removeBtn = document.createElement('div');
    actions.classList.add('card__actions');
    this.removeBtn.classList.add('link', 'error', 'remove-btn');
    this.removeBtn.innerText = 'delete';

    actions.append(this.removeBtn);
    this.el.append(content);
    this.el.append(actions);
    if (parent) {
      parent.append(this.el);
    }

    this.el.onmousedown = this.drag.bind(this);
    this.el.ondragstart = () => false;
    return this.el;
  }

  removeEl() {
    return this.el.remove();
  }

  drag(event) {
    if (event.target.closest('.remove-btn')) {
      return;
    }

    const move = (evt) => {
      if (Number.parseInt(this.el.style.left, 10) < evt.pageX - this.el.offsetWidth / 2) {
        this.el.classList.add('drag_left');
      } else {
        this.el.classList.remove('drag_left');
      }
      this.el.style.left = `${evt.pageX - this.el.offsetWidth / 2}px`;
      this.el.style.top = `${evt.pageY - this.el.offsetHeight / 2}px`;
    };

    const drop = (evt) => {
      this.el.classList.remove('drag');
      this.el.style.width = '';
      this.el.style.left = '';
      this.el.style.top = '';
      this.el.onmousemove = null;
      this.el.onmouseup = null;

      this.el.style.visibility = 'hidden';
      const target = document.elementFromPoint(evt.clientX, evt.clientY);
      const targetCardItem = target.closest('.card');
      const targetPanel = target.closest('.panel')
        || document.querySelector(`.panel[data-id="${this.panel}"]`);
      const targetCards = targetPanel.querySelector('.cards');
      this.el.style.visibility = '';

      if (targetCardItem) {
        targetCardItem.before(this.el);
      } else {
        targetCards.append(this.el);
      }
      this.panel = targetPanel.dataset.id;
    };

    this.el.style.width = `${this.el.offsetWidth}px`;
    this.el.classList.add('drag');
    document.body.append(this.el);
    move(event);

    this.el.onmousemove = (evt) => move(evt);
    this.el.onmouseup = (evt) => drop(evt);
  }
}
