import fs from 'fs';
import path from 'path';

export function getCredentials() {
  // If running in CI, use environment variables
  if (process.env.CI === 'true') {
    const username = process.env.LOGIN_USERNAME;
    const password = process.env.LOGIN_PASSWORD;

    if (!username || !password) {
      throw new Error('Missing LOGIN_USERNAME or LOGIN_PASSWORD in CI environment variables.');
    }

    return { username, password };
  }

  // Else use local fixture file
  const credPath = path.resolve(__dirname, '../fixtures/credentials.local.json');
  if (!fs.existsSync(credPath)) {
    throw new Error('Local credentials file not found: credentials.local.json');
  }

  const data = JSON.parse(fs.readFileSync(credPath, 'utf-8'));
  return {
    username: data.username,
    password: data.password,
  };
}
