const path = require('path');
const os = require('os');
const process = require('process');
const { Status } = require('allure-js-commons');

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
        resultsDir: 'allure-results',
        labels: [
          { pattern: [/@epic:(.*)/], name: 'epic' },
          { pattern: [/@severity:(.*)/], name: 'severity' }
        ],
        links: {
          issue: {
            pattern: [/@issue:(.*)/],
            urlTemplate: 'https://issues.example.com/%s',
            nameTemplate: 'ISSUE %s'
          },
          tms: {
            pattern: [/@tms:(.*)/],
            urlTemplate: 'https://tms.example.com/%s'
          },
          jira: {
            pattern: [/@jira:(.*)/],
            urlTemplate: (v) => `https://jira.example.com/browse/${v}`
          }
        },
        categories: [
          {
            name: 'UI Failures',
            messageRegex: '.*(Button not clickable|Element not found).*',
            matchedStatuses: [Status.FAILED]
          },
          {
            name: 'Backend Errors',
            messageRegex: '.*(500|Timeout|Service Unavailable).*',
            matchedStatuses: [Status.BROKEN]
          }
        ],
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version ? os.version() : 'N/A',
          node_version: process.version
        }
      }
    },
    paths: ['E2E/features/**/*.feature'],
    publishQuiet: true
  }
};
