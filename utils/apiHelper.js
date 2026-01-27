import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve('config/dev_api.env') });

export const BASE_URL_API = process.env.BASE_URL_API;

export async function apiPost(request, endpoint, data, headers = {}) {
  return await request.post(`${BASE_URL_API}${endpoint}`, { data, headers });
}

export async function apiGet(request, endpoint, headers = {}) {
  return await request.get(`${BASE_URL_API}${endpoint}`, { headers });
}

export async function apiPut(request, endpoint, data, headers = {}) {
  return await request.put(`${BASE_URL_API}${endpoint}`, { data, headers });
}

export async function apiDelete(request, endpoint, headers = {}) {
  return await request.delete(`${BASE_URL_API}${endpoint}`, { headers });
}

export function getPayload(fileName) {
  const filePath = path.resolve('testdata', fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function getJwtToken() {
  return process.env.JWT_TOKEN;
}

export function getBaseUrl() {
  return process.env.BASE_URL_API;
}