const { v4: uuidv4 } = require('uuid');

class Ticket {
  constructor({
    name, description, status, created,
  }) {
    if (!name || !description) {
      throw new Error('Expected name and description');
    }
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.status = status || false;
    this.created = created || new Date().toLocaleString();
  }

  update({ name, description, status }) {
    if (typeof (name) !== 'undefined') {
      this.name = name;
    }
    if (typeof (description) !== 'undefined') {
      this.description = description;
    }
    if (typeof (status) !== 'undefined') {
      if ((typeof (status) === 'string') && (status !== 'true')) {
        this.status = false;
      } else {
        this.status = !!status;
      }
    }
    return this;
  }
}

module.exports = Ticket;
