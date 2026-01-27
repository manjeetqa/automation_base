import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { getJwtToken, getBaseUrl } from '../../utils/apiHelper.js';

test('project creation API works using JWT_TOKEN from dev_api.env', async ({ request }) => {
  // Load JWT token and base URL
  const jwt = getJwtToken();
  const BASE_URL_API = getBaseUrl();

  // Load project creation payload
  const payloadRaw = fs.readFileSync(path.resolve('testdata/payloadData.json'), 'utf-8');
  const payloadData = JSON.parse(payloadRaw);
  const projectPayload = payloadData.projectCreation;

  console.log('JWT Token:', jwt ? 'Present' : 'Missing');
  console.log('Base URL:', BASE_URL_API);
  console.log('Project Payload:', JSON.stringify(projectPayload, null, 2));

  const response = await request.post(`${BASE_URL_API}/v3/projects`, {
    data: projectPayload,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authorization': `Bearer ${jwt}`,
      'origin': 'https://dev.albertinventdev.com',
      'referer': 'https://dev.albertinventdev.com/mfe/wcalbert/project-management-wc/index.html',
      'x-alb-language': 'en',
      'x-app-version': '""'
    }
  });

  console.log('Response Status:', response.status());
  const body = await response.json();
  console.log('Response Body (raw):', body);
  // console.log('Response Body (formatted):', JSON.stringify(body, null, 2));

  // expect(response.status()).toBe(200);
  
  // // Example assertions (adjust as per actual response)
  // expect(body).toHaveProperty('projectId');
  // expect(body.projectName).toBe(projectPayload.projectName);
});