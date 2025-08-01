import { APIResponse } from '@playwright/test';
import { getApiContext } from './initApiContext';

export async function getUsers(): Promise<APIResponse> {
  const context = await getApiContext();
  return context.get('/api/users?page=2');
}
