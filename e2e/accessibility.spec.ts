import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility', () => {
  test('homepage should be accessible', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('login page should be accessible', async ({ page }) => {
    await page.goto('/auth/login');
    await injectAxe(page);
    await checkA11y(page);
  });
});
