// pageobjects/InventoryPage.js

import { expect } from '@playwright/test';

class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Locators
    this.inventoryLink = page.getByRole('link', { name: 'Inventory' });
    this.createInventoryBtn = page.getByRole('button', { name: 'Create Inventory' });
    this.rawMaterialsBtn = page.getByRole('button', { name: 'Raw Materials' });
    this.consumablesBtn = page.getByRole('button', { name: 'Consumables' });
    this.inventoryIframe = page.locator('albert-alinventory iframe');
    this.nameInput = this.inventoryIframe.contentFrame().getByRole('textbox', { name: 'Name *' });
    this.manufacturerDropdown = this.inventoryIframe.contentFrame().locator('div').filter({ hasText: /^Manufacturer \*$/ }).first();
    this.manufacturerOption = this.inventoryIframe.contentFrame().getByText('%wtc');
    this.unitsTab = this.inventoryIframe.contentFrame().getByText('Units');
    this.createBtn = this.inventoryIframe.contentFrame().getByRole('button', { name: 'Create' });
    this.successMessage = page.locator('#snackbar');
    this.closeBtn = this.inventoryIframe.contentFrame().locator('a').filter({ hasText: 'Close' });
    this.searchInput = page.getByRole('searchbox', { name: 'Search' });
    this.grid = page.getByRole('grid');
    this.splitValue = page.locator('ui-splitvalue');
  }

  async navigateToInventory() {
    await this.inventoryLink.click();
  }

  async clickRawMaterials() {
    await this.rawMaterialsBtn.click();
  }

  async clickConsumables() {
    await this.consumablesBtn.click();
  }

  async clickCreateInventory() {
    await this.createInventoryBtn.click();
  }

  async selectConsumableType() {
    await this.inventoryIframe.contentFrame().getByText('Consumable').click();
  }

  async clickUnitsTab() {
    await this.unitsTab.click();
  }

  async enterInventoryName(name) {
    await this.nameInput.click();
    await this.nameInput.fill(name);
  }

  async selectManufacturer() {
    await this.manufacturerDropdown.click();
    await this.manufacturerOption.click();
  }

  async clickCreate() {
    await this.createBtn.click();
  }

  async verifySuccessMessage(message) {
    await expect(this.successMessage).toContainText(message);
  }

  async closeForm() {
    await this.closeBtn.click();
  }

  async searchForMaterial(materialName) {
    await this.searchInput.click();
    await this.page.waitForTimeout(5000);
    await this.searchInput.fill(materialName);
    await this.page.waitForTimeout(2000);
    await this.searchInput.press('Enter');
  }

  async verifyMaterialInGrid(materialName) {
    await expect(this.grid).toContainText(materialName);
  }

  async verifyConsumableInList(consumableName) {
    await expect(this.splitValue).toHaveText(consumableName);
  }

  // Business logic method for creating raw material inventory
  async createInventory(name, manufacturer = '%wtc') {
    await this.clickCreateInventory();
    await this.enterInventoryName(name);
    await this.selectManufacturer();
    await this.clickCreate();
    await this.verifySuccessMessage('Raw Material Created Successfully');
    await this.closeForm();
  }

  // Business logic method for creating consumable inventory
  async createConsumableInventory(name, manufacturer = '%wtc') {
    await this.clickCreateInventory();
    await this.selectConsumableType();
    await this.enterInventoryName(name);
    await this.selectManufacturer();
    await this.clickUnitsTab();
    await this.clickCreate();
    await this.verifySuccessMessage('Consumable Created Successfully');
    await this.closeForm();
  }
}

module.exports = { InventoryPage };
