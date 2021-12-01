export default function addZeros(digit, left = 2, rest = '') {
  if (left >= `${digit}`.length) {
    return rest + addZeros(digit, left - 1, '0');
  }
  return digit;
}
