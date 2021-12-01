const UserList = require('./UserList');

class UserListController {
  constructor() {
    this.users = new UserList();
  }

  all() {
    return {
      data: this.users.all(),
      code: 'success',
    };
  }

  add({ username }) {
    try {
      return {
        data: this.users.add({ username }),
        code: 'success',
      };
    } catch (e) {
      return {
        errors: {
          username: e.message,
        },
        code: 'invalid',
      };
    }
  }
}

module.exports = UserListController;
