import Popover from './Popover';

document.querySelectorAll('.popover').forEach((item) => {
  const popover = new Popover(item, document.querySelector(`button[data-target=${item.id}]`));
  popover.init();
});
