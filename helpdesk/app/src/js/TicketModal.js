import Collapse from './Collapse';

export default class TicketModal {
  constructor(initiator, title) {
    this.initiator = initiator;
    this.title = title;
    this.ticket = {};
    this.create = (f) => f;
    this.update = (f) => f;
  }

  // eslint-disable-next-line class-methods-use-this
  get rawHtml() {
    return `
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title" data-role="modal-title"></p>
          <button class="delete close"></button>
        </header>
        <div class="modal-card-body">
          <form>
            <div class="field">
              <input name="name" class="input" type="email" placeholder="Email">
            </div>
            <div class="field">
              <textarea name="description" class="textarea" rows="3" placeholder="textarea"></textarea>
            </div>
          </form>
        </div>
        <footer class="modal-card-foot is-justify-content-end">
          <button class="button close">Отмена</button>
          <button class="button is-success" data-role="save-btn">Сохранить</button>
        </footer>
      </div>`;
  }

  fill({ id, name, description } = {}) {
    this.ticket.id = id;
    this.ticket.name = name || '';
    this.ticket.description = description || '';

    this.elName.value = this.ticket.name;
    this.elDescription.value = this.ticket.description;
    this.elModalTitle.innerHTML = (!id) ? 'Создать тикет' : 'Изменить тикет';
  }

  init() {
    this.el = document.createElement('div');
    this.el.innerHTML = this.rawHtml;

    this.elName = this.el.querySelector('[name="name"]');
    this.elDescription = this.el.querySelector('[name="description"]');
    this.elModalTitle = this.el.querySelector('[data-role="modal-title"]');
    this.elSaveBtn = this.el.querySelector('[data-role="save-btn"]');

    this.elSaveBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.ticket.name = this.elName.value;
      this.ticket.description = this.elDescription.value;
      if (!this.ticket.id) {
        this.create(this.ticket);
      } else {
        this.update(this.ticket);
      }
      this.elModal.toggle();
    });

    this.elModal = new Collapse(
      this.initiator,
      this.el,
      {
        hideClass: 'modal',
        toggleClass: 'is-active',
        cb: () => this.fill(),
      },
    );
    this.elModal.init();

    document.body.append(this.el);
  }
}
