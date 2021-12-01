export default class Collapse {
  constructor(switchFunc = false) {
    this.switchFunc = switchFunc;
    if (this.switchFunc) {
      this.toggle = this.collapseToggle.bind(this);
    } else {
      this.toggle = this.collapseSimple.bind(this);
    }
  }

  init(initiator, target) {
    this.initiator = initiator;
    this.target = target;
    this.target.classList.add('collapse');
    if (this.switchFunc) {
      this.initiator.classList.add('collapse', 'show');
    }
    this.initiator.addEventListener('click', this.toggle);
    this.target.querySelectorAll('.close').forEach((close) => {
      close.addEventListener('click', this.toggle);
    });
  }

  collapseSimple() {
    this.target.classList.toggle('show');
  }

  collapseToggle() {
    this.target.classList.toggle('show');
    this.initiator.classList.toggle('show');
  }
}
