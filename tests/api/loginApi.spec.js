
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve('config/dev_api.env');
const envVars = Object.fromEntries(
  fs.readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(line => line.split('='))
);
const BASE_URL_API = envVars.BASE_URL_API;

test('login API works and writes jwt to dev_api.env', async ({ request }) => {
  const payloadRaw = fs.readFileSync(path.resolve('testdata/payloadData.json'), 'utf-8');
  const payloadData = JSON.parse(payloadRaw);
  const loginPayload = payloadData.login;

  const response = await request.post(`${BASE_URL_API}/v3/login`, {
    data: loginPayload,
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json'
    }
  });

  expect(response.status()).toBe(200);
  const body = await response.json();

  // For debugging purposes
  console.log(body);

  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);

  const loginData = body[0];
  expect(loginData.jwt).toBeTruthy();
  expect(loginData.refreshToken).toBeTruthy();
  expect(loginData.userid).toBe('USR466866');
  expect(loginData.tenantId).toBe('TEN0');

  // Write jwt token to dev_api.env
  let newEnvContent = '';
  let jwtWritten = false;
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    if (line.startsWith('JWT_TOKEN=')) {
      newEnvContent += `JWT_TOKEN=${loginData.jwt}\n`;
      jwtWritten = true;
    } else if (line.trim() !== '') {
      newEnvContent += line + '\n';
    }
  }
  if (!jwtWritten) {
    newEnvContent += `JWT_TOKEN=${loginData.jwt}\n`;
  }
  fs.writeFileSync(envPath, newEnvContent, 'utf-8');
});