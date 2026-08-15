import { test, expect } from '@playwright/test';
import fs from 'fs';

// Nạp dữ liệu kiểm thử từ tệp JSON độc lập (Data-Driven Testing)
const testData = JSON.parse(
  fs.readFileSync(new URL('../data/fr14_category_data.json', import.meta.url), 'utf-8')
);

const { baseUrl, adminUser, testCases } = testData;

test.describe(testData.feature, () => {

  // Pre-requisite chung cho các test cases: Đăng nhập quyền Admin và chuyển đến tab "Danh mục"
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    
    // Đăng nhập với tài khoản Admin
    await page.getByPlaceholder('Email').fill(adminUser.email);
    await page.getByPlaceholder('Password').fill(adminUser.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');

    // Chuyển sang tab "Danh mục"
    await page.locator('li', { hasText: 'Danh mục' }).click();
    await page.waitForLoadState('networkidle');

    // Đảm bảo đã vào đúng trang Quản lý Danh mục
    await expect(page.getByRole('heading', { name: 'Quản lý Danh mục', level: 2 })).toBeVisible();
  });

  test(`${testCases.TC_FR14_001.caseId}: ${testCases.TC_FR14_001.title}`, async ({ page }) => {
    const data = testCases.TC_FR14_001;

    // Pattern 1: Form interaction & Input locator
    const nameInput = page.getByPlaceholder('Tên danh mục mới');
    await expect(nameInput).toBeVisible();
    await nameInput.fill(data.categoryName);

    // Đồng bộ mạng khi gửi request thêm mới danh mục
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/categories') && resp.request().method() === 'POST').catch(() => [null]),
      page.getByRole('button', { name: 'Thêm mới' }).click()
    ]);
    if (response) await response.json().catch(() => {});

    // Pattern 2: Visibility & Text Content Assertion (ER: Danh mục mới xuất hiện trong bảng danh sách)
    const categoryRow = page.locator('tbody tr').filter({ hasText: data.categoryName });
    await expect(categoryRow.first()).toBeVisible();
    await expect(categoryRow.first()).toContainText(data.categoryName);
  });

  test(`${testCases.TC_FR14_002.caseId}: ${testCases.TC_FR14_002.title}`, async ({ page }) => {
    const data = testCases.TC_FR14_002;

    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    const nameInput = page.getByPlaceholder('Tên danh mục mới');
    await nameInput.fill(data.categoryName);
    await page.getByRole('button', { name: 'Thêm mới' }).click();
    await page.waitForTimeout(500);

    // Pattern 3: Negative Assertion / Validation Requirement
    // ER: Hệ thống phải báo lỗi yêu cầu nhập tên danh mục HOẶC không cho phép tạo dòng danh mục rỗng
    const hasValidationError = dialogMessage.includes(data.expectedErrorMessage) || 
                               await page.getByText(data.expectedErrorMessage).isVisible().catch(() => false);
    
    // Kiểm tra dòng danh mục rỗng không được phép xuất hiện trong bảng
    const emptyCategoryRow = page.locator('tbody tr td:nth-child(2)').filter({ hasText: /^\s*$/ });
    
    // Khẳng định theo Kết quả mong đợi (ER): Phải có thông báo lỗi hoặc không tồn tại row rỗng
    expect(hasValidationError).toBe(true);
    await expect(emptyCategoryRow).toHaveCount(0);
  });

  test(`${testCases.TC_FR14_003.caseId}: ${testCases.TC_FR14_003.title}`, async ({ page }) => {
    const data = testCases.TC_FR14_003;

    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    const nameInput = page.getByPlaceholder('Tên danh mục mới');
    await nameInput.fill(data.categoryName);
    await page.getByRole('button', { name: 'Thêm mới' }).click();
    await page.waitForTimeout(500);

    // Pattern 4: Whitespace Trim Validation Assertion
    // ER: Hệ thống tự động cắt bỏ khoảng trắng thừa, nhận diện tên danh mục rỗng và báo lỗi, không cho phép lưu
    const hasTrimmedError = dialogMessage.includes(data.expectedErrorMessage) || 
                            await page.getByText(data.expectedErrorMessage).isVisible().catch(() => false);

    // Danh sách không được chứa danh mục có tên chỉ toàn khoảng trắng
    const whitespaceRow = page.locator('tbody tr td:nth-child(2)').filter({ hasText: /^\s+$/ });

    expect(hasTrimmedError).toBe(true);
    await expect(whitespaceRow).toHaveCount(0);
  });

  test(`${testCases.TC_FR14_004.caseId}: ${testCases.TC_FR14_004.title}`, async ({ page }) => {
    const data = testCases.TC_FR14_004;

    // Sinh chuỗi tên danh mục đúng 255 ký tự (Cận biên trên hợp lệ)
    const longCategoryName = data.categoryPrefix + 'A'.repeat(data.categoryNameLength - data.categoryPrefix.length);

    // Pattern 5: Length verification & Boundary Data Match
    expect(longCategoryName.length).toBe(255);

    const nameInput = page.getByPlaceholder('Tên danh mục mới');
    await nameInput.fill(longCategoryName);

    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/categories') && resp.request().method() === 'POST').catch(() => [null]),
      page.getByRole('button', { name: 'Thêm mới' }).click()
    ]);
    if (response) await response.json().catch(() => {});

    // ER: Danh mục 255 ký tự được thêm thành công và hiển thị đầy đủ trên bảng
    const longCategoryRow = page.locator('tbody tr').filter({ hasText: longCategoryName });
    await expect(longCategoryRow.first()).toBeVisible();
    await expect(longCategoryRow.first()).toContainText(longCategoryName);
  });

});
