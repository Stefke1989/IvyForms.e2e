import { test, expect } from '@playwright/test';

test('uvek ulogovan', async ({ page }) => {
  await page.goto('/wp-admin/');
  await expect(page.locator('#wpadminbar')).toBeVisible();
});
