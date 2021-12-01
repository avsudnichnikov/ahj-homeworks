// eslint-disable-next-line import/no-unresolved
import Collapse from './Collapse';

const collapse = new Collapse(
  document.querySelector('#collapseInitiator'),
  document.querySelector('#collapseTarget'),
);

collapse.init();
