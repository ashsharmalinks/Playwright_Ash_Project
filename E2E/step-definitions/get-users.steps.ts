import { When, Then } from '@cucumber/cucumber';
import { getUsers } from '../apiDefinitions/getUsers';
import { expect, APIResponse } from '@playwright/test';

let response: APIResponse;

When('I request the list of users', async () => {
  response = await getUsers();
});

Then('the response status should be {int}', async (statusCode: number) => {
  expect(response.status()).toBe(statusCode);
});

Then('the response should contain a list of users', async () => {
  const body = await response.json();
  expect(body.data).toBeDefined();
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);
});
