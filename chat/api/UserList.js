const { v4: uuidv4 } = require('uuid');

class UserList {
  constructor() {
    this.list = [];
  }

  all() {
    return this.list.map((item) => ({ username: item.username }));
  }

  getUsernameByToken(token) {
    return (this.list.find((item) => item.token === token) || {}).username;
  }

  getIndexByUsername(username) {
    return this.list.findIndex((item) => item.username === username);
  }

  add({ username }) {
    if (!username) {
      throw new Error('Username is required');
    }
    if (this.getIndexByUsername(username) !== -1) {
      throw new Error(`Username ${username} is already taken.`);
    }
    if (username.length < 4) {
      throw new Error('Username length must be more than 3 characters');
    }
    const user = {
      username,
      token: uuidv4(),
    };
    this.list.push(user);
    return user;
  }

  delete(username) {
    return this.list.splice(this.getIndexByUsername(username), 1);
  }
}

module.exports = UserList;
