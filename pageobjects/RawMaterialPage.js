// pageobjects/RawMaterialPage.js

class RawMaterialPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Locators
    this.createDropdownBtn = page.getByRole('button', { name: 'Create' });
    this.rawMaterialLink = page.getByRole('link', { name: 'Raw Material' });
    this.materialNameInput = page.getByPlaceholder('Enter material name');
    this.materialCodeInput = page.getByPlaceholder('Enter material code');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.successMessage = page.getByText('Raw material has been created');
    // Add more locators as needed
  }

  async openCreateDropdown() {
    await this.createDropdownBtn.click();
  }

  async selectRawMaterial() {
    await this.rawMaterialLink.click();
  }

  async enterMaterialName(name) {
    await this.materialNameInput.fill(name);
  }

  async enterMaterialCode(code) {
    await this.materialCodeInput.fill(code);
  }

  async save() {
    await this.saveButton.click();
  }

  async expectSuccessMessage() {
    await this.successMessage.waitFor({ state: 'visible' });
  }
}

module.exports = { RawMaterialPage };