import { test, expect } from '@playwright/test';

test.describe('Shopping Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/auth/login');
    await page.fill('input[name="emailOrUsername"]', 'user@koopa.com');
    await page.fill('input[name="password"]', 'user123');
    await page.click('button[type="submit"]');
  });

  test('should add product to cart', async ({ page }) => {
    // Navigate to products
    await page.goto('/products');
    
    // Click on first product
    await page.click('.product-card:first-child');
    
    // Add to cart
    await page.click('text=加入購物車');
    
    // Verify cart count increased
    const cartCount = await page.textContent('.cart-count');
    expect(parseInt(cartCount || '0')).toBeGreaterThan(0);
  });

  test('should complete checkout', async ({ page }) => {
    // Navigate to cart
    await page.goto('/cart');
    
    // Proceed to checkout
    await page.click('text=結帳');
    
    // Fill shipping info
    await page.fill('input[name="recipientName"]', 'Test User');
    await page.fill('input[name="phone"]', '0912345678');
    
    // Complete order
    await page.click('text=確認訂單');
    
    // Verify order confirmation
    await expect(page).toHaveURL(/\/orders\//);
  });
});
