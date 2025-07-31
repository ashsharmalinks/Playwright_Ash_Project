module.exports = {
  default: {
    require: [
      'E2E/step-definitions/**/*.ts',
      'E2E/support/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['json:reports/cucumber-report.json'],
    paths: ['E2E/features/**/*.feature'],
    publishQuiet: true
  }
};
