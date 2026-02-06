import { expect } from '@playwright/test';
import { UIHelper } from '../../utils/uiHelper';
import { ProjectPageLocators } from '../locators/ProjectPageLocators';

class ProjectPage {
  constructor(page) {
    this.page = page;
    this.ui = new UIHelper(page);
    this.locators = new ProjectPageLocators(page);
  }

  // Action Methods
  async clickCreateDropdown() {
    await this.locators.createDropdown.click();
  }

  async clickProjectOption() {
    await this.locators.projectOption.click();
  }

  async clickProjectNameInput() {
    await this.locators.projectNameInput.click();
  }

  async enterProjectName(projectName) {
    await this.locators.projectNameInput.fill(projectName);
  }

  async clickCreateProject() {
    await this.locators.createProjectBtn.click();
  }

  async clickWorksheet() {
    await this.locators.worksheetLinkIframe.click();
  }

  // Verification Methods
  async verifyProjectCreation() {
    // Add verification if needed
  }

  // Business Logic Methods
  async createProjectFromDropdown(projectName) {
    await this.clickCreateDropdown();
    await this.clickProjectOption();
    await this.clickProjectNameInput();
    await this.enterProjectName(projectName);
    await this.clickCreateProject();
  }

  async navigateToWorksheet() {
    await this.clickWorksheet();
  }

  // Alternative project creation method
  async createProject(name) {
    await this.ui.click(this.locators.createBtn);
    await this.ui.click(this.locators.projectLink);
    
    // Wait for iframe to load and be ready
    await this.page.waitForSelector('albert-alproject iframe', { state: 'attached' });
    await this.page.waitForTimeout(2000); // Allow iframe content to load
    
    await this.ui.fill(this.locators.projectNameInputFrame, name);
    await this.ui.click(this.locators.createProjectBtnFrame);
  }
}

module.exports = { ProjectPage };
