import { expect } from '@playwright/test';

export async function addAllFields(page) {
    await page.getByRole('link', { name: 'IvyForms', exact: true }).click();
    await page.locator('button').filter({ hasText: 'Form' }).click();
    await page.locator('div').filter({ hasText: /^Start from scratchStart with a blank form and build it your way\.$/ }).first().click();

    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: 'Text' }).click();
    await page.getByRole('button', { name: 'Email' }).click();
    await page.getByRole('button', { name: 'Number' }).click();
    await page.getByRole('button', { name: 'Paragraph' }).click();
    await page.getByRole('button', { name: 'Phone' }).click();
    await page.getByRole('button', { name: 'Website/Url' }).click();
    await page.getByRole('button', { name: 'Name' }).click();
    await page.getByRole('button', { name: 'Address' }).click();
    await page.getByRole('button', { name: 'Radio Button' }).click();
    await page.getByRole('button', { name: 'Checkbox' }).click();
    await page.getByRole('button', { name: 'Dropdown' }).click();
    await page.locator('button').filter({ hasText: 'Update' }).click();

    await page.waitForTimeout(2000);

    await page.locator('#ivyforms-app').getByText('Settings').click();
    await page.getByRole('textbox', { name: 'Form Name' }).click();
    await page.getByRole('textbox', { name: 'Form Name' }).fill('Add All Fields Test');
    await page.locator('button').filter({ hasText: 'Save' }).click();

    // Wait longer after saving settings to ensure form is stable
    await page.waitForTimeout(4000);
    await page.waitForLoadState('networkidle');

    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('tooltip', { name: 'Preview form' }).getByLabel('Action button').click();
    const page1 = await page1Promise;

    // Wait for the popup page to fully load and stabilize
    await page1.waitForLoadState('load');
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForLoadState('networkidle');

    // Additional wait to ensure form is rendered once
    await page1.waitForTimeout(2000);

    await page1.getByRole('textbox', { name: 'Text' }).first().click();
    await page1.getByRole('textbox', { name: 'Text' }).first().fill('Test text');
    await page1.getByRole('textbox', { name: 'Email' }).click();
    await page1.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');
    await page1.getByRole('textbox', { name: 'Number', exact: true }).click();
    await page1.getByRole('textbox', { name: 'Number', exact: true }).fill('5');
    await page1.getByRole('textbox', { name: 'field.label' }).click();
    await page1.getByRole('textbox', { name: 'field.label' }).fill('test1\ntest2');
    await page1.getByRole('textbox', { name: 'Phone number' }).click();
    await page1.getByRole('textbox', { name: 'Phone number' }).fill('+49 12345678');
    await page1.getByRole('textbox', { name: 'Website/Url' }).click();
    await page1.getByRole('textbox', { name: 'Website/Url' }).fill('www.ivyforms.com');
    await page1.getByRole('textbox', { name: 'First Name' }).click();
    await page1.getByRole('textbox', { name: 'First Name' }).fill('Test name');
    await page1.getByRole('textbox', { name: 'Last Name' }).click();
    await page1.getByRole('textbox', { name: 'Last Name' }).fill('Test last name');
    await page1.getByRole('textbox', { name: 'Street Address' }).click();
    await page1.getByRole('textbox', { name: 'Street Address' }).fill('Test adress 1/2');        
    await page1.getByRole('textbox', { name: 'State' }).click();
    await page1.getByRole('textbox', { name: 'State' }).fill('Serbia');
    await page1.getByRole('textbox', { name: 'City' }).click();
    await page1.getByRole('textbox', { name: 'City' }).fill('Belgrade');
    await page1.getByRole('textbox', { name: 'Zip' }).click();
    await page1.getByRole('textbox', { name: 'Zip' }).fill('11000');
    await page1.getByRole('combobox', { name: 'Country' }).click();
    await page1.getByRole('option', { name: 'Algeria' }).click();
    await page1.locator('label').filter({ hasText: 'Choice 1' }).locator('span').nth(1).click();
    await page1.locator('label').filter({ hasText: 'Choice 2' }).locator('span').nth(1).click();
    await page1.locator('label').filter({ hasText: 'Choice 3' }).locator('span').nth(1).click();
    await page1.locator('div').filter({ hasText: /^Option 1$/ }).nth(4).click();
    await page1.getByRole('option', { name: 'Option 1' }).click();

    await page1.getByRole('button', { name: 'Submit' }).click();

    await page1.waitForTimeout(2000);

    await expect(page1.getByText(/Thanks for reaching out!/)).toBeVisible();

    // // Close the popup page to continue testing on the main page
    // await page1.close();

    // // Navigate back to dashboard
    // await page.goto('http://localhost:8282/wp-admin/index.php');
}