import { interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, catchError, pluck } from 'rxjs/operators';
/* eslint-disable import/no-unresolved */
import dateFormat from 'utls/dateFormat';

export default class Polling {
  constructor(el, url) {
    this.url = url;
    this.el = el;
  }

  start() {
    interval(5000)
      .pipe(
        switchMap(() => ajax.getJSON(this.url)
          .pipe(
            pluck('messages'),
            catchError(() => of([])),
          )),
      )
      .subscribe({
        next: (res) => res.forEach((message) => this.addMessageEl(message)),
      });
  }

  addMessageEl(message = {}) {
    const el = document.createElement('div');
    el.classList.add('message', 'is-dark', 'mb-1');
    el.innerHTML = `
      <div class="message-body">
        <div class="is-flex is-justify-content-space-between">
          <div class="message-from">${message.from}</div>
          <div class="message-received">
            ${dateFormat(new Date(message.received))}
          </div>
        </div>
        <div class="message-subject">
          ${(message.subject.length > 15) ? `${message.subject.substr(0, 15)}…` : message.subject}
        </div>
      </div>`;
    this.el.prepend(el);
  }
}
