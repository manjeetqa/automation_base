// pageobjects/ParameterGroupsPage.js
const { UIHelper } = require('../utils/uiHelper');

class ParameterGroupsPage {
  constructor(page) {
    this.page = page;
    this.ui = new UIHelper(page);

    this.parameterGroupsFrame = page.frameLocator('albert-alpg iframe');
    this.parameterGroupsLink = page.getByRole('button', { name: 'Parameter Groups' }); // It's a button, not link
    // this.searchInput = this.parameterGroupsFrame.getByRole('textbox', { name: 'Search' });
    this.searchInput = this.parameterGroupsFrame.locator('xpath=//input[@formcontrolname="searchBar"]');
    // this.pg1Option = this.parameterGroupsFrame.getByText(/.* PG1$/).first();
    // this.pg1Option = this.parameterGroupsFrame.getByRole('link', { name: 'PG1' });
    this.pg1Option = this.parameterGroupsFrame.locator('xpath=//u[text()="PG1"]');

    this.addParameterBtn = this.parameterGroupsFrame.getByText('Add Parameter');
    this.templateOption = this.parameterGroupsFrame.getByText('Template');
    this.doneBtn = this.parameterGroupsFrame.getByRole('button', { name: 'Done' });
    this.templateHover = this.parameterGroupsFrame.locator("xpath=//div[@class='pgtable_rows cursor']//span[contains(text(),'Template')]");
    this.pencilIcon = this.parameterGroupsFrame.locator("xpath=//span[contains(text(),'Template')]//..//*[@mattooltip='Edit Parameter']"); // As in the test
    this.deleteParameterBtn = this.parameterGroupsFrame.getByRole('button', { name: 'Delete Parameter' });
    this.deleteBtn = this.parameterGroupsFrame.locator("xpath=//span[text()='Delete']");
    this.successMessage = page.getByText('Parameter Group Updated successfully'); // Outside frame?
  }

  async navigateToParameterGroups() {
    await this.ui.click(this.parameterGroupsLink);
  }

  // async searchAndSelectPG1() {
  //   await this.ui.click(this.searchInput);
  //   await this.ui.fill(this.searchInput, 'PG1');
  //   // click enter key to search
  //   await this.searchInput.press('Enter');
  //   await this.ui.click(this.pg1Option);
  // }
 
  async searchAndSelectPG1() {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill('PG1');
    await this.searchInput.press('Enter');

    // Wait for the exact result to appear after grid refresh
    // await this.pg1Option.waitFor({ state: 'visible' });
    await this.pg1Option.click();
  }

  async addTemplateParameter() {
    await this.ui.click(this.addParameterBtn);
    await this.ui.click(this.templateOption);
    await this.ui.click(this.doneBtn);
  }

  async deleteTemplateParameter() {
    await this.ui.hover(this.templateHover);
    await this.ui.click(this.pencilIcon);
    await this.ui.click(this.deleteParameterBtn);
    await this.ui.click(this.deleteBtn);
  }

  // async validateSuccessMessage() {
  //   await expect(this.successMessage).toBeVisible();
  // }

  async getSuccessMessage() {
    return this.successMessage;
  }
}

module.exports = { ParameterGroupsPage };