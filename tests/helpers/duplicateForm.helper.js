export async function duplicateForm(page) {
    // Navigate to All Forms
    await page.getByRole('link', { name: 'IvyForms', exact: true }).click();
    
    // Hover over the table cell to make tooltip actions visible
    await page.locator('.el-table-v2__row-cell').first().hover();
    
    // Wait a moment for the tooltip to appear, then click
    await page.waitForTimeout(500);
    await page.getByRole('tooltip', { name: 'Duplicate' }).getByLabel('Action button').click();

    // Wait for confirmation dialog to appear
    await page.getByRole('dialog').locator('div').filter({ hasText: 'Duplicate this Form?' }).nth(1).waitFor({ state: 'visible' });

    await page.locator('button').filter({ hasText: 'Duplicate' }).click();

    console.log('✅ Form duplication process completed!');
}