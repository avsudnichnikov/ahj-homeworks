// eslint-disable-next-line import/no-unresolved
import TicketBoard from './TicketBoard';

const board = new TicketBoard(
  '#ticketList',
  'https://localhost:3000/',
);

board.initAddModal();
board.load();
