import reporter, { Options } from 'cucumber-html-reporter';

const options: Options = {
  theme: 'bootstrap', // ✅ TS-safe value
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    Platform: 'Windows',
    Browser: 'Playwright (headless)',
    Executed: 'Local'
  }
};

reporter.generate(options);
