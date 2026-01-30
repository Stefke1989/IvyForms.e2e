export async function activateIvyForms(page) {
  // Open the plugins page
  await page.goto('/wp-admin/plugins.php');

  // Link appears ONLY if the plugin is not active
  const activateLink = page.getByRole('link', { name: /Activate IvyForms/i });

  if (await activateLink.count() > 0) {
    await activateLink.first().click();
    await page.waitForLoadState('networkidle');
  }
}
