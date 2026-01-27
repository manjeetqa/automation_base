import { expect } from '@playwright/test';

class WorksheetPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.sheetSuccessMessage = page.getByText('Sheet created successfully.');
    
    // Iframe Locators
    this.worksheetLink = page.locator('albert-alproject iframe').contentFrame().getByRole('link', { name: 'Worksheet' });
    this.createEmptySheetOption = page.locator('albert-alproject iframe').contentFrame().getByText('Create an empty sheet');
    this.sheetNameInput = page.locator('albert-alproject iframe').contentFrame().getByRole('textbox');
    this.createSheetBtn = page.locator('albert-alproject iframe').contentFrame().getByRole('button', { name: 'Create' });
    this.addProcessDesignBtn = page.locator('albert-alproject iframe').contentFrame().locator('#add_process_design');
    this.addProcessDesignSvg = page.locator('albert-alproject iframe').contentFrame().locator('#add_process_design > svg');
    this.addParameterGroupRowOption = page.locator('albert-alproject iframe').contentFrame().getByText('Add Parameter Group Row');
    this.searchParameterGroupsInput = page.locator('albert-alproject iframe').contentFrame().getByRole('textbox', { name: 'Search Parameter Groups' });
  

    this.ui = new UIHelper(page);

    // this.worksheetFrame = page.frameLocator('albert-alproject iframe');
    // this.worksheetLink = this.worksheetFrame.getByRole('link', { name: 'Worksheet' });
    // this.createEmptySheetBtn = this.worksheetFrame.getByText('Create an empty sheet');
    // this.sheetNameInput = this.worksheetFrame.getByRole('textbox');
    // this.createSheetBtn = this.worksheetFrame.getByRole('button', { name: 'Create' });
    // this.processDesignRow = this.worksheetFrame.getByText('Process Design');
    // // this.addParameterGroupBtn = this.worksheetFrame.getByText('Click + to add a Parameter');
    // this.addPlusBtn = this.worksheetFrame.locator('#add_process_design');
    // this.AddParameterGroupRow = this.worksheetFrame.getByText('Add Parameter Group Row');
  }

  // Action Methods
  async clickWorksheet() {
    await this.worksheetLink.click();
  }

  async clickCreateEmptySheet() {
    await this.createEmptySheetOption.click();
  }

  async clickSheetNameInput() {
    await this.sheetNameInput.click();
  }

  async enterSheetName(sheetName) {
    await this.sheetNameInput.fill(sheetName);
  }

  async clickCreateSheet() {
    await this.createSheetBtn.click();
  }

  async clickAddProcessDesign() {
    await this.addProcessDesignBtn.click();
  }

  async clickAddProcessDesignSvg() {
    await this.addProcessDesignSvg.click();
  }

  async clickAddParameterGroupRow() {
    await this.addParameterGroupRowOption.click();
  }

  async clickSearchParameterGroupsInput() {
    await this.searchParameterGroupsInput.click();
  }

  async fillSearchParameterGroups(searchText) {
    await this.searchParameterGroupsInput.fill(searchText);
  }

  // Verification Methods
  async verifySheetCreation() {
    await expect(this.sheetSuccessMessage).toBeVisible();
  }

  // Business Logic Methods
  async createEmptyWorksheet(sheetName) {
    await this.clickWorksheet();
    await this.clickCreateEmptySheet();
    await this.clickSheetNameInput();
    await this.enterSheetName(sheetName);
    await this.clickCreateSheet();
    await this.verifySheetCreation();
  }

  async addParameterGroupRow() {
    await this.clickAddProcessDesign();
    await this.clickAddProcessDesignSvg();
    await this.clickAddProcessDesignSvg();
    await this.clickAddParameterGroupRow();
  }

  async searchParameterGroup(searchText) {
    await this.clickSearchParameterGroupsInput();
    await this.fillSearchParameterGroups(searchText);
  }


  // **************FROM ANOTHER DIRECTORY************* 
  async createWorksheet(sheetName) {
    // Wait for iframe to be ready
    await this.page.waitForSelector('albert-alproject iframe', { state: 'attached' });
    await this.page.waitForTimeout(1000);
    
    await this.ui.click(this.worksheetLink);
    await this.page.waitForTimeout(1000);
    
    await this.ui.click(this.createEmptySheetBtn);
    await this.ui.fill(this.sheetNameInput, sheetName);
    await this.ui.click(this.createSheetBtn);
  }

  async addParameterGroup() {
    // await this.ui.wait(8);
    await this.ui.click(this.processDesignRow);
    await this.ui.click(this.addPlusBtn);
    await this.ui.click(this.AddParameterGroupRow);
    // await this.ui.wait(8);
  }
}

module.exports = { WorksheetPage };
