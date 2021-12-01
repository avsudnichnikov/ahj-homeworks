import demo from '../../demo';

test('test', () => {
  const received = 0;
  const expected = demo(received);
  expect(expected).toEqual(received);
});
