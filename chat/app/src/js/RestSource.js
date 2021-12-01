export default class RestSource {
  constructor(url) {
    this.url = url;
  }

  // eslint-disable-next-line class-methods-use-this
  error(error) {
    console.warn(error.message);
  }

  get(callback = (f) => f) {
    fetch(this.url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => this.error(error));
  }

  post(obj = {}, callback = (f) => f) {
    fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => this.error(error));
  }
}
