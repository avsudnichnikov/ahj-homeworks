import Ticket from './Ticket';
import TicketModal from './TicketModal';
import Request from './Request';

export default class TicketBoard {
  constructor(selector, baseUrl) {
    this.el = document.querySelector(selector);
    this.baseUrl = baseUrl;
  }

  render() {
    this.tickets.forEach((ticket) => {
      this.renderTicket(ticket);
    });
  }

  initAddModal() {
    const addTicketModalBtn = document.querySelector('#addTicketModalBtn');
    this.modal = new TicketModal(addTicketModalBtn);
    this.modal.create = (ticket) => this.add(ticket);
    this.modal.update = (ticket) => this.update(ticket);
    this.modal.init();
  }

  renderTicket(ticket) {
    ticket.render(this.el);
    ticket.elStatusBtn.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
      this.changeStatus(ticket.id);
    });
    ticket.elEditBtn.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
      this.detail(ticket.id);
      this.modal.elModal.toggle();
    });
    ticket.elDeleteBtn.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
      this.delete(ticket.id);
    });
    // eslint-disable-next-line no-param-reassign
    ticket.elCollapse.cb = () => this.detail(ticket.id);
  }

  getById(id) {
    return this.tickets.find((ticket) => ticket.id === id);
  }

  getIndexById(id) {
    return this.tickets.findIndex((ticket) => ticket.id === id);
  }

  load(reset = false) {
    const handler = (response) => {
      this.tickets = response.map((item) => new Ticket(item));
      if (reset) {
        while (this.el.firstChild) {
          this.el.removeChild(this.el.firstChild);
        }
      }
      this.render();
    };
    const request = new Request(
      'get',
      `${this.baseUrl}?method=allTickets`,
      handler,
    );
    request.send();
  }

  detail(id) {
    this.getById(id);
    const request = new Request(
      'get',
      `${this.baseUrl}?method=ticketById&id=${id}`,
      (ticket) => {
        this.getById(id).description = ticket.description;
        this.modal.fill(ticket);
      },
    );
    request.send();
  }

  add(data) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    const request = new Request(
      'post',
      `${this.baseUrl}?method=createTicket`,
      () => this.load(true),
    );
    request.send(formData);
  }

  changeStatus(id) {
    const formData = new FormData();
    formData.append('status', !this.getById(id).status);
    const request = new Request(
      'post',
      `${this.baseUrl}?method=updateTicket&id=${id}`,
      () => this.load(true),
    );
    request.send(formData);
  }

  update({ id, ...data }) {
    this.getById(id);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    const request = new Request(
      'post',
      `${this.baseUrl}?method=updateTicket&id=${id}`,
      () => this.load(true),
    );
    request.send(formData);
  }

  delete(id) {
    this.getById(id);
    const request = new Request(
      'post',
      `${this.baseUrl}?method=deleteTicket&id=${id}`,
      () => this.load(true),
    );
    request.send();
  }
}
