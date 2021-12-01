const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const Router = require('koa-router');
const WS = require('ws');

const UserListController = require('./UserListController');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

const users = new UserListController();

app.use(cors());
app.use(bodyParser({
  json: true,
}));

router.get('/', async (ctx) => {
  ctx.response.body = { greeting: 'hello' };
});

router.get('/users', (ctx) => {
  ctx.response.body = users.all();
  ctx.response.status = 200;
});

router.post('/users', (ctx) => {
  ctx.response.body = users.add(ctx.request.body);
  ctx.response.status = 200;
});

const server = http.createServer(app.callback());
const wss = new WS.Server({ server });

wss.on('connection', (ws, req) => {
  const broadcast = (response) => {
    [...wss.clients]
      .filter((client) => client.readyState === WS.OPEN)
      .forEach((client) => client.send(JSON.stringify(response)));
  };

  // eslint-disable-next-line no-param-reassign
  ws.username = users.users.getUsernameByToken(req.headers['sec-websocket-protocol']);

  if (!ws.username) {
    ws.terminate();
  }

  broadcast({
    event: 'connect',
    data: { username: ws.username },
  });

  ws.on('message', (request) => {
    const { message } = JSON.parse(request).data;
    broadcast({
      event: 'message',
      data: {
        username: ws.username,
        message,
        date: new Date(),
      },
    });
  });

  ws.on('close', () => {
    const deletedUser = users.users.delete(ws.username);
    if (deletedUser) {
      broadcast({
        event: 'disconnect',
        data: { username: ws.username },
      });
    }
  });
});

app
  .use(router.routes())
  .use(router.allowedMethods());

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
