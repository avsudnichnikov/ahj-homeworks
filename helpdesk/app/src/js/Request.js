export default class Request {
  constructor(method, url, callback = (f) => f) {
    if (!method || !url) {
      throw new Error('Expected method and url');
    }
    this.method = method;
    this.url = url;
    this.callback = callback;
  }

  send(obj) {
    const xhr = new XMLHttpRequest();
    xhr.open(this.method, this.url);
    xhr.send(obj);
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          this.response = JSON.parse(xhr.responseText);
          this.callback(this.response);
        } else {
          console.error(xhr.responseText);
        }
      }
    });
  }
}
