import { test, expect } from '@playwright/test';

test('Select date using keyboard input', async ({ page }) => {

  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const datePicker = page.locator('input[name="my-date"]');

  await datePicker.click();
  await datePicker.fill('2026-07-10');

  await expect(datePicker).toHaveValue('2026-07-10');
  await page.pause();
  

});