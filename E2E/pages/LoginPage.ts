import { Page } from 'playwright';
import { logger } from '../utils/logger'; // ✅ Adjust path if needed

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('http://zero.webappsecurity.com/');
    logger.info('🌐 Navigated to login page.');
  }

  async clickSignIn(): Promise<void> {
    const signInBtn = this.page.locator('#signin_button');
    await signInBtn.waitFor({ state: 'visible', timeout: 5000 });
    await signInBtn.click();
    logger.info('✅ Clicked sign-in button.');
  }

  async enterCredentials(username: string, password: string): Promise<void> {
    await this.page.fill('#user_login', username);
    await this.page.fill('#user_password', password);
    logger.info(`🔐 Entered credentials for user: ${username}`);
  }

  async submit(): Promise<void> {
    logger.info('🚀 Submitting login form...');
    await this.page.click('text=Sign in');
    await this.page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
    logger.info('➡️ Navigated to account summary page after login.');
  }

  async isDashboardDisplayed(): Promise<boolean> {
    logger.info('📊 Checking if dashboard is displayed...');
    await this.page.waitForURL('**/account-summary.html', { timeout: 5000 });
    const isVisible = this.page.url().includes('/account-summary');
    logger.info(isVisible ? '✅ Dashboard is displayed.' : '❌ Dashboard is NOT displayed.');
    return isVisible;
  }
}
