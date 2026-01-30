import { expect } from '@playwright/test';

export async function confirmationRedirectPage(page) {

    // Create new page for redirection
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.waitForTimeout(2000);
    await page.pause();
    await page.locator('#wpbody-content').getByRole('link', { name: 'Add New Page' })
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('textbox', { name: 'Add title' }).fill('Test redirect to page');
    await page.getByRole('button', { name: 'Publish', exact: true }).click();

    await page.getByRole('link', { name: 'IvyForms', exact: true }).click();
    await page.locator('button').filter({ hasText: 'Form' }).click();
    await page.locator('div').filter({ hasText: /^Start from scratchStart with a blank form and build it your way\.$/ }).first().click();
    await page.getByRole('button', { name: 'Text' }).click();
    await page.locator('button').filter({ hasText: 'Update' }).click();

    await page.waitForTimeout(2000);

    await page.locator('#ivyforms-app').getByText('Settings').click();

    await page.waitForTimeout(2000);

    await page.locator('li').filter({ hasText: 'Confirmations' }).click();
    await page.getByText('Redirect to Page').click();
    await page.locator('.el-select__selected-item.el-select__placeholder').click();

    await page.getByText('Test redirect to page').click();
    await page.locator('div').filter({ hasText: /^ActiveSave$/ }).getByLabel('Action button').click();

    await page.waitForTimeout(3000);

    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('tooltip', { name: 'Preview form' }).getByLabel('Action button').click();
    const page1 = await page1Promise;

    await page.waitForTimeout(3000);

    await page1.getByRole('button', { name: 'Submit' }).click();

    await page.waitForTimeout(3000);

    await expect(page1.getByRole('heading', { name: 'Test redirect to page' })).toBeVisible();
    await page1.close();

    // // Navigate back to dashboard
    // await page.goto('http://localhost:8282/wp-admin/index.php');

    // console.log("✅ Redirect to page verified successfully");
}