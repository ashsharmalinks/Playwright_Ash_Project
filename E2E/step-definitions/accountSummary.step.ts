import {Then } from '@cucumber/cucumber';
import { AccountSummaryPage } from "../pages/AccountSummaryPage";
import { CustomWorld } from '../support/custom-world';


Then('the account summary should have Cash Accounts with two savings accounts', async function (this: CustomWorld) {
    if (!this.accountSummaryPage) {
        this.accountSummaryPage = new AccountSummaryPage(this.page);
  }
    const savingsCount = await this.accountSummaryPage.getSavingsAccountCountUnderCashAccounts();

    // Assertion
    if (savingsCount !== 2) {
      throw new Error(
        `❌ Validation failed: Expected 2 savings accounts under 'Cash Accounts', but found ${savingsCount}`
      );
    }

    console.log('✅ Verified: Found 2 savings accounts under Cash Accounts.');
  
});

Then('all naviagtion links should be working on account summary page', async function (this: CustomWorld) {
  // Ensure AccountSummaryPage instance is available
  if (!this.accountSummaryPage) {
    this.accountSummaryPage = new AccountSummaryPage(this.page);
  }
//   await this.page.waitForTimeout(10000);


  // Delegate the verification logic to the page object method
  await this.accountSummaryPage.verifyAllNavigationLinks();
});



Then('the account summary should have Investment Accounts with one brokerage account', async function (this: CustomWorld) {
    const accountSummaryPage = new AccountSummaryPage(this.page);
    this.accountSummaryPage = accountSummaryPage;
});

Then('the account summary should have Credit Accounts with credit card account', async function (this: CustomWorld) {
    const accountSummaryPage = new AccountSummaryPage(this.page);
    this.accountSummaryPage = accountSummaryPage;
});