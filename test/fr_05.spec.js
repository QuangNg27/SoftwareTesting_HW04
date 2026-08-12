import { test, expect } from '@playwright/test';

test.describe('FR-05', () => {
  test('TC-FR05-001: Hiển thị mặc định danh sách sản phẩm khi vào trang chủ', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.locator('h1').first()).toHaveText('Danh sách sản phẩm');
    await expect(page.locator('text=iPhone 15 Pro Max')).toBeVisible();
    await expect(page.locator('text=Samsung Galaxy S24 Ultra')).toBeVisible();
    await expect(page.locator('text=MacBook Pro M3')).toBeVisible();
    await expect(page.locator('text=Tai nghe AirPods Pro 2')).toBeVisible();
    await expect(page.locator('text=Bàn phím cơ Keychron Q1')).toBeVisible();
    await expect(page.locator('text=30,000,000 VND')).toBeVisible();
  });

  test('TC-FR05-002: Kiểm tra thuộc tính Alt của hình ảnh sản phẩm', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('TC-FR05-003: Tìm kiếm khớp hoàn toàn tên sản phẩm', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('input[placeholder="Tìm kiếm..."]').fill('iPhone 15 Pro Max');
    await page.locator('button:has-text("Tìm")').click();
    await expect(page.locator('text=Kết quả tìm kiếm cho: iPhone 15 Pro Max')).toBeVisible();
    await expect(page.locator('text=iPhone 15 Pro Max')).toBeVisible();
    await expect(page.locator('text=Hiển thị 1 sản phẩm')).toBeVisible();
  });

  test('TC-FR05-004: Tìm kiếm khớp một phần tên sản phẩm', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('input[placeholder="Tìm kiếm..."]').fill('S');
    await page.locator('button:has-text("Tìm")').click();
    await expect(page.locator('text=Kết quả tìm kiếm cho: S')).toBeVisible();
    await expect(page.locator('text=Samsung Galaxy S24 Ultra')).toBeVisible();
    await expect(page.locator('text=Tai nghe AirPods Pro 2')).toBeVisible();
    await expect(page.locator('text=Hiển thị 2 sản phẩm')).toBeVisible();
  });
});
