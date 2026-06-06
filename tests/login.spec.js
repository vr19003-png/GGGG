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
      await expect(page).not.toHaveURL(/login/);
     // await expect(page.locator("text=Dashboard")).toBeVisible();
    } else {
      await expect(page).toHaveURL(/login/);
     // await expect(page.locator("text=Invalid")).toBeVisible();
    }
  });
});