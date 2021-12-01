import Card from './Card';
import Panel from './Panel';
import Storage from './Storage';

export default class Board {
  constructor(selector) {
    this.el = document.querySelector(selector);
    this.storage = new Storage('board');
    if (!this.load()) {
      this.create();
    }
    this.nextCardID = 1 + this.cards.reduce((max, item) => Math.max(max, +item.id), 0);
  }

  render() {
    this.panels.forEach((panel) => {
      panel.render(this.el);
      panel.addCardBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.addCard(panel);
      });
    });
    this.cards.forEach((card) => {
      const panel = this.panels.find((item) => item.id === card.panel);
      card.render(panel.cardsEl);
      card.removeBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.deleteCard(card);
      });
    });
  }

  addCard(panel) {
    if (panel.textarea.value !== '') {
      const card = new Card({
        id: this.nextCardID,
        title: panel.textarea.value,
        panel: panel.id,
      });

      panel.setTextareaValue();
      panel.collapseForm.toggle();

      this.cards.push(card);
      this.nextCardID += 1;

      card.render(panel.cardsEl);
      card.removeBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.deleteCard(card);
      });
    }
  }

  deleteCard(card) {
    card.removeEl();
    this.cards.splice(this.cards.findIndex((item) => item.id === card.id), 1);
  }

  create() {
    this.panels = [
      new Panel({ id: 1, title: 'todo' }),
      new Panel({ id: 2, title: 'in progress' }),
      new Panel({ id: 3, title: 'done' }),
    ];
    this.cards = [
      new Card({ id: 1, title: 'First task', panel: 1 }),
    ];
  }

  save() {
    const data = {
      panels: this.panels.map((item) => ({ id: item.id, title: item.title })),
      cards: this.cards.map((item) => ({ id: item.id, title: item.title, panel: item.panel })),
    };
    this.storage.save(JSON.stringify(data));
  }

  load() {
    const data = JSON.parse(this.storage.load() || '{}');

    if (!data || !data.cards || !data.panels) {
      return false;
    }

    this.panels = [];
    this.cards = [];

    data.panels
      .sort((a, b) => a.id - b.id)
      .forEach((item) => {
        this.panels.push(new Panel(item));
      });

    data.cards
      .sort((a, b) => a.id - b.id)
      .forEach((item) => {
        this.cards.push(new Card(item));
      });

    return true;
  }
}
