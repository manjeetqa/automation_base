import { expect } from '@playwright/test';
import { UIHelper } from '../utils/uiHelper';

class ProjectPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.createDropdown = page.getByText('Create');
    this.projectOption = page.getByRole('link', { name: 'Project' });
    this.worksheetLink = page.getByRole('link', { name: 'Worksheet' });
    this.projectNameInput = page.locator('albert-alproject iframe').contentFrame().locator('#createdescription');
    this.createProjectBtn = page.locator('albert-alproject iframe').contentFrame().getByRole('button', { name: 'Create' });
    this.worksheetLinkIframe = page.locator('albert-alproject iframe').contentFrame().getByRole('link', { name: 'Worksheet' });
    
    this.ui = new UIHelper(page);

    this.createBtn = page.getByRole('button', { name: 'Create' });
    this.projectLink = page.getByRole('link', { name: 'Project' });

    this.projectFrame = page.frameLocator('albert-alproject iframe');
    this.projectNameInput = this.projectFrame.locator('#createdescription');
    this.createProjectBtn = this.projectFrame.locator('p-button');
  
  }

  // Action Methods
  async clickCreateDropdown() {
    await this.createDropdown.click();
  }

  async clickProjectOption() {
    await this.projectOption.click();
  }

  async clickProjectNameInput() {
    await this.projectNameInput.click();
  }

  async enterProjectName(projectName) {
    await this.projectNameInput.fill(projectName);
  }

  async clickCreateProject() {
    await this.createProjectBtn.click();
  }

  async clickWorksheet() {
    await this.worksheetLinkIframe.click();
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


  // **************FROM ANOTHER DIRECTORY************
  async createProject(name) {
    await this.ui.click(this.createBtn);
    await this.ui.click(this.projectLink);
    
    // Wait for iframe to load and be ready
    await this.page.waitForSelector('albert-alproject iframe', { state: 'attached' });
    await this.page.waitForTimeout(2000); // Allow iframe content to load
    
    await this.ui.fill(this.projectNameInput, name);
    await this.ui.click(this.createProjectBtn);
  }
}

module.exports = { ProjectPage };