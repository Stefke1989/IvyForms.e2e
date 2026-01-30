import { expect } from '@playwright/test';

export async function addFieldOnDrag(page) {
    await page.getByRole('link', { name: 'IvyForms' }).click();
    await page.locator('button').filter({ hasText: 'Form' }).click();
    await page.locator('div').filter({ hasText: /^Start from scratchStart with a blank form and build it your way\.$/ }).first().click();

    await page.waitForTimeout(3000);

    // Drag and drop the Text field to the form builder
    const textButton = page.getByRole('button', { name: 'Text' });
    const dropTarget = page.locator('.ivyforms-form-builder.ivyforms-flex.ivyforms-flex-1.ivyforms-flex-direction-column');

    await textButton.dragTo(dropTarget);

    await page.locator('button').filter({ hasText: 'Update' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('tooltip', { name: 'Preview form' }).getByLabel('Action button').click();
    const page1 = await page1Promise;

    await page.waitForTimeout(2000);
    await page1.waitForTimeout(3000);

    await page1.getByRole('textbox', { name: 'Text' }).click();
    await page1.getByRole('textbox', { name: 'Text' }).fill('test drag field');
    await page1.getByRole('button', { name: 'Submit' }).click();

    await expect(page1.getByText(/Thanks for reaching out!/)).toBeVisible();

    // // Close the popup page to continue testing on the main page
    // await page1.close();

    // // Navigate back to dashboard
    // await page.goto('http://localhost:8282/wp-admin/index.php');
}