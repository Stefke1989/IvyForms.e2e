import { expect } from '@playwright/test';

export async function confirmationRedirectUrl(page) {
    await page.getByRole('link', { name: 'IvyForms', exact: true }).click();
    await page.locator('button').filter({ hasText: 'Form' }).click();
    await page.locator('div').filter({ hasText: /^Start from scratchStart with a blank form and build it your way\.$/ }).first().click();
    await page.getByRole('button', { name: 'Text' }).click();
    await page.locator('button').filter({ hasText: 'Update' }).click();

    await page.waitForTimeout(2000);

    await page.locator('#ivyforms-app').getByText('Settings').click();

    await page.waitForTimeout(2000);

    await page.locator('li').filter({ hasText: 'Confirmations' }).click();

    await page.getByText('Redirect to Custom URL').click();
    await page.getByPlaceholder('Enter URL').click();
    await page.getByPlaceholder('Enter URL').fill('www.ivyforms.com');
    await page.locator('button').filter({ hasText: 'Save' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('tooltip', { name: 'Preview form' }).getByLabel('Action button').click();
    const page1 = await page1Promise;
    await page1.getByRole('button', { name: 'Submit' }).click();

    await expect(page1.getByRole('heading', { name: 'The most innovative WordPress' })).toBeVisible();
    await page1.close();

    // // Navigate back to dashboard
    // await page.goto('http://localhost:8282/wp-admin/index.php');

    // console.log("✅ Redirect to URL verified successfully");
}