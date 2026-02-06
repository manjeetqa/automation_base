class ProjectPageLocators {
  constructor(page) {
    this.page = page;

    // Locators
    this.createDropdown = page.getByText('Create');
    this.projectOption = page.getByRole('link', { name: 'Project' });
    this.worksheetLink = page.getByRole('link', { name: 'Worksheet' });
    this.projectNameInput = page.locator('albert-alproject iframe').contentFrame().locator('#createdescription');
    this.createProjectBtn = page.locator('albert-alproject iframe').contentFrame().getByRole('button', { name: 'Create' });
    this.worksheetLinkIframe = page.locator('albert-alproject iframe').contentFrame().getByRole('link', { name: 'Worksheet' });

    this.createBtn = page.getByRole('button', { name: 'Create' });
    this.projectLink = page.getByRole('link', { name: 'Project' });

    this.projectFrame = page.frameLocator('albert-alproject iframe');
    this.projectNameInputFrame = this.projectFrame.locator('#createdescription');
    this.createProjectBtnFrame = this.projectFrame.locator('p-button');
  }
}

module.exports = { ProjectPageLocators };
