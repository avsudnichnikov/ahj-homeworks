import PSystems from './PSystems';
import Validator from './Validator';

export default class ValidationWidget {
  constructor(selector) {
    this.widget = document.querySelector(selector);
  }

  init() {
    const formControl = document.createElement('div');
    this.cards = document.createElement('div');
    this.btn = document.createElement('button');
    this.inp = document.createElement('input');
    this.errors = document.createElement('div');

    formControl.classList.add('row');
    this.cards.classList.add('row');
    this.btn.classList.add('validation-button');
    this.inp.classList.add('validation-input');
    this.errors.classList.add('row', 'validation-errors');

    this.inp.placeholder = 'Input card number';
    this.btn.innerText = 'Click to validate';

    PSystems.list.forEach((item) => {
      const cardEl = document.createElement('div');
      cardEl.classList.add('card', item.code);
      this.cards.append(cardEl);
    });

    this.btn.addEventListener('click', (event) => {
      event.preventDefault();
      this.checkNumber();
    });

    this.widget.append(this.cards);
    formControl.append(this.inp);
    formControl.append(this.btn);
    this.widget.append(formControl);
    this.widget.append(this.errors);
  }

  checkNumber() {
    const number = this.inp.value.replace(/[^\w]/g, '');
    this.togglePSystemCardActive(this.currentPSystem);
    this.currentPSystem = PSystems.identity(number);
    this.togglePSystemCardActive(this.currentPSystem);
    this.errors.innerHTML = (Validator.checkCardNumber(number, this.currentPSystem)) ? '' : 'Wrong card number';
  }

  togglePSystemCardActive(currentPSystem) {
    if (currentPSystem) {
      this.cards.querySelector(`.${currentPSystem.code}`).classList.toggle('active');
    }
  }
}
