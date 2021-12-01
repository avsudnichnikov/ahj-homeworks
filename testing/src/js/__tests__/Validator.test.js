import Validator from '../Validator';

test('check card type - invalid 1', () => {
  const value = 'q123';
  const received = Validator.checkCardNumber(value);
  const expected = false;
  expect(expected).toBe(received);
});

test('check card luhn - valid 1', () => {
  const value = '18';
  const received = Validator.checkCardNumber(value);
  const expected = true;
  expect(expected).toBe(received);
});

test('check card luhn - valid 2', () => {
  const value = '331';
  const received = Validator.checkCardNumber(value);
  const expected = true;
  expect(expected).toBe(received);
});

test('check card luhn - valid 3', () => {
  const value = '2202000000000002';
  const received = Validator.checkCardNumber(value);
  const expected = true;
  expect(expected).toBe(received);
});

test('check card luhn - valid 4', () => {
  const value = '2000000000000022';
  const received = Validator.checkCardNumber(value);
  const expected = true;
  expect(expected).toBe(received);
});

test('check card luhn - valid 5', () => {
  const value = '00';
  const received = Validator.checkCardNumber(value);
  const expected = true;
  expect(expected).toBe(received);
});

test('check card luhn - valid 6', () => {
  const value = '1111111';
  const received = Validator.checkCardNumber(value);
  const expected = true;
  expect(expected).toBe(received);
});

test('check card luhn - invalid 1', () => {
  const value = '01';
  const received = Validator.checkCardNumber(value);
  const expected = false;
  expect(expected).toBe(received);
});

test('check card luhn - invalid 2', () => {
  const value = '11';
  const received = Validator.checkCardNumber(value);
  const expected = false;
  expect(expected).toBe(received);
});

test('check card luhn - invalid 3', () => {
  const value = '2000000000000002';
  const received = Validator.checkCardNumber(value);
  const expected = false;
  expect(expected).toBe(received);
});

test('check card pay system - valid 1', () => {
  const value = '00';
  const received = Validator.checkCardNumber(value, { min: 1, max: 2 });
  const expected = true;
  expect(expected).toBe(received);
});

test('check card pay system - valid 2', () => {
  const value = '1111111';
  const received = Validator.checkCardNumber(value, { min: 7, max: 7 });
  const expected = true;
  expect(expected).toBe(received);
});

test('check card pay system - valid 3', () => {
  const value = '2202000000000002';
  const received = Validator.checkCardNumber(value, { min: 16, max: 16 });
  const expected = true;
  expect(expected).toBe(received);
});

test('check card pay system - valid 4', () => {
  const value = '1111111';
  const received = Validator.checkCardNumber(value, { min: 4, max: 14 });
  const expected = true;
  expect(expected).toBe(received);
});

test('check card pay system - valid 5', () => {
  const value = '1111111';
  const received = Validator.checkCardNumber(value, { min: 7, max: 7 });
  const expected = true;
  expect(expected).toBe(received);
});

test('check card pay system - invalid 1', () => {
  const value = '1111111';
  const received = Validator.checkCardNumber(value, { min: 1, max: 1 });
  const expected = false;
  expect(expected).toBe(received);
});

test('check card pay system - invalid 2', () => {
  const value = '1111111';
  const received = Validator.checkCardNumber(value, { min: 16, max: 1 });
  const expected = false;
  expect(expected).toBe(received);
});

test('check card pay system - invalid 3', () => {
  const value = '1111111';
  const received = Validator.checkCardNumber(value, { min: 16, max: 1 });
  const expected = false;
  expect(expected).toBe(received);
});
