import { expect } from '@playwright/test';
import { UIHelper } from '../../utils/uiHelper';
import { LoginPageLocators } from '../locators/LoginPageLocators';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.ui = new UIHelper(page);
    this.locators = new LoginPageLocators(page);
  }

  // Action Methods
  async clickAddNewAccount() {
    await this.page.locator(this.locators.addNewAccountBtn).click();
  }

  async enterEmail(email) {
    await this.locators.emailInput.click();
    await this.locators.emailInput.fill(email);
  }

  async clickContinue() {
    await this.locators.continueBtn.click();
  }

  async clickSigninWithAuthenticator() {
    await this.locators.signinAuthenticatorBtn.click();
  }

  async enterAuthenticatorCode(code) {
    await this.locators.authenticatorCodeInput.click();
    await this.locators.authenticatorCodeInput.fill(code);
  }

  async clickContinueForAuth() {
    await this.locators.continueBtn.click();
  }

  async clickReleaseNotesOk() {
    await this.locators.releaseNotesOkBtn.click();
  }

  // Business Logic Methods
  async addNewAccount(email) {
    await this.clickAddNewAccount();
    await this.enterEmail(email);
    await this.clickContinue();
  }

  async signInWithAuthenticator(code) {
    await this.clickSigninWithAuthenticator();
    await this.enterAuthenticatorCode(code);
    await this.clickContinueForAuth();
  }

  async dismissReleaseNotes() {
    await this.clickReleaseNotesOk();
  }

  // Verification Methods
  async verifyLoginSuccess() {
    await expect(this.page.getByRole('button', { name: 'Create' })).toBeVisible();
  }

  // Alternative login method using UIHelper
  async login(email, code) {
    await this.ui.click(this.locators.addAccountBtn);
    await this.ui.fill(this.locators.emailInput, email);
    await this.ui.click(this.locators.continueBtn);
    await this.ui.click(this.locators.signInWithAuthenticatorBtn);
    await this.ui.fill(this.locators.authCodeInput, code);
    await this.ui.click(this.locators.continueBtn);
    await this.ui.click(this.locators.okBtn);
  }

  async logout() {
    await this.ui.click(this.locators.userMenuBtn);
    await this.ui.click(this.locators.logoutOption);
  }
}

module.exports = { LoginPage };
