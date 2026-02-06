class ParameterGroupsPageLocators {
  constructor(page) {
    this.page = page;

    this.parameterGroupsFrame = page.frameLocator('albert-alpg iframe');
    this.parameterGroupsLink = page.getByRole('button', { name: 'Parameter Groups' }); // It's a button, not link
    this.searchInput = this.parameterGroupsFrame.locator('xpath=//input[@formcontrolname="searchBar"]');
    this.pg1Option = this.parameterGroupsFrame.locator('xpath=//u[text()="PG1"]');

    this.addParameterBtn = this.parameterGroupsFrame.getByText('Add Parameter');
    this.templateOption = this.parameterGroupsFrame.getByText('Template');
    this.doneBtn = this.parameterGroupsFrame.getByRole('button', { name: 'Done' });
    this.templateHover = this.parameterGroupsFrame.locator("xpath=//div[@class='pgtable_rows cursor']//span[contains(text(),'Template')]");
    this.pencilIcon = this.parameterGroupsFrame.locator("xpath=//span[contains(text(),'Template')]//..//*[@mattooltip='Edit Parameter']");
    this.deleteParameterBtn = this.parameterGroupsFrame.getByRole('button', { name: 'Delete Parameter' });
    this.deleteBtn = this.parameterGroupsFrame.locator("xpath=//span[text()='Delete']");
    this.successMessage = page.getByText('Parameter Group Updated successfully'); // Outside frame?
  }
}

module.exports = { ParameterGroupsPageLocators };
