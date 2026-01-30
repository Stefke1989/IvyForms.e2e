import { expect } from '@playwright/test';

export async function confirmationSuccessMsg(page) {
    await page.getByRole('link', { name: 'IvyForms', exact: true }).click();
    await page.locator('button').filter({ hasText: 'Form' }).click();
    await page.locator('div').filter({ hasText: /^Start from scratchStart with a blank form and build it your way\.$/ }).first().click();
    await page.getByRole('button', { name: 'Text' }).click();
    await page.locator('button').filter({ hasText: 'Update' }).click();
    await page.locator('#ivyforms-app').getByText('Settings').click();

    await page.waitForTimeout(3000);
    
    await page.locator('li').filter({ hasText: 'Confirmations' }).click();
    await page.locator('.ivyforms-editor__content').click();
    await page.locator('.ivyforms-editor__content').click();
    await page.locator('body').press('ControlOrMeta+a');
    await page.locator('.ivyforms-editor__content').click();
    await page.getByText('Thanks for reaching out! We’').dblclick();
    await page.getByLabel('Success Message').nth(1).fill('Test confirmation message');
    await page.locator('div').filter({ hasText: /^ActiveSave$/ }).getByLabel('Action button').click();

    await page.waitForTimeout(3000);

    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('tooltip', { name: 'Preview form' }).getByLabel('Action button').click();
    const page1 = await page1Promise;
    await page1.getByRole('button', { name: 'Submit' }).click();

    await expect(page1.getByText(/Test confirmation message/)).toBeVisible();
    await page1.close();

    // Navigate back to dashboard
    await page.goto('http://localhost:8282/wp-admin/index.php');

    console.log("✅ Confirmation success message verified successfully");
}