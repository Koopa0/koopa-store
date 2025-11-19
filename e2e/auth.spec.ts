import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to login
    await page.click('text=登入');
    
    // Fill login form
    await page.fill('input[name="emailOrUsername"]', 'admin@koopa.com');
    await page.fill('input[name="password"]', 'admin123');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Verify logged in
    await expect(page).toHaveURL('/');
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.fill('input[name="emailOrUsername"]', 'admin@koopa.com');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Logout
    await page.click('text=登出');
    
    // Verify logged out
    await expect(page).toHaveURL('/auth/login');
  });
});
