const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const Router = require('koa-router');

const getFakeMessages = require('./getFakeMessages');

const server = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

server.use(cors());
server.use(bodyParser({
  json: true,
}));

router.get('/', async (ctx) => {
  ctx.response.body = { data: 'hello, world' };
});

router.get('/messages/unread', (ctx) => {
  ctx.response.body = {
    status: 'ok',
    timestamp: Date.now(),
    messages: getFakeMessages(3, 0),
  };
  ctx.response.status = 200;
});

server
  .use(router.routes())
  .use(router.allowedMethods());

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
