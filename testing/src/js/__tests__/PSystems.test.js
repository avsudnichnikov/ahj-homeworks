import PSystems from '../PSystems';

test('mir', () => {
  const value = '2200000000000000';
  const received = PSystems.identity(value).code;
  const expected = 'mir';
  expect(expected).toBe(received);
});

test('diners club', () => {
  const value = '30047499253354';
  const received = PSystems.identity(value).code;
  const expected = 'din';
  expect(expected).toBe(received);
});

test('jcb', () => {
  const value = '3589239542915324';
  const received = PSystems.identity(value).code;
  const expected = 'jcb';
  expect(expected).toBe(received);
});

test('american express', () => {
  const value = '377621453258566';
  const received = PSystems.identity(value).code;
  const expected = 'ame';
  expect(expected).toBe(received);
});

test('visa', () => {
  const value = '4929196557227705';
  const received = PSystems.identity(value).code;
  const expected = 'vis';
  expect(expected).toBe(received);
});

test('mastercard', () => {
  const value = '5504912590422644';
  const received = PSystems.identity(value).code;
  const expected = 'mas';
  expect(expected).toBe(received);
});

test('discovery', () => {
  const value = '6011374704675894';
  const received = PSystems.identity(value).code;
  const expected = 'dis';
  expect(expected).toBe(received);
});

test('maestro', () => {
  const value = '6763044566023018';
  const received = PSystems.identity(value).code;
  const expected = 'mae';
  expect(expected).toBe(received);
});

test('noname', () => {
  const value = '9900000000000000';
  const received = PSystems.identity(value);
  const expected = false;
  expect(expected).toBe(received);
});
