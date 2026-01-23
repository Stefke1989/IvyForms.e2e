import { test } from '@playwright/test';

test('generate storage state', async ({ page }) => {
  await page.goto('http://localhost:8000/wp-login.php');

  await page.fill('#user_login', 'root');
  await page.fill('#user_pass', 'pass');
  await page.click('#wp-submit');

  // WordPress ne uvek redirectuje – zato forsiramo admin
  await page.goto('http://localhost:8000/wp-admin/');

  // čekamo jasan signal da smo ulogovani
  await page.waitForSelector('#wpadminbar');

  await page.context().storageState({
    path: 'storageState.json',
  });
});
