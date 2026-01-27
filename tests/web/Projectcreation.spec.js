import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageobjects/LoginPage';
import { ProjectPage } from '../../pageobjects/ProjectPage';
import { WorksheetPage } from '../../pageobjects/WorksheetPage';
import fs from 'fs';

// const { updateSpecificDataType } = require('../../testdata/dataSetGenerator');
import { updateSpecificDataType } from '../../testdata/dataSetGenerator';


// Load configuration data
const config = fs.readFileSync('config/dev_env.env', 'utf8');
const lines = config.split('\n');
const BASE_URL = lines.find(line => line.startsWith('BASE_URL='))?.split('=')[1]?.trim();
const EMAIL = lines.find(line => line.startsWith('email='))?.split('=')[1]?.trim();
const CODE = lines.find(line => line.startsWith('CODE='))?.split('=')[1]?.trim();

// Generate project-specific data before running tests
updateSpecificDataType('project');

// Load test data
const testData = JSON.parse(fs.readFileSync('testdata/testdata.json', 'utf8'));

console.log('Config loaded:', { BASE_URL, EMAIL, CODE });
console.log('Project data loaded:', testData.projects);

test.describe('Project Creation Tests', () => {
  test('should create project and add parameter group', { tag: ['@smoke', '@TC001'] }, async ({ page }) => {
    // Setup viewport using test data
    await page.setViewportSize({
      width: testData.viewport.width,
      height: testData.viewport.height
    });

    // Step 1: Login
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.addNewAccount(EMAIL);
    await loginPage.signInWithAuthenticator(CODE);
    await loginPage.dismissReleaseNotes();

    // Step 2: Create Project using test data
    const projectPage = new ProjectPage(page);
    await projectPage.createProjectFromDropdown(testData.projects.project1.name);

    // Step 3: Create Worksheet using test data
    const worksheetPage = new WorksheetPage(page);
    await worksheetPage.createEmptyWorksheet(testData.worksheets.worksheet1.name);

    // Step 4: Add Parameter Group using test data
    await worksheetPage.addParameterGroupRow();
    await worksheetPage.searchParameterGroup(testData.parameterGroups.pg1.name);
  });
});
