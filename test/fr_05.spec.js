import { test, expect } from '@playwright/test';
import fs from 'fs';

// Đọc dữ liệu kiểm thử từ tệp JSON tương thích tuyệt đối với mọi phiên bản Node.js/Playwright ESM
const testData = JSON.parse(
  fs.readFileSync(new URL('../data/fr05_search_data.json', import.meta.url), 'utf-8')
);

const { baseUrl, testCases } = testData;

test.describe(testData.feature, () => {

  test(`${testCases.TC_FR05_001.caseId}: ${testCases.TC_FR05_001.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_001;
    await page.goto(baseUrl);

    // Pattern 1: Count Assertion (ER 3: Trang chủ chỉ chứa duy nhất một thẻ <h1>)
    await expect(page.locator('h1')).toHaveCount(data.expectedH1Count);

    // Pattern 2: Visibility Assertions for each expected product from dataset
    for (const productName of data.expectedProducts) {
      await expect(page.getByRole('heading', { name: productName, level: 2 })).toBeVisible();
    }

    // Pattern 3: RegExp Text Match Assertion
    await expect(page.getByText(new RegExp(data.expectedPricePattern))).toBeVisible();
  });

  test(`${testCases.TC_FR05_002.caseId}: ${testCases.TC_FR05_002.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_002;
    await page.goto(baseUrl);

    // Chờ cho React render xong danh sách sản phẩm và thẻ <img> xuất hiện trên DOM
    await expect(page.locator('img').first()).toBeVisible();

    const images = page.locator('img');
    const count = await images.count();
    
    // Pattern 1: Comparison Assertion
    expect(count).toBeGreaterThanOrEqual(data.minImageCount);

    // Pattern 2: Attribute & String Assertions
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt?.trim()).not.toBe('');
    }
  });

  test(`${testCases.TC_FR05_003.caseId}: ${testCases.TC_FR05_003.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_003;
    await page.goto(baseUrl);

    await page.locator('input[placeholder="Tìm kiếm..."]').fill(data.keyword);
    
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
      page.locator('button:has-text("Tìm")').click(),
    ]);
    await response.json();

    // Pattern 1: Text Search Label Visibility
    await expect(page.getByText(data.expectedSearchLabel)).toBeVisible();

    // Pattern 2: Expected Visible Product Assertions
    for (const name of data.expectedVisible) {
      await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
    }

    // Pattern 3: Expected Hidden Products Assertions
    for (const name of data.expectedHidden) {
      await expect(page.getByRole('heading', { name, level: 2 })).not.toBeVisible();
    }
  });

  test(`${testCases.TC_FR05_004.caseId}: ${testCases.TC_FR05_004.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_004;
    await page.goto(baseUrl);

    await page.locator('input[placeholder="Tìm kiếm..."]').fill(data.keyword);
    
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
      page.locator('button:has-text("Tìm")').click(),
    ]);
    await response.json();

    await expect(page.getByText(`Kết quả tìm kiếm cho: ${data.keyword}`)).toBeVisible();

    for (const name of data.expectedVisible) {
      await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
    }

    for (const name of data.expectedHidden) {
      await expect(page.getByRole('heading', { name, level: 2 })).not.toBeVisible();
    }
  });

  test(`${testCases.TC_FR05_005.caseId}: ${testCases.TC_FR05_005.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_005;
    await page.goto(baseUrl);

    await page.locator('input[placeholder="Tìm kiếm..."]').fill(data.keyword);
    
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
      page.locator('button:has-text("Tìm")').click(),
    ]);
    await response.json();

    await expect(page.getByText(`Kết quả tìm kiếm cho: ${data.keyword}`)).toBeVisible();

    for (const name of data.expectedHidden) {
      await expect(page.getByRole('heading', { name, level: 2 })).not.toBeVisible();
    }

    // Pattern: Regex Match for Empty State
    await expect(page.getByText(new RegExp(data.emptyStatePattern, 'i'))).toBeVisible();
  });

  test(`${testCases.TC_FR05_006.caseId}: ${testCases.TC_FR05_006.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_006;
    await page.goto(baseUrl);

    await page.locator('input[placeholder="Tìm kiếm..."]').fill(data.rawKeyword);
    
    // Đợi chính xác response body hoàn tất để đồng bộ hóa tuyệt đối trạng thái render DOM trên mọi browser engine (tránh WebKit Race Condition)
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
      page.locator('button:has-text("Tìm")').click(),
    ]);
    await response.json();

    // Đợi dòng thông báo tìm kiếm cập nhật
    await expect(page.getByText(/Kết quả tìm kiếm cho:/)).toBeVisible();

    // ER 1: Hệ thống tự động bỏ khoảng trắng và tìm ra sản phẩm "iPhone 15 Pro Max" (thẻ h2 tiêu đề sản phẩm).
    await expect(page.getByRole('heading', { name: data.trimmedProduct, level: 2 })).toBeVisible();

    // ER 2: Kết quả hiển thị đúng như khi tìm kiếm không có khoảng trắng thừa (các sản phẩm khác bị ẩn).
    for (const name of data.expectedHidden) {
      await expect(page.getByRole('heading', { name, level: 2 })).not.toBeVisible();
    }
  });

  test(`${testCases.TC_FR05_007.caseId}: ${testCases.TC_FR05_007.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_007;
    await page.goto(baseUrl);

    const query = data.char.repeat(data.length);
    await page.locator('input[placeholder="Tìm kiếm..."]').fill(query);
    
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
      page.locator('button:has-text("Tìm")').click(),
    ]);
    await response.json();

    await expect(page.getByText(`Kết quả tìm kiếm cho: ${query}`)).toBeVisible();
    await expect(page.getByText(new RegExp(data.emptyStatePattern, 'i'))).toBeVisible();
  });

  test(`${testCases.TC_FR05_008.caseId}: ${testCases.TC_FR05_008.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_008;
    await page.goto(baseUrl);

    const query = data.char.repeat(data.length);
    await page.locator('input[placeholder="Tìm kiếm..."]').fill(query);
    
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
      page.locator('button:has-text("Tìm")').click(),
    ]);
    await response.json();

    await expect(page.getByText(`Kết quả tìm kiếm cho: ${query}`)).toBeVisible();
    await expect(page.getByText(new RegExp(data.emptyStatePattern, 'i'))).toBeVisible();
  });

  test(`${testCases.TC_FR05_009.caseId}: ${testCases.TC_FR05_009.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_009;
    await page.goto(baseUrl);

    const query = data.char.repeat(data.length);
    const searchInput = page.locator('input[placeholder="Tìm kiếm..."]');
    await searchInput.fill(query);

    // Pattern: Value Length Numeric Assertion
    const actualLength = (await searchInput.inputValue()).length;
    expect(actualLength).toBeLessThanOrEqual(data.maxLengthLimit);

    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
      page.locator('button:has-text("Tìm")').click(),
    ]);
    await response.json();

    await expect(page.getByRole('link', { name: 'EShop' })).toBeVisible();
  });

  test(`${testCases.TC_FR05_010.caseId}: ${testCases.TC_FR05_010.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_010;
    let dialogTriggered = false;
    page.on('dialog', async dialog => {
      dialogTriggered = true;
      await dialog.dismiss().catch(() => {});
    });

    await page.goto(baseUrl);

    await page.locator('input[placeholder="Tìm kiếm..."]').fill(data.xssPayload);
    
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
      page.locator('button:has-text("Tìm")').click(),
    ]);
    await response.json();

    // Pattern: Boolean Assertion
    expect(dialogTriggered).toBe(data.expectDialogTriggered);

    await expect(page.getByText(`Kết quả tìm kiếm cho: ${data.xssPayload}`)).toBeVisible();
  });

  test(`${testCases.TC_FR05_011.caseId}: ${testCases.TC_FR05_011.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_011;
    await page.goto(baseUrl);

    await page.locator('input[placeholder="Tìm kiếm..."]').fill(data.sqliPayload);

    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
      page.locator('button:has-text("Tìm")').click(),
    ]);
    await response.json();

    await expect(page.getByRole('link', { name: 'EShop' })).toBeVisible();

    for (const name of data.expectedHidden) {
      await expect(page.getByRole('heading', { name, level: 2 })).not.toBeVisible();
    }
  });

  test(`${testCases.TC_FR05_012.caseId}: ${testCases.TC_FR05_012.title}`, async ({ page }) => {
    const data = testCases.TC_FR05_012;

    await page.route('**/api/products*', async route => {
      await new Promise(resolve => setTimeout(resolve, data.delayMs));
      await route.continue();
    });

    const navigationPromise = page.goto(baseUrl);

    // Pattern: Regex OR Compound Visibility Assertion
    await expect(page.getByText(new RegExp(data.loadingPattern, 'i')).or(page.locator('.spinner, .loading'))).toBeVisible({ timeout: 500 });

    await navigationPromise;
  });

  test(`${testCases.TC_FR05_013.caseId}: ${testCases.TC_FR05_013.title}`, async ({ page, browserName }) => {
    const data = testCases.TC_FR05_013;
    test.skip(browserName === 'webkit', 'WebKit headless engine does not support synthetic Tab key focus progression without macOS Full Keyboard Access');

    await page.goto(baseUrl);

    for (const linkName of data.expectedLinks) {
      await page.keyboard.press('Tab');
      // Pattern: Focus State Assertion
      await expect(page.getByRole('link', { name: linkName })).toBeFocused();
    }

    await page.keyboard.press('Tab');
    await expect(page.locator(`input[placeholder="${data.searchPlaceholder}"]`)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator(`button:has-text("${data.searchButtonText}")`)).toBeFocused();
  });

});
