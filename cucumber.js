// cucumber.js
const path = require('path');

const allureFormatterPath = path.resolve(
  __dirname,
  'node_modules/allure-cucumberjs/dist/formatter.js'
);

module.exports = {
  default: {
    require: [
      'E2E/step-definitions/**/*.ts',
      'E2E/support/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      allureFormatterPath,
      '@cucumber/pretty-formatter'
    ],
    formatOptions: {
      [allureFormatterPath]: {
        resultsDir: 'allure-results'
      }
    },
    paths: ['E2E/features/**/*.feature'],
    publishQuiet: true
  }
};
