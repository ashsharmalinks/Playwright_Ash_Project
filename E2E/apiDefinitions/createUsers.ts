import { APIResponse } from '@playwright/test';
import { getApiContext } from './initApiContext';

export async function createUser(data: Record<string, any>): Promise<APIResponse> {
  const context = await getApiContext();
  return context.post('/api/users', { data });
}
