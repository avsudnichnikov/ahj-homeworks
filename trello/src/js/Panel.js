import Collapse from './Collapse';

export default class Panel {
  constructor({ id, title }) {
    this.id = +id;
    this.title = title;
  }

  render(parent = null) {
    this.el = document.createElement('div');
    this.el.classList.add('col', 'panel');
    this.el.dataset.id = this.id;

    const panelTitle = document.createElement('div');
    panelTitle.classList.add('panel__title');
    panelTitle.innerText = this.title;
    this.el.append(panelTitle);

    this.cardsEl = document.createElement('div');
    this.cardsEl.classList.add('panel__content', 'cards');
    this.el.append(this.cardsEl);

    const formWrapper = document.createElement('div');
    const formShowLink = document.createElement('div');
    const form = document.createElement('form');
    const formActions = document.createElement('div');
    const formCloseBtn = document.createElement('div');
    this.addCardBtn = document.createElement('button');
    this.textarea = document.createElement('textarea');

    formWrapper.classList.add('panel__content');
    formShowLink.classList.add('add-task-link');
    form.classList.add('form');
    formActions.classList.add('form__actions');
    formCloseBtn.classList.add('icon', 'close');
    this.addCardBtn.classList.add('btn', 'success');

    form.dataset.status = this.id;
    formShowLink.innerText = '+ Add another card';
    formCloseBtn.innerText = '×';
    this.addCardBtn.innerText = 'Add Card';
    this.textarea.rows = 3;
    this.textarea.placeholder = 'Enter a title for this card...';

    form.append(this.textarea);
    formActions.append(this.addCardBtn);
    formActions.append(formCloseBtn);
    form.append(formActions);

    this.collapseForm = new Collapse(true);
    this.collapseForm.init(formShowLink, form);
    formWrapper.append(formShowLink);
    formWrapper.append(form);

    this.el.append(formWrapper);
    if (parent) {
      parent.append(this.el);
    }
    return this.el;
  }

  setTextareaValue(value = '') {
    this.textarea.value = value;
  }
}
