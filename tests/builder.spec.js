import { test } from '@playwright/test';
import { activateIvyForms } from './helpers/activateIvyForms.helper';
import { addAllFields } from './helpers/addAllFields.helper';
import { addFieldOnDrag } from './helpers/addFieldOnDrag.helper';
import { confirmationRedirectUrl } from './helpers/confirmationRedirectUrl.helper';
import { confirmationRedirectPage } from './helpers/confirmationRedirectPage.helper';
import { confirmationSuccessMsg } from './helpers/confirmationSuccessMsg.helper';
import { duplicateForm } from './helpers/duplicateForm.helper';

test.use({ storageState: 'storageState.json' });

test.beforeEach(async ({ page }) => {
  await activateIvyForms(page);
  await page.goto('/wp-admin/');
});

test('Add all fields', async ({ page }) => {
  await addAllFields(page);
});

test('Add field by drag and drop', async ({ page }) => {
  await addFieldOnDrag(page);
});

test('Confirmation redirect to URL', async ({ page }) => {
  await confirmationRedirectUrl(page);
});

// Problems with gutenberg editor in wp-admin
// test('Confirmation redirect to page', async ({ page }) => {
//   await confirmationRedirectPage(page);
// });

test('Confirmation success message', async ({ page }) => {
  await confirmationSuccessMsg(page);
});

test('Duplicate form', async ({ page }) => {
  await duplicateForm(page);
});
