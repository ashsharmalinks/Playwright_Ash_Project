import { Page } from 'playwright';
import { logger } from '../utils/logger'; // ✅ Adjust path if needed

export class FeedbackPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("http://zero.webappsecurity.com/");
    logger.info("🌐 Navigated to feedback page.");
  }

  async clickFeedbackLink(): Promise<void> {
    const feedbackInBtn = this.page.locator("#feedback");
    await feedbackInBtn.waitFor({ state: "visible", timeout: 5000 });
    await feedbackInBtn.click();
    logger.info("✅ Clicked feedback link");
  }

  async enterFeedbackData(
    username: string,
    eaddress: string,
    subject: string,
    message: string
    ): Promise<void> {
    await this.page.fill("#name", username);
    await this.page.fill("#email", eaddress);
    await this.page.fill("#subject", subject);
    await this.page.fill("#comment", message);
    logger.info(`🔐 Entered feedback data for user: ${username}`);
  }

  async submitFeedback(){
    logger.info("🚀 Submitting feedback form...");
    await this.page.click('input[type="submit"][value="Send Message"]');
    logger.info("➡️ Feedback form submitted.");
  }
}