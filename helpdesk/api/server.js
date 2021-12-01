const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const TicketList = require('./TicketList');

const server = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

const ticketList = new TicketList([
  { name: 'name', description: 'description' },
]);

server.use(cors());
server.use(bodyParser({
  multipart: true,
}));

router.get('/', async (ctx) => {
  switch (ctx.request.query.method) {
    case 'allTickets':
      ctx.response.body = JSON.stringify(ticketList.all());
      ctx.response.status = 200;
      break;
    case 'ticketById':
      ctx.response.body = JSON.stringify(ticketList.getById(ctx.request.query.id));
      ctx.response.status = 200;
      break;
    default:
      ctx.response.body = 'Page not found';
      ctx.response.status = 404;
      break;
  }
});

router.post('/', async (ctx) => {
  switch (ctx.request.query.method) {
    case 'createTicket':
      ctx.response.body = JSON.stringify(ticketList.create(ctx.request.body));
      ctx.response.status = 200;
      break;
    case 'updateTicket':
      ctx.response.body = JSON.stringify(ticketList.update(ctx.request.query.id, ctx.request.body));
      ctx.response.status = 200;
      break;
    case 'deleteTicket':
      ctx.response.body = JSON.stringify(ticketList.delete(ctx.request.query.id));
      ctx.response.status = 200;
      break;
    default:
      ctx.response.status = 404;
      ctx.response.body = 'Page not found';
      break;
  }
});

server.use(router.routes());
server.use(router.allowedMethods());

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
