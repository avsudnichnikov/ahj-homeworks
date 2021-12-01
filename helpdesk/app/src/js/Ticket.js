/* eslint-disable no-underscore-dangle */

import Collapse from './Collapse';

export default class Ticket {
  constructor({
    id, name, description, status, created,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status || false;
    this.created = created || new Date().toLocaleString();
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
    if (this.elDescriptionInfo) {
      this.elDescriptionInfo.innerText = value;
    }
  }

  get rawHTML() {
    const icon = (this.status) ? 'fa-check-circle' : 'fa-circle';
    const color = (this.status) ? 'is-success' : 'is-danger';
    return `
      <div class="card-header">
        <div class="card-header-title">
          <div class="is-flex is-align-content-center">
            <button class="button ${color} is-light" data-role="status-btn">
              <span class="icon">
                <i class="fas ${icon}"></i>
              </span>
            </button>
          </div>
          <p class="is-flex-grow-1 ml-2 mr-1">${this.name}</p>
          <div class="is-flex is-align-content-center">
            <button class="button is-link edit-btn" data-role="edit-btn">
              <span class="icon"><i class="fas fa-pen"></i></span>
            </button>
            <button class="button is-danger delete-btn ml-1" data-role="delete-btn">
              <span class="icon"><i class="fas fa-trash"></i></span>
            </button>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="content is-small mb-0">${this.created}</div>
        <div class="content" data-role="description-info"></div>
      </div>`;
  }

  render(parent) {
    this.el = document.createElement('div');
    this.el.classList.add('card');
    this.el.innerHTML = this.rawHTML;

    const cardHeader = this.el.querySelector('.card-header');
    const cardContent = this.el.querySelector('.card-content');
    this.elDescriptionInfo = cardContent.querySelector('[data-role="description-info"]');
    this.elStatusBtn = cardHeader.querySelector('[data-role="status-btn"]');
    this.elEditBtn = cardHeader.querySelector('[data-role="edit-btn"]');
    this.elDeleteBtn = cardHeader.querySelector('[data-role="delete-btn"]');

    this.elEditBtn.disabled = !!this.status;

    this.elCollapse = new Collapse(cardHeader, cardContent);
    this.elCollapse.init();

    if (parent) {
      parent.append(this.el);
    }
    return this.el;
  }
}
