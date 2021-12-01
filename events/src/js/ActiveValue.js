export default class ActiveValue {
  constructor(selector, defaultValue = '') {
    this.el = document.querySelector(selector);
    this.value = defaultValue;
  }

  get value() {
    return +this.el.innerHTML;
  }

  set value(val) {
    this.el.innerHTML = val;
  }
}
