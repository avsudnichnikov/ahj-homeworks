const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const randInt = require('./randInt');

const getFakeMessage = () => ({
  id: uuidv4(),
  from: faker.internet.email(),
  subject: faker.lorem.sentence(),
  body: faker.lorem.paragraphs(),
  received: Date.now() - randInt(4000, 0),
});

const getFakeMessages = (max = 1, min = 1) => {
  const count = randInt(max, min);
  const result = [];
  for (let i = 0; i < count; i += 1) {
    result.unshift(getFakeMessage());
  }
  return result.sort((a, b) => a.timestamp - b.timestamp);
};

module.exports = getFakeMessages;
