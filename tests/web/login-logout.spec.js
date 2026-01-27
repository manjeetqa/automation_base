// this below test is for login and logout
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageobjects/LoginPage';

const BASE_URL = process.env.BASE_URL;
const email = process.env.email;
const CODE = process.env.CODE;

test.describe('Login and Logout', () => {
  test('Login and Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login(email, CODE);

    // Logout
    await loginPage.logout();

    // await expect(page.getByRole('textbox', { name: 'john.doe@company.com' })).toBeVisible();
  });
});