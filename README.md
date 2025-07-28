# 🧪 Playwright + Cucumber + TypeScript Automation Framework

![Node.js CI](https://img.shields.io/badge/build-passing-brightgreen)
![Language](https://img.shields.io/badge/TypeScript-✓-3178c6)
![Playwright](https://img.shields.io/badge/Playwright-tested-45ba63)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

This is a robust end-to-end test automation framework using:

- 🎭 [Playwright](https://playwright.dev/) — for cross-browser automation
- 🥒 [CucumberJS](https://github.com/cucumber/cucumber-js) — for BDD syntax
- ⌨️ TypeScript — strongly typed, scalable automation code
- 📊 `cucumber-html-reporter` — auto-generated test reports
- 🧾 `pino` — structured logging to console and file
- 📷 Auto screenshot & trace on failure

---

## 🧰 Features

- Cross-browser support (Chromium, Firefox, WebKit)
- Gherkin `.feature` test scenarios
- Modular `Page Object Model`
- CI-friendly structure (GitHub Actions, Azure DevOps)
- Reports: HTML + JSON
- Screenshot & tracing on failure

---

## 📁 Folder Structure

# 🧪 Playwright + Cucumber + TypeScript Automation Framework

![Node.js CI](https://img.shields.io/badge/build-passing-brightgreen)
![Language](https://img.shields.io/badge/TypeScript-✓-3178c6)
![Playwright](https://img.shields.io/badge/Playwright-tested-45ba63)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

This is a robust end-to-end test automation framework using:

- 🎭 [Playwright](https://playwright.dev/) — for cross-browser automation
- 🥒 [CucumberJS](https://github.com/cucumber/cucumber-js) — for BDD syntax
- ⌨️ TypeScript — strongly typed, scalable automation code
- 📊 `cucumber-html-reporter` — auto-generated test reports
- 🧾 `pino` — structured logging to console and file
- 📷 Auto screenshot & trace on failure

---

## 🧰 Features

- Cross-browser support (Chromium, Firefox, WebKit)
- Gherkin `.feature` test scenarios
- Modular `Page Object Model`
- CI-friendly structure (GitHub Actions, Azure DevOps)
- Reports: HTML + JSON
- Screenshot & tracing on failure

---

## 📁 Folder Structure


---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install

# Run test and output cucumber JSON
npm run test:json

# Generate HTML report
npm run report:html

Feature: Login

  Scenario: Successful login
    Given I open the login page
    When I enter valid credentials
    Then I should be redirected to the account summary page

"scripts": {
  "test:json": "cucumber-js --require-module ts-node/register --require E2E/**/*.ts --format json:reports/cucumber-report.json",
  "report:html": "ts-node report-generator.ts"
}
