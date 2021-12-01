const Validator = {
  luhn(number) {
    const sum = number.split('').reduce(
      (acc, item, index) => {
        const digit = +item * (1 + ((number.length - index) % 2));
        const units = digit % 10;
        const tens = (digit - units) / 10;
        return acc + units + tens;
      }, 0,
    );
    return ((250 - sum) % 10);
  },

  checkCardNumber(number, PSystem = null) {
    if (/[^\d]/.test(number)) {
      return false;
    }

    if (PSystem) {
      if (number.length > PSystem.max || number.length < PSystem.min) {
        return false;
      }
    }

    return this.luhn(number.substring(0, number.length - 1)) === +number[number.length - 1];
  },
};

export default Validator;
