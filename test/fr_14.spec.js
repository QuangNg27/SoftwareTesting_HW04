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
    
    const emailInput = page.getByPlaceholder('Email');
    const categoryMenu = page.locator('li', { hasText: 'Danh mục' });
    const categoryHeading = page.getByRole('heading', { name: 'Quản lý Danh mục', level: 2 });

    // 1. Kiểm tra và thực hiện Đăng nhập nếu đang ở trang Login
    try {
      await expect(emailInput).toBeVisible({ timeout: 3000 });
      await emailInput.fill(adminUser.email);
      await page.getByPlaceholder('Password').fill(adminUser.password);
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(categoryMenu).toBeVisible({ timeout: 10000 });
    } catch {
      // Đã đăng nhập sẵn từ phiên trước
    }

    // 2. Chuyển sang tab "Danh mục" với cơ chế toPass() chống dropped-click do React re-render trên WebKit
    await expect(async () => {
      if (!(await categoryHeading.isVisible().catch(() => false))) {
        await categoryMenu.click({ force: true });
      }
      await expect(categoryHeading).toBeVisible({ timeout: 2000 });
    }).toPass({ timeout: 10000 });
  });

  test(`${testCases.TC_FR14_001.caseId}: ${testCases.TC_FR14_001.title}`, async ({ page }) => {
    const data = testCases.TC_FR14_001;

    // Pattern 1: Form interaction & Input locator
    const nameInput = page.getByPlaceholder('Tên danh mục mới');
    await expect(nameInput).toBeVisible();
    await nameInput.fill(data.categoryName);
    await page.getByRole('button', { name: 'Thêm mới' }).click();

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
    await page.getByRole('button', { name: 'Thêm mới' }).click();

    // ER: Danh mục 255 ký tự được thêm thành công và hiển thị đầy đủ trên bảng
    const longCategoryRow = page.locator('tbody tr').filter({ hasText: longCategoryName });
    await expect(longCategoryRow.first()).toBeVisible();
    await expect(longCategoryRow.first()).toContainText(longCategoryName);
  });

  test(`${testCases.TC_FR14_005.caseId}: ${testCases.TC_FR14_005.title}`, async ({ page }) => {
    const data = testCases.TC_FR14_005;

    // Sinh chuỗi dài 256 ký tự (Vượt biên trên BVA)
    const longCategoryName256 = data.categoryPrefix + 'B'.repeat(data.categoryNameLength - data.categoryPrefix.length);
    expect(longCategoryName256.length).toBe(256);

    const nameInput = page.getByPlaceholder('Tên danh mục mới');
    await nameInput.fill(longCategoryName256);
    
    // Gửi request thêm mới danh mục
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('categories') && resp.request().method() === 'POST').catch(() => {}),
      page.getByRole('button', { name: 'Thêm mới' }).click()
    ]);

    // Tìm ô tên danh mục vừa thêm vào bảng
    const savedCategoryCell = page.locator('tbody tr td:nth-child(2)').filter({ hasText: /^Category256Chars_/ });
    await expect(savedCategoryCell.first()).toBeVisible({ timeout: 5000 });

    // Pattern: Numeric Boundary Match Assertion
    // ER: Hệ thống phải giới hạn độ dài (cắt chuỗi còn tối đa 255 ký tự hoặc báo lỗi).
    // Khẳng định độ dài tên danh mục thực tế được lưu vào hệ thống không được vượt quá 255 ký tự.
    const savedText = await savedCategoryCell.first().innerText();
    expect(savedText.length).toBeLessThanOrEqual(data.maxAllowedLength);
  });

  test(`${testCases.TC_FR14_006.caseId}: ${testCases.TC_FR14_006.title}`, async ({ page }) => {
    const data = testCases.TC_FR14_006;

    // Lắng nghe xem có popup XSS độc hại nào kích hoạt không
    let xssTriggered = false;
    page.on('dialog', async dialog => {
      if (dialog.message() === 'XSS') {
        xssTriggered = true;
      }
      await dialog.accept();
    });

    const nameInput = page.getByPlaceholder('Tên danh mục mới');
    await nameInput.fill(data.xssPayload);
    await page.getByRole('button', { name: 'Thêm mới' }).click();

    // Pattern: Security & Sanitization Assertion
    // ER 1: Không có hộp thoại popup alert('XSS') xuất hiện
    expect(xssTriggered).toBe(data.expectedAlert);

    // ER 2: Chuỗi XSS hiển thị an toàn dưới dạng chuỗi văn bản (Plain Text)
    const xssRow = page.locator('tbody tr').filter({ hasText: data.expectedText });
    await expect(xssRow.first()).toBeVisible();
    await expect(xssRow.first()).toContainText(data.expectedText);
  });

  test(`${testCases.TC_FR14_007.caseId}: ${testCases.TC_FR14_007.title}`, async ({ page }) => {
    const data = testCases.TC_FR14_007;

    const nameInput = page.getByPlaceholder('Tên danh mục mới');
    await nameInput.fill(data.sqliPayload);
    await page.getByRole('button', { name: 'Thêm mới' }).click();

    // Pattern: Security & Plain Text Assertion
    // ER: Chuỗi SQLi được lưu nguyên văn dưới dạng text an toàn, hệ thống không bị lỗi crash
    const sqliRow = page.locator('tbody tr').filter({ hasText: data.expectedSavedText });
    await expect(sqliRow.first()).toBeVisible();
    await expect(sqliRow.first()).toContainText(data.expectedSavedText);
  });

  test(`${testCases.TC_FR14_008.caseId}: ${testCases.TC_FR14_008.title}`, async ({ page }) => {
    const data = testCases.TC_FR14_008;

    // Pattern: Table Schema & Data Count Assertion
    // ER 1: Bảng hiển thị đầy đủ các tiêu đề cột "ID", "Tên Danh Mục", "Hành động"
    for (const headerName of data.expectedHeaders) {
      await expect(page.locator('th').filter({ hasText: headerName })).toBeVisible();
    }

    // Tự động chờ bảng tải xong dữ liệu từ API và render dòng đầu tiên lên DOM
    await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 5000 });

    // ER 2: Bảng hiển thị ít nhất 1 dòng danh mục hợp lệ
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThanOrEqual(data.minRowCount);

    // ER 3: Mỗi dòng danh mục hiển thị nút hành động "Xóa"
    await expect(page.locator('tbody tr button', { hasText: 'Xóa' }).first()).toBeVisible();
  });

});
