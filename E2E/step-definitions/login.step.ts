import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../support/custom-world';
import { logger } from '../utils/logger'; // ✅ import your structured logger
import { getCredentials } from '../utils/getCredentials';


Given('I open the login page', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigateTo();
  this.loginPage = loginPage;
  logger.info('📄 Opened login page');
});

When('I have clicked the sign-in button', async function (this: CustomWorld) {
  await this.loginPage?.clickSignIn();
  logger.info('✅ Clicked the sign-in button');
});

When('I enter valid credentials', async function (this: CustomWorld) {
  const { username, password } = getCredentials();
  await this.loginPage?.enterCredentials(username, password);
  logger.info('✅ Entered valid credentials');
  await this.loginPage?.submit();
  logger.info('📤 Submitted login form');
});

Then('I should be redirected to the account summary page', async function (this: CustomWorld) {
  const isDisplayed = await this.loginPage?.isDashboardDisplayed();
  if (isDisplayed) {
    logger.info('🏦 Successfully redirected to account summary page');
  } else {
    logger.error('❌ Failed to load account summary page');
    throw new Error('Account summary page was not displayed');
  }
});
