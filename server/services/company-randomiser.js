const _ = require('lodash');

module.exports = randomise;

function randomise(companies) {
  return _.sampleSize(companies, 20);
}