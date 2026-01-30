// tests/web/inventory-search.spec.js

const { test, expect } = require('@playwright/test');
import { LoginPage } from '../../pageobjects/LoginPage';
import { InventoryPage } from '../../pageobjects/InventoryPage';
import { faker } from '@faker-js/faker';

const BASE_URL = process.env.BASE_URL || 'https://dev.albertinventdev.com/albert.html#login/selectUser?target=center&redirect=/albert.html';
const email = process.env.email || 'appstore_ten0@albertinvent.com';
const CODE = process.env.CODE || '123456';

test('Test raw material filter in inventory', async ({ page }) => {
  // Login
  const loginPage = new LoginPage(page);
  await page.goto(BASE_URL);
  await loginPage.login(email, CODE);

  // Inventory navigation and search
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.navigateToInventory();
  await inventoryPage.clickRawMaterials();
  await inventoryPage.searchForMaterial('Sample_RawMaterial');
  await inventoryPage.verifyMaterialInGrid('Sample_RawMaterial');
});

test('Create raw material inventory', async ({ page }) => {
  // Login
  const loginPage = new LoginPage(page);
  await page.goto(BASE_URL);
  await loginPage.login(email, CODE);

  // Generate random raw material name using faker
  const rawMaterialName = `RawMaterial_${faker.string.alphanumeric(8)}`;

  // Inventory creation
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.navigateToInventory();
  await inventoryPage.createInventory(rawMaterialName);
  
  // Verify created inventory
  await inventoryPage.searchForMaterial(rawMaterialName);
  await inventoryPage.verifyMaterialInGrid(rawMaterialName);
});

test.only('Create consumable inventory', async ({ page }) => {
  // Login
  const loginPage = new LoginPage(page);
  await page.goto(BASE_URL);
  await loginPage.login(email, CODE);

  // Generate random consumable name using faker
  const consumableName = `Consumable_${faker.string.alphanumeric(8)}`;

  // Consumable inventory creation
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.navigateToInventory();
  await inventoryPage.createConsumableInventory(consumableName);
  
  // Verify created consumable
  await inventoryPage.clickConsumables();
  await inventoryPage.searchForMaterial(consumableName);
  await inventoryPage.verifyConsumableInList(consumableName);
});
