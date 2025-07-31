import { Given, When, Then } from '@cucumber/cucumber';
import { request, APIResponse, expect } from '@playwright/test';

let response: APIResponse;
let context: any;

Given('the Reqres API is available', async () => {
  context = await request.newContext({
    baseURL: 'https://reqres.in'
  });
});

When('I send a GET request to {string}', async (endpoint: string) => {
  response = await context.get(endpoint);
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
