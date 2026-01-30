import { test, expect } from '@playwright/test';

test('generate storage state', async ({ page }) => {
  await page.goto('http://localhost:8000/wp-login.php');

  await page.fill('#user_login', 'root');
  await page.fill('#user_pass', 'pass');
  await page.click('#wp-submit');

  // WP nekad ne redirectuje → mi ga vodimo na admin
  await page.goto('http://localhost:8000/wp-admin/');

  // ali sada PROVERAVAMO da smo stvarno u adminu
  await expect(page.locator('#wpadminbar')).toBeVisible();

  await page.context().storageState({
    path: 'storageState.json',
  });
});
