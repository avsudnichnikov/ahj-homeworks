export default class Storage {
  constructor(stateTitle) {
    this.stateTitle = stateTitle;
  }

  load() {
    try {
      return localStorage.getItem(this.stateTitle);
    } catch (e) {
      return '';
    }
  }

  save(text) {
    window.localStorage.setItem(this.stateTitle, text);
  }
}
