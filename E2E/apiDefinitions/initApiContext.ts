import { request, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

export async function getApiContext(): Promise<APIRequestContext> {
  if (!apiContext) {
    apiContext = await request.newContext({
      baseURL: 'https://reqres.in', // Change as needed
    });
  }
  return apiContext;
}
