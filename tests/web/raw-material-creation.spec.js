// tests/raw-material-creation.spec.js

const { test, expect } = require('@playwright/test');
import { LoginPage } from '../../pageobjects/LoginPage';
import { RawMaterialPage } from '../../pageobjects/RawMaterialPage';

test.describe('Raw Material Creation (POM)', () => {
  test('Create new raw material and validate success', async ({ page }) => {
    // Login steps
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login(email, CODE);

    // Raw material creation steps
    const rawMaterial = new RawMaterialPage(page);
    await rawMaterial.openCreateDropdown();
    await rawMaterial.selectRawMaterial();
    await rawMaterial.enterMaterialName('Test Material');
    await rawMaterial.enterMaterialCode('TM-001');
    await rawMaterial.save();
    await rawMaterial.expectSuccessMessage();
  });
});