/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const tsPresent = require('ts-jest/jest-preset');
const jestMongoPreset = require('@shelf/jest-mongodb/jest-preset');

module.exports = {
  testEnvironment: 'node',
  ...tsPresent,
  ...jestMongoPreset,
};
