module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'E2E/step-definitions/**/*.ts',
      'E2E/support/**/*.ts'
    ],
    format: [
      'json:reports/cucumber-report.json',
      '@cucumber/pretty-formatter'
    ],
    paths: ['E2E/features/**/*.feature']  }
};
