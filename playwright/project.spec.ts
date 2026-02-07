import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5173';

test.describe('Project Scene', () => {
  test.beforeEach(async ({ page }) => {
    // Login first (required for authenticated routes)
    await page.goto(`${baseURL}/#/`);
    
    // Wait for login form to be visible
    await page.getByRole('textbox', { name: /user/i }).waitFor({ state: 'visible' });
    await page.getByRole('textbox', { name: /user/i }).fill('admin');
    await page.getByLabel(/password/i).fill('test');
    await page.getByRole('button', { name: /login/i }).click();
    
    // Wait for navigation to submodule list (login API has delay)
    await page.waitForURL('**/#/submodule-list', { timeout: 10000 });
  });

  test('should navigate to project page and display tabs with "Datos" active by default', async ({ page }) => {
    // Arrange & Act
    await page.goto(`${baseURL}/#/projects/test-project-id`);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Assert - Check that tabs are visible and "Datos" is active
    await expect(page.getByRole('tab', { name: 'Datos' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Empleados' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Informes' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Datos' })).toHaveAttribute('aria-selected', 'true');
  });

  test('should switch between tabs when clicked', async ({ page }) => {
    // Arrange
    await page.goto(`${baseURL}/#/projects/test-project-id`);
    await page.waitForLoadState('networkidle');

    // Act & Assert - Switch to "Empleados" tab
    await page.getByRole('tab', { name: 'Empleados' }).click();
    await expect(page.getByRole('tab', { name: 'Empleados' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tab', { name: 'Datos' })).toHaveAttribute('aria-selected', 'false');

    // Act & Assert - Switch to "Informes" tab
    await page.getByRole('tab', { name: 'Informes' }).click();
    await expect(page.getByRole('tab', { name: 'Informes' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tab', { name: 'Empleados' })).toHaveAttribute('aria-selected', 'false');
  });

  test('should disable "Empleados" and "Informes" tabs when not in edit mode', async ({ page }) => {
    // Arrange - Navigate to a new project (not edit mode)
    await page.goto(`${baseURL}/#/projects/new`);
    await page.waitForLoadState('networkidle');

    // Assert
    await expect(page.getByRole('tab', { name: 'Empleados' })).toBeDisabled();
    await expect(page.getByRole('tab', { name: 'Informes' })).toBeDisabled();
    await expect(page.getByRole('tab', { name: 'Datos' })).not.toBeDisabled();
  });
});
