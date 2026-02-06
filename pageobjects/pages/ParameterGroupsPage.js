const { UIHelper } = require('../../utils/uiHelper');
import { ParameterGroupsPageLocators } from '../locators/ParameterGroupsPageLocators';

class ParameterGroupsPage {
  constructor(page) {
    this.page = page;
    this.ui = new UIHelper(page);
    this.locators = new ParameterGroupsPageLocators(page);
  }

  async navigateToParameterGroups() {
    await this.ui.click(this.locators.parameterGroupsLink);
  }

  async searchAndSelectPG1() {
    await this.locators.searchInput.waitFor({ state: 'visible' });
    await this.locators.searchInput.fill('PG1');
    await this.locators.searchInput.press('Enter');

    // Wait for the exact result to appear after grid refresh
    await this.locators.pg1Option.click();
  }

  async addTemplateParameter() {
    await this.ui.click(this.locators.addParameterBtn);
    await this.ui.click(this.locators.templateOption);
    await this.ui.click(this.locators.doneBtn);
  }

  async deleteTemplateParameter() {
    await this.ui.hover(this.locators.templateHover);
    await this.ui.click(this.locators.pencilIcon);
    await this.ui.click(this.locators.deleteParameterBtn);
    await this.ui.click(this.locators.deleteBtn);
  }

  async getSuccessMessage() {
    return this.locators.successMessage;
  }
}

module.exports = { ParameterGroupsPage };
