# Copilot Instructions for Albert Demo-ManiFW

## Project Overview
- This project is a Playwright-based end-to-end test suite for a web application, using the Page Object Model (POM) pattern.
- Test specs are in `tests/` and use Playwright's `test.describe`/`test()` structure.
- Page objects are in `pageobjects/` and encapsulate UI interactions for Login, Project, Worksheet, and Task flows.
- Gherkin feature files (e.g., `features/login.feature`) are present for BDD-style scenarios, but main automation is Playwright-based.

## Key Patterns & Conventions
- **Page Object Model:** Each page object (e.g., `LoginPage.js`, `ProjectPage.js`) exposes action methods for UI steps. Always instantiate with a Playwright `page`.
- **Iframe Handling:** Many UI elements are inside iframes. Use `.contentFrame()` and locate elements within the frame, as shown in page objects.
- **Test Data:** Hardcoded test data (e.g., emails, codes, URLs) is used in specs. Update as needed for environment changes.
- **Tagging:** Tests use Playwright's `{ tag: [...] }` for grouping (e.g., `@smoke`, `@TC001`).

## Developer Workflows
- **Run Tests:**
  - Use Playwright CLI: `npx playwright test` (runs all tests in `tests/`)
  - HTML reports: `npx playwright show-report` (opens `playwright-report/`)
- **Debugging:**
  - Set `headless: false` in `playwright.config.js` (already set for Chromium project).
  - Use Playwright Inspector: add `await page.pause()` in tests.
- **Syntax Validation:**
  - Run `node validate_syntax.js` to check for common test file issues (missing imports, unbalanced braces, etc).

## Integration & Dependencies
- Uses Playwright (`@playwright/test`) and Cucumber (`@cucumber/cucumber`) as main dependencies.
- No custom build step; tests run directly via Playwright.
- `testsprite_tests/tmp/config.json` hints at possible local frontend integration (endpoint: `http://localhost:5173/`).

## Notable Files & Directories
- `pageobjects/` — Page Object Model classes for major app areas
- `tests/` — Playwright test specs
- `features/` — Gherkin feature files (not directly run by Playwright)
- `validate_syntax.js` — Custom script for Playwright spec linting
- `playwright.config.js` — Playwright configuration (viewport, trace, device, etc)
- `playwright-report/` — HTML test reports

## Project-Specific Advice
- Always use the provided page object methods for UI actions; do not duplicate selectors in specs.
- When adding new flows, create/extend page objects first, then write specs.
- For iframe-heavy flows, follow the locator patterns in existing page objects.
- Keep test data up to date and avoid leaking credentials.

---
For more details, see the code in `pageobjects/` and example specs in `tests/Projectcreation.spec.js`.
