const { time } = require("node:console");

class UIHelper {
  constructor(page) {
    this.page = page;
  }

  async click(locator) {
    // await locator.waitFor({ state: 'visible', timeout: 30000 });
    await locator.click();
  }

  async fill(locator, value) {
    // await locator.waitFor({ state: 'visible', timeout: 30000 });
    await locator.fill(value);
  }

  async scrollIntoView(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async hover(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.hover();
  }

  async wait(seconds) {
    await this.page.waitForTimeout(seconds * 1000);
  }
}

module.exports = { UIHelper };