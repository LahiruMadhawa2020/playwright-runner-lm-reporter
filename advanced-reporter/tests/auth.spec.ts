import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Authentication @smoke', () => {

  test('Login with valid credentials should succeed @functional', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      await expect(page).toHaveURL(/auth\/login/);
    });

    await test.step('Verify login form is visible', async () => {
      await expect(page.locator('input[name="username"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    await test.step('Enter credentials and submit', async () => {
      await page.locator('input[name="username"]').fill('Admin');
      await page.locator('input[name="password"]').fill('admin123');
      await page.locator('button[type="submit"]').click();
    });

    await test.step('Verify dashboard is displayed', async () => {
      await expect(page).toHaveURL(/dashboard/);
      await expect(page.locator('.oxd-topbar-header')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    await test.step('Verify user is logged in', async () => {
      await expect(page.locator('.oxd-userdropdown')).toBeVisible();
    });
  });

  test('Logout should fail - asserting wrong element @regression', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    await test.step('Login with valid credentials', async () => {
      await page.locator('input[name="username"]').fill('Admin');
      await page.locator('input[name="password"]').fill('admin123');
      await page.locator('button[type="submit"]').click();
      await expect(page).toHaveURL(/dashboard/);
    });

    await test.step('Click user dropdown menu', async () => {
      await page.locator('.oxd-userdropdown').click();
      await expect(page.locator('.oxd-dropdown-menu')).toBeVisible();
    });

    await test.step('Click logout option', async () => {
      await page.locator('text=Logout').click();
    });

    await test.step('Verify logout - this will fail intentionally', async () => {
      await expect(page).toHaveURL(/auth\/login/);
      // This assertion will fail because the element does not exist
      await expect(page.locator('text=You have been successfully logged out. This element does not exist on the page.')).toBeVisible();
    });
  });

});
