import { expect } from '@playwright/test';

export class TaskPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.createDropdown = page.getByRole('button', { name: 'Create' });
    this.createDropdownImg = page.locator('maya-button').filter({ hasText: 'Create' }).getByRole('img');

    this.taskOptionNew= page.locator('maya-list:nth-child(2) > .list')
    this.taskOption = page.getByRole('link', { name: 'Task' });
    this.genLink = page.getByRole('link', { name: /^GEN/ });
    
    // Iframe Locators
    this.generalRadio = page.locator('albert-altask iframe').contentFrame().getByRole('radio', { name: 'General' });
    this.ngForm = page.locator('albert-altask iframe').contentFrame().locator('#ngForm');
    this.taskTextarea = page.locator('albert-altask iframe').contentFrame().locator('#ngForm textarea[type="text"]');
    this.assignToMeOption = page.locator('albert-altask iframe').contentFrame().getByText('Assign To Me');
    this.createTaskBtn = page.locator('albert-altask iframe').contentFrame().getByRole('button', { name: 'Create' });
    this.dialog = page.locator('albert-altask iframe').contentFrame().getByRole('dialog');
    this.taskDetailsSpan = page.locator('albert-altask iframe').contentFrame().locator("//a//span[text()='Task Details ']");
  
    this.createBtn = page.getByRole('button', { name: 'Create' });
    this.taskLink = page.getByRole('link', { name: 'Task' });
    this.frame = page.frameLocator('albert-altask iframe');
    
    // Batch Task Locators
    this.batchRadio = page.locator('albert-altask iframe').contentFrame().getByRole('radio', { name: 'Batch' });
    this.SelectInventoryDropDown  = page.locator('albert-altask iframe').contentFrame().locator('xpath=//div[contains(@class,"select-box")]');
    this.createdByMeOption = page.locator('albert-altask iframe').contentFrame().getByText('Created by me', { exact: true });
    this.p818065Option = page.locator('albert-altask iframe').contentFrame().getByText('P818065-').first();
    this.closeBtn = page.locator('albert-altask iframe').contentFrame().getByRole('button', { name: 'Close' });
    this.gOptionBtn = page.locator('albert-altask iframe').contentFrame().getByRole('button', { name: 'g', exact: true });
    this.quantityInput = page.locator('albert-altask iframe').contentFrame().getByRole('textbox', { name: 'Enter Quantity *' });
    this.createAndOpenBtn = page.locator('albert-altask iframe').contentFrame().getByRole('link', { name: 'Create and Open' });
    this.emptyBtn = page.locator('albert-altask iframe').contentFrame().getByRole('button').filter({ hasText: /^$/ });
    
    // Task Page Locators
    this.tasksLink = page.getByRole('link', { name: 'Tasks' });
    this.createTaskBtn1 = page.getByRole('button', { name: 'Create Task' });
    
    // Filter/Search Locators
    this.unclaimedTasksBtn = page.getByRole('button', { name: 'Unclaimed Tasks' });
    this.searchBox = page.getByRole('searchbox', { name: 'Search' });
    this.grid = page.getByRole('grid');
    
    // Filter Dialog Locators
    this.filterBtn = page.getByRole('button', { name: 'Filter' });
    this.createdByOption = page.getByRole('option', { name: 'Created By' }).getByRole('paragraph');
    this.currentUserOption = page.getByText('Current User');
    this.filterContainer = page.locator('div').filter({ hasText: 'Type Assigned To Created By (' }).first();
    this.uiListSearch = page.locator('ui-list').getByRole('textbox', { name: 'Search' });
    this.resetBtn = page.getByRole('button', { name: 'Reset' });
    this.notifications = page.locator('ui-notifications');
    
    // Confirmation Message
    this.confirmationParagraph = page.getByRole('paragraph');
  }

  // Action Methods
  async clickCreateDropdown() {
    await this.createDropdown.click();
  }

  async clickCreateDropdownImg() {
    await this.createDropdownImg.click();
  }

  async clickTaskOption() {
    await this.taskOption.click();
  }

  async clickGenLink() {
    await this.genLink.click();
  }

  async clickGeneralRadio() {
    await this.generalRadio.check();
  }

  async fillTaskTextarea(taskName) {
    await this.taskTextarea.fill(taskName);
  }

  async clickAssignToMe() {
    await this.assignToMeOption.click();
  }

  async clickCreateTask() {
    await this.createTaskBtn.click();
  }

  // Verification Methods
  async verifyNgFormText() {
    await expect(this.ngForm).toContainText('Get started with a template to auto-populate your task.');
  }

  async verifyTaskInDialog(taskName) {
    await expect(this.dialog).toContainText(taskName);
  }

  async verifyTaskDetailsVisible() {
    await expect(this.taskDetailsSpan).toBeVisible();
  }

  // Business Logic Methods
  async createTaskFromDropdown(taskName) {
    // await this.clickCreateDropdown();
    // await this.clickTaskOption();
    await this.createDropdownImg.click();
    await this.taskOptionNew.click();
  }

  async fillTaskDetails(taskName) {
    await this.clickGeneralRadio();
    await this.verifyNgFormText();
    await this.fillTaskTextarea(taskName);

    // Step 3: Click the create button
    await this.clickAssignToMe();

    // Step 4: Click the task list item
    await this.clickCreateTask();
  }

  async validateTaskCreation(taskName) {
    await this.verifyTaskInDialog(taskName);
    await this.verifyTaskDetailsVisible();
  }

  async waitForPopupAndValidate(taskName) {
    const page1Promise = this.page.waitForEvent('popup');
    await this.clickGenLink();
    const page1 = await page1Promise;
    
    // Create a new TaskPage instance for the popup page
    const popupTaskPage = new TaskPage(page1);
    await popupTaskPage.validateTaskCreation(taskName);
    
    return page1;
  }



  // **************FROM ANOTHER DIRECTORY*************
  async openTaskCreation() {
    await this.createBtn.click();
    await this.taskLink.click();
    await this.page.waitForTimeout(2000);
  }

  async fillTaskForm() {
    // Select inventory
    await this.frame.getByText('Select inventory *', { exact: true }).click();
    await this.frame.getByText('Created by me', { exact: true }).click();
    await this.frame.getByRole('checkbox').first().check();
    await this.frame.getByRole('button', { name: 'Close' }).click();
    // Select 'g' option
    await this.frame.getByRole('button', { name: 'g', exact: true }).click();
    // Enter quantity
    await this.frame.getByRole('textbox', { name: 'Enter Quantity *' }).fill('10');
    // Enter task name
    await this.frame.locator('textarea[type="text"]').fill('test321');
    // Create
    await this.frame.getByRole('button', { name: 'Create' }).click();
  }

  async expectTaskCreated() {
    await this.page.waitForTimeout(2000);
    const confirmation = await this.page.getByText('has been created and sent to the Task Module');
    await expect(confirmation).toBeVisible();
  }

  // Batch Task Creation Methods
  async clickBatchRadio() {
    await this.batchRadio.check();
  }

  async clickSelectInventoryDropDown() {
    await this.SelectInventoryDropDown.click();
  }

  async selectCreatedByMe() {
    await this.createdByMeOption.click();
  }

  async selectP818065() {
    await this.p818065Option.click();
  }

  async clickClose() {
    await this.closeBtn.click();
  }

  async clickGOption() {
    await this.gOptionBtn.click();
  }

  async fillQuantity(quantity) {
    await this.quantityInput.click();
    await this.quantityInput.fill(quantity);
  }

  async clickEmptyButton() {
    await this.emptyBtn.click();
  }

  async clickCreateAndOpen() {
    await this.createAndOpenBtn.click();
  }

  // Task Page Methods
  async clickTasksLink() {
    await this.tasksLink.click();
  }

  async clickCreateTaskBtn() {
    await this.createTaskBtn.click();
  }

  // Filter/Search Methods
  async clickUnclaimedTasks() {
    await this.unclaimedTasksBtn.click();
  }

  async clickSearchBox() {
    await this.searchBox.click();
  }

  async fillSearchBox(searchText) {
    await this.searchBox.fill(searchText);
  }

  async pressEnterInSearch() {
    await this.searchBox.press('Enter');
  }

  async searchTask(searchText) {
    await this.clickTasksLink();
    await this.clickTasksLink();
    await this.clickSearchBox();
    await this.fillSearchBox(searchText);
    await this.pressEnterInSearch();
  }

  // Filter Dialog Methods
  async clickFilter() {
    await this.filterBtn.click();
  }

  async clickCreatedByOption() {
    await this.createdByOption.click();
  }

  async clickCurrentUserOption() {
    await this.currentUserOption.click();
  }

  async clickFilterContainer() {
    await this.filterContainer.click();
  }

  async pressEscapeInUiListSearch() {
    await this.uiListSearch.press('Escape');
  }

  async clickReset() {
    await this.resetBtn.click();
  }

  // Verification Methods
  async verifyUnclaimedInGrid() {
    await expect(this.grid).toContainText('Unclaimed');
  }

  async verifySearchInGrid(searchText) {
    await expect(this.grid).toContainText(searchText);
  }

  async verifyTaskCreationMessage() {
    await expect(this.confirmationParagraph).toContainText('has been created and sent to the Task Module');
  }

  async verifyAppstoreInGrid() {
    await expect(this.page.getByText('A Appstore').first()).toBeVisible();
    await expect(this.grid).toContainText('A Appstore');
  }

  async verifyViewResetMessage() {
    await expect(this.notifications).toContainText('View reset successfully');
  }

  // Business Logic Methods
  async createBatchTask(taskName, quantity = '12') {
    await this.clickCreateDropdownImg();
    await this.taskOptionNew.click();
    await this.clickBatchRadio();
    await this.clickSelectInventoryDropDown();
    await this.selectCreatedByMe();
    await this.selectP818065();
    await this.clickClose();
    await this.clickGOption();
    await this.fillQuantity(quantity);
    await this.fillTaskTextarea(taskName);
    await this.clickAssignToMe();
  }

  async createAndOpenTask(taskName) {
    const page1Promise = this.page.waitForEvent('popup');
    await this.clickCreateAndOpen();
    const page1 = await page1Promise;
    return page1;
  }

  async createTaskFromTaskPage(taskName, quantity = '12') {
    
    await this.clickCreateDropdownImg();
    await this.taskOptionNew.click();
    // await this.clickCreateTaskBtn();
    // await this.taskLink.click();
    await this.clickSelectInventoryDropDown();
    await this.selectCreatedByMe();
    await this.selectP818065();
    await this.clickClose();
    await this.clickGOption();
    await this.fillQuantity(quantity);
    await this.fillTaskTextarea(taskName);
    await this.clickAssignToMe();
    await this.clickCreateTask();
  }

  async viewFilterUnclaimedTasks() {
    await this.clickTasksLink();
    await this.clickUnclaimedTasks();
  }

  async searchTask(searchText) {
    await this.clickTasksLink();
    await this.clickTasksLink();
    await this.clickSearchBox();
    await this.fillSearchBox(searchText);
    await this.pressEnterInSearch();
  }

  // Business Logic Methods
  async filterByCurrentUser() {
    await this.clickTasksLink();
    await this.clickFilter();
    await this.clickCreatedByOption();
    await this.clickCurrentUserOption();
    await this.clickFilterContainer();
    await this.pressEscapeInUiListSearch();
    await this.verifyAppstoreInGrid();
  }

  async resetFilterView() {
    await this.clickReset();
    await this.verifyViewResetMessage();
  }
}

module.exports = { TaskPage };
