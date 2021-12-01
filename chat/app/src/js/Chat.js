import RestSource from './RestSource';

export default class Chat {
  constructor(joinEl, chatEl, joinUrl, chatUrl) {
    this.chatEl = chatEl;
    this.chatUserEl = chatEl.querySelector('#users-tile');
    this.chatMessageEl = chatEl.querySelector('#messages-tile');
    this.chatSendBtn = chatEl.querySelector('#send-btn');
    this.chatSendInp = chatEl.querySelector('#send-inp');

    this.joinEl = joinEl;
    this.joinUrl = joinUrl;
    this.chatUrl = chatUrl;

    this.userSource = new RestSource(this.joinUrl);
    this.joinEl.querySelector('#join-btn').addEventListener('click', () => this.userRegister());
  }

  init() {
    this.ws = null;
    this.user = {};
    this.joinEl.classList.add('is-active');
    this.chatEl.classList.remove('is-active');
    this.chatSendBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.wsSend(this.chatSendInp.value);
      this.chatSendInp.value = '';
    });
  }

  userRegister() {
    const joinHelp = this.joinEl.querySelector('#join-help');
    const username = this.joinEl.querySelector('#join-inp').value;

    const handler = (resp) => {
      if (resp.code === 'success') {
        this.user = resp.data;
        joinHelp.innerText = '';
        console.log(`Join as ${this.user.username}`);
        this.start();
      } else {
        joinHelp.innerText = resp.errors.username;
      }
    };
    this.userSource.post({ username }, handler);
  }

  userListItemEl(username) {
    const userEl = document.createElement('div');
    userEl.classList.add('icon-text');
    userEl.dataset.username = username;
    userEl.innerHTML = `
      <span class="icon has-text-${(username === this.user.username) ? 'success' : 'info'}">
        <i class="fas fa-user"></i>
      </span>
      <span>${username}</span>`;
    return userEl;
  }

  userListRender() {
    const handler = (resp) => {
      if (resp.code === 'success') {
        this.users = resp.data;
        while (this.chatUserEl.firstChild) {
          this.chatUserEl.removeChild(this.chatUserEl.firstChild);
        }
        this.users.forEach((item) => this.chatUserEl.append(this.userListItemEl(item.username)));
      } else {
        console.log(resp.errors);
      }
    };
    this.userSource.get(handler);
  }

  start() {
    this.userListRender();
    this.joinEl.classList.remove('is-active');
    this.chatEl.classList.add('is-active');

    this.ws = new WebSocket(this.chatUrl, this.user.token);
    this.ws.addEventListener('open', (evt) => this.wsOpenHandler(evt));
    this.ws.addEventListener('message', (evt) => {
      const { event, data } = JSON.parse(evt.data);
      switch (event) {
        case 'message':
          this.wsMessageHandler(data);
          break;
        case 'connect':
          this.wsConnectHandler(data);
          break;
        case 'disconnect':
          this.wsDisconnectHandler(data);
          break;
        default:
          console.log(evt);
      }
    });
    this.ws.addEventListener('close', (evt) => this.wsCloseHandler(evt));
  }

  wsSend(message) {
    this.ws.send(JSON.stringify({ data: { message } }));
  }

  renderSystemMessageEl(message) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('notification-wrapper', 'system');
    messageEl.innerHTML = `
    <div class="notification">
      <p class="is-size-7 is-italic">
        <span>${message}</span>
      </p>
    </div>`;
    this.chatMessageEl.append(messageEl);
  }

  wsOpenHandler() {
    this.renderSystemMessageEl(`You joined as <strong>${this.user.username}</strong>`);
    this.wsSend('Hello, there!');
  }

  wsMessageHandler(data) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('notification-wrapper');

    let messageUsername = data.username;
    if (data.username === this.user.username) {
      messageEl.classList.add('self');
      messageUsername += ' (you)';
    }
    messageEl.innerHTML = `
    <div class="notification">
      <p class="is-size-7">
        <span class="has-text-weight-bold">${messageUsername}</span>
        <span>${(new Date(data.date)).toLocaleString()}</span>
      </p>
      <p class="is-size-6">${data.message}</p> 
    </div>`;
    this.chatMessageEl.append(messageEl);
  }

  wsConnectHandler(data) {
    if (data.username !== this.user.username) {
      this.chatUserEl.append(this.userListItemEl(data.username));
      this.renderSystemMessageEl(`<strong>${data.username}</strong> joined to chat`);
    }
  }

  wsDisconnectHandler(data) {
    if (data.username !== this.user.username) {
      this.chatUserEl.querySelector(`[data-username=${data.username}]`).remove();
      this.renderSystemMessageEl(`<strong>${data.username}</strong> left chat`);
    }
  }

  wsCloseHandler() {
    console.log('connection closed');
    this.init();
  }
}
