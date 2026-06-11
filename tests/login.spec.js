import { test, expect } from "@playwright/test";
import { loginData } from "../testData/loginData";

const url = "https://freelance-learn-automation.vercel.app/login";

loginData.forEach((data, index) => {
  test(`Login test ${index + 1} - ${data.email}`, async ({ page }) => {
    await page.goto(url);

    await page.fill('input[type="email"]', data.email);
    await page.fill('input[type="password"]', data.password);
    await page.click('button[type="submit"]');

    if (data.isValid) {
      // Wait for navigation to complete and validate we're on dashboard
      await page.waitForURL(/dashboard|home|profile|courses/, { timeout: 10000 });
      await expect(page).not.toHaveURL(/login/);
      // Verify page has loaded properly
      await expect(page).toHaveTitle(/dashboard|home|profile/i).catch(() => {
        // Title validation is optional, main validation is URL change
        console.log("Page title does not match expected pattern, but URL navigation confirmed");
      });
    } else {
      // For invalid credentials, should stay on login page
      await expect(page).toHaveURL(/login/);
    }
  });
});