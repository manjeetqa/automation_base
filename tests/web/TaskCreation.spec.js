// Task001 : This test performs the task creation flow via GeneralRadio button

import fs from 'fs';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageobjects/LoginPage';
import { TaskPage } from '../../pageobjects/TaskPage';
import { updateSpecificDataType } from '../../testdata/dataSetGenerator';

// Load configuration data
const config = fs.readFileSync('config/dev_env.env', 'utf8');
const lines = config.split('\n');
const BASE_URL = lines.find(line => line.startsWith('BASE_URL='))?.split('=')[1]?.trim();
const EMAIL = lines.find(line => line.startsWith('email='))?.split('=')[1]?.trim();
const CODE = lines.find(line => line.startsWith('CODE='))?.split('=')[1]?.trim();

// Generate task-specific data before running tests
updateSpecificDataType('task');

// Load test data
const testData = JSON.parse(fs.readFileSync('testdata/testdata.json', 'utf8'));

console.log('Config loaded:', { BASE_URL, EMAIL, CODE });
console.log('Task data loaded:', testData.tasks);

test.describe('Task Creation Flow', () => {
  test('should create and validate task creation', { tag: ['@TC001'] }, async ({ page }) => {
    // Setup viewport using test data
    await page.setViewportSize({ 
      width: testData.viewport.width, 
      height: testData.viewport.height 
    });

    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const taskPage = new TaskPage(page);

    // Step 1: Navigate to login page
    await page.goto(BASE_URL);

    // Step 2: Login process
    await loginPage.clickAddNewAccount();
    await loginPage.enterEmail(EMAIL);
    await loginPage.clickContinue();
    await loginPage.clickSigninWithAuthenticator();
    await loginPage.enterAuthenticatorCode(CODE);
    await loginPage.clickContinueForAuth();
    await loginPage.clickReleaseNotesOk();
    
    // Step 3: Verify Create button is visible
    await expect(page.getByText('Create')).toBeVisible();

    // Step 4: Create task from dropdown using test data
    await taskPage.createTaskFromDropdown(testData.tasks.task2.name);

    // Step 5: Fill task details using test data
    await taskPage.fillTaskDetails(testData.tasks.task2.name);

    // Step 6: Wait for popup and validate task creation using test data
    await taskPage.waitForPopupAndValidate(testData.tasks.task2.name);
  });

  test('Create and Open Task and validate', { tag: ['@TC002'] }, async ({ page }) => {
    // Generate task-specific data before running tests
    updateSpecificDataType('task');

    await page.setViewportSize({ 
        width: testData.viewport.width, 
        height: testData.viewport.height 
    });
  
    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const taskPage = new TaskPage(page);
  
    // Step 1: Navigate to login page
    await page.goto(BASE_URL);
  
    // Step 2: Login process
    await loginPage.clickAddNewAccount();
    await loginPage.enterEmail(EMAIL);
    await loginPage.clickContinue();
    await loginPage.clickSigninWithAuthenticator();
    await loginPage.enterAuthenticatorCode(CODE);
    await loginPage.clickContinueForAuth();
    await loginPage.clickReleaseNotesOk();
    
    // Step 3: Create batch task
    await taskPage.createBatchTask('task002');
    
    // Step 4: Click empty button and create & open
    await taskPage.clickEmptyButton();
    const popupPage = await taskPage.createAndOpenTask('task002');
    
    // Step 5: Navigate to popup URL and validate
    await popupPage.goto('https://dev.albertinventdev.com/#altask/detail?query=LAB2869818');
    const popupTaskPage = new TaskPage(popupPage);
    await popupTaskPage.verifyTaskInDialog('task001');
  });

  test('Create Task and validate via Tasks page', { tag: ['@TC003'] }, async ({ page }) => {
  
    await page.setViewportSize({ 
        width: testData.viewport.width, 
        height: testData.viewport.height 
      });
  
    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const taskPage = new TaskPage(page);
  
    // Step 1: Navigate to login page
    await page.goto(BASE_URL);
  
    // Step 2: Login process
    await loginPage.clickAddNewAccount();
    await loginPage.enterEmail(EMAIL);
    await loginPage.clickContinue();
    await loginPage.clickSigninWithAuthenticator();
    await loginPage.enterAuthenticatorCode(CODE);
    await loginPage.clickContinueForAuth();
    await loginPage.clickReleaseNotesOk();
    
    // Step 3: Verify Tasks link is visible
    await expect(taskPage.taskLink).toBeVisible();
    
    // Step 4: Create task from Tasks page
    await taskPage.createTaskFromTaskPage('task001');
    
    // Step 5: Verify task creation message
    await taskPage.verifyTaskCreationMessage();
  });

  test('Test for Task Search functionality', { tag: ['@TC004'] }, async ({ page }) => {
  
    await page.setViewportSize({ 
        width: testData.viewport.width, 
        height: testData.viewport.height 
      });
      
    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const taskPage = new TaskPage(page);
  
    // Step 1: Navigate to login page
    await page.goto(BASE_URL);
  
    // Step 2: Login process
    await loginPage.clickAddNewAccount();
    await loginPage.enterEmail(EMAIL);
    await loginPage.clickContinue();
    await loginPage.clickSigninWithAuthenticator();
    await loginPage.enterAuthenticatorCode(CODE);
    await loginPage.clickContinueForAuth();
    await loginPage.clickReleaseNotesOk();

    // Step 3: Verify Tasks link is visible
    await expect(taskPage.tasksLink).toBeVisible();

    // Step 4: Search for task
    await taskPage.searchTask('task001');

    // Step 5: Verify search results in grid
    await taskPage.verifySearchInGrid('task001');
  });

  test('Test for View Filter functionality with Unclaimed Tasks Status', { tag: ['@TC005'] }, async ({ page }) => {
  
    await page.setViewportSize({ 
        width: testData.viewport.width,
        height: testData.viewport.height 
      });
      
    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const taskPage = new TaskPage(page);
  
    // Step 1: Navigate to login page
    await page.goto(BASE_URL);
  
    // Step 2: Login process
    await loginPage.clickAddNewAccount();
    await loginPage.enterEmail(EMAIL);
    await loginPage.clickContinue();
    await loginPage.clickSigninWithAuthenticator();
    await loginPage.enterAuthenticatorCode(CODE);
    await loginPage.clickContinueForAuth();
    await loginPage.clickReleaseNotesOk();
    
    // Step 3: View Filter unclaimed tasks
    await taskPage.viewFilterUnclaimedTasks();
    
    // Step 4: Verify unclaimed status in grid
    await taskPage.verifyUnclaimedInGrid();
  });


  test('Assigned to current user and Reset Fucntinality : Filter >> Created by >> Current user', { tag: ['@TC007'] }, async ({ page }) => {
    await page.setViewportSize({ 
        width: testData.viewport.width,
        height: testData.viewport.height 
      });
      
    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const taskPage = new TaskPage(page);
  
    // Step 1: Navigate to login page
    await page.goto(BASE_URL);
  
    // Step 2: Login process
    await loginPage.clickAddNewAccount();
    await loginPage.enterEmail(EMAIL);
    await loginPage.clickContinue();
    await loginPage.clickSigninWithAuthenticator();
    await loginPage.enterAuthenticatorCode(CODE);
    await loginPage.clickContinueForAuth();
    await loginPage.clickReleaseNotesOk();

    // Step 3: Filter by current user and verify
    await taskPage.filterByCurrentUser();
    
    // Step 4: Reset filter and verify
    await taskPage.resetFilterView();
  });



  test('Hide Status column via Display and verify Status grid in column', { tag: ['@TC008'] }, async ({ page }) => {
    await page.setViewportSize({ 
        width: testData.viewport.width,
        height: testData.viewport.height 
      });
      
    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const taskPage = new TaskPage(page);
  
    // Step 1: Navigate to login page
    await page.goto(BASE_URL);
  
    // Step 2: Login process
    await loginPage.clickAddNewAccount();
    await loginPage.enterEmail(EMAIL);
    await loginPage.clickContinue();
    await loginPage.clickSigninWithAuthenticator();
    await loginPage.enterAuthenticatorCode(CODE);
    await loginPage.clickContinueForAuth();
    await loginPage.clickReleaseNotesOk();

    await page.getByRole('link', { name: 'Tasks' }).click();

    // hard wait for 4 seconds
    await page.waitForTimeout(4000);
  
    await page.getByRole('button', { name: 'Display' }).click();
    await expect(page.getByText('ID | Name', { exact: true })).toBeVisible();
    console.log('Verified ID | Name column is visible');

    await expect(page.getByRole('listbox')).toContainText('ID | Name');
    await expect(page.getByRole('option', { name: 'Drag to reorder Status Select' })).toBeVisible();

    console.log('Verified Status Select option is visible in the listbox');

    await page.locator('.slider').first().click();
    
    await page.locator('.sort > .outline').click();
    await page.locator('.sort > .outline').press('Escape');
    await page.getByText('Assigned To', { exact: true }).click();


    await page.waitForTimeout(2000);
    // page should not contain 'Status' column
    await expect(page.getByRole('grid')).not.toContainText('Status');

  });

});