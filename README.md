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



---

## 📊 Allure Reporting Setup

This project uses [Allure Report](https://docs.qameta.io/allure/) to generate rich, interactive test reports for CucumberJS-based tests.

### 🔧 Prerequisites

Make sure the following dependencies are installed (already included in `package.json`):

```bash
npm install
```

> This installs `cucumber-js`, `allure-cucumberjs`, and `allure-commandline` locally.

---

### 🚀 How to Run Tests and Generate Allure Report

#### 1. Run Tests and Generate Results

```bash
npm run allure:test
```

This executes the Cucumber tests and outputs raw Allure results to the `results/` folder.

#### 2. Generate HTML Report

```bash
npm run allure:report
```

This converts the raw result files in `results/` into a browsable HTML report in the `allure-report/` folder.

#### 3. Open the Report in Your Browser

```bash
npm run allure:open
```

This will open the Allure report in your default web browser using a local web server.

---

### 💡 Run Everything in One Command

For convenience, you can run all steps (test + generate + open) with a single command:

```bash
npm run allure:run
```

---

### 📁 Report Output Structure

After running the tests and generating the report, you'll have the following:

* `results/`: Raw `.json` test result files
* `allure-report/`: Final HTML report files (can be committed or shared)
* Automatically opens in your browser

---

### 🧪 Custom Tags for Reporting (Optional)

To enhance your reports, you can annotate scenarios with tags in `.feature` files:

```gherkin
@epic:Login @severity:critical @jira:QA-123
Scenario: User logs in successfully
  Given I navigate to the login page
  ...
```

These will be reflected as labels, links, and categories in the Allure report.

---

### 🧪 Run Tagged Tests in Headed Mode

To run only specific scenarios (e.g. `@feedbackForm`) in **headed mode** using Playwright with Cucumber.js, use the following command:

```bash
npx cross-env PLAYWRIGHT_HEADLESS=false cucumber-js --tags "@feedbackForm"
```

#### 🔍 Command Breakdown:

| 🔧 Part                     | 📝 Description                                                              |
| --------------------------- | --------------------------------------------------------------------------- |
| `npx`                       | Runs binaries from your local `node_modules` without a global install.      |
| `cross-env`                 | Ensures `PLAYWRIGHT_HEADLESS` works cross-platform (Windows, macOS, Linux). |
| `PLAYWRIGHT_HEADLESS=false` | Runs the test in **headed mode** (i.e., browser UI will be visible).        |
| `cucumber-js`               | Runs your feature files via Cucumber.js.                                    |
| `--tags "@feedbackForm"`    | Runs only the tests/scenarios tagged with `@feedbackForm`.                  |

#### ✅ Use Case:

* Visual debugging in the browser
* Testing only a specific feature (e.g. Feedback Form)
* Ensuring end-to-end flows work with UI

---

> 💡 **Tip:** Tag your scenarios in `.feature` files like this:

```gherkin
@feedbackForm
Scenario: Submit valid feedback
  Given I navigate to the feedback form
  When I enter valid feedback and click submit
  Then I should see a confirmation message
```
### 🔐 Handling Credentials (Local vs CI)

This project uses a secure and flexible approach to manage login credentials for UI/API testing:

#### ✅ **Local Development**

When running tests locally, credentials are loaded from a file:

```
tests/fixtures/credentials.local.json
```

Example:

```json
{
  "email": "localuser@example.com",
  "password": "localpassword123"
}
```

> ⚠️ This file is excluded from version control via `.gitignore`.

---

#### ✅ **CI Environment**

In CI (e.g. GitHub Actions, Azure DevOps), credentials are pulled from **environment variables**:

| Variable Name    | Description            |
| ---------------- | ---------------------- |
| `LOGIN_EMAIL`    | User email or username |
| `LOGIN_PASSWORD` | User password          |

CI pipelines should define these securely using the tool’s secret management.

Example (GitHub Actions):

```yaml
env:
  LOGIN_EMAIL: ${{ secrets.LOGIN_EMAIL }}
  LOGIN_PASSWORD: ${{ secrets.LOGIN_PASSWORD }}
```

### 🧩 AbstractPage – Reusable Base Class

The `AbstractPage` class provides a reusable foundation for all page objects, encapsulating common actions with built-in logging and error handling.

**Key Methods:**

* `waitForElement(selector, timeout?)`
* `clickElement(selector)`
* `getElementText(selector)`
* `wait(timeout)`

**Usage Example:**

```ts
export class LoginPage extends AbstractPage {
  async login(email: string, password: string) {
    await this.waitForElement('#email');
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.clickElement('text=Login');
  }
}
```

✅ Improves code reuse
✅ Standardized logging
✅ Cleaner, more maintainable tests