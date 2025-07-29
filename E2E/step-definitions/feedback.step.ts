import {When, Then } from '@cucumber/cucumber';
import { FeedbackPage } from "../pages/FeedbackPage";
import { CustomWorld } from '../support/custom-world';
import { logger } from '../utils/logger';
import { expect } from '@playwright/test';



When('I have clicked the feedback form button', async function (this: CustomWorld) {
  if (!this.feedbackPage) {
    this.feedbackPage = new FeedbackPage(this.page);
  }
  await this.feedbackPage.navigateTo();

  await this.feedbackPage?.clickFeedbackLink();
  await this.page.waitForTimeout(5000); // waits 5 seconds

  logger.info('✅ Clicked the sign-in button');
})



When('I fill in the feedback form with valid data', async function (this: CustomWorld) {
  if (!this.feedbackPage) {
    this.feedbackPage = new FeedbackPage(this.page);
  }
  await this.feedbackPage?.enterFeedbackData('John Doe', 'test@gmail.com', 'Feedback Subject', 'This is a test feedback message.');
  // await this.page.waitForTimeout(5000); // waits 5 seconds
  await this.feedbackPage?.submitFeedback();
  logger.info('🚀 Feedback form submitted successfully');
})


Then('I should see the feedback confirmation message', async function () {
  await this.page.waitForSelector('#feedback-title');
  const text = await this.page.textContent('div.offset3');
  expect(text).toContain('Thank you for your comments');
});
