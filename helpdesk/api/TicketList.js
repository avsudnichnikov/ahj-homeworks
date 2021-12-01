const Ticket = require('./Ticket');

class TicketList {
  constructor(list = []) {
    this.list = list.map((item) => new Ticket(item));
  }

  all() {
    return this.list.map((item) => ({
      id: item.id,
      name: item.name,
      status: item.status,
      created: item.created,
    }));
  }

  getById(id) {
    return this.list[this.getIndexById(id)];
  }

  getIndexById(id) {
    return this.list.findIndex((ticket) => ticket.id === id);
  }

  create(data) {
    const ticket = new Ticket(data);
    this.list.push(ticket);
    return ticket;
  }

  update(id, data) {
    return this.getById(id).update(data);
  }

  delete(id) {
    return !!this.list.splice(this.getIndexById(id), 1);
  }
}

module.exports = TicketList;
