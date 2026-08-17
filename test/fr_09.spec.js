import { test, expect } from '@playwright/test';
import fs from 'fs';

// Đọc bộ dữ liệu kiểm thử từ file JSON độc lập (Data-Driven Testing)
const testData = JSON.parse(
  fs.readFileSync(new URL('../data/fr09_coupon_data.json', import.meta.url), 'utf-8')
);

const { baseUrl, customerUser, testCases } = testData;

test.describe(testData.feature, () => {

  // Helper đăng nhập người dùng
  async function ensureLoggedIn(page) {
    await page.goto(`${baseUrl}/`);
    const logoutBtn = page.getByRole('button', { name: 'Thoát' });

    if (!(await logoutBtn.isVisible().catch(() => false))) {
      await page.goto(`${baseUrl}/login`);
      await page.locator('input').first().fill(customerUser.email);
      await page.locator('input').nth(1).fill(customerUser.password);
      await page.getByRole('button', { name: 'Sign In' }).click();
      await expect(page.getByRole('button', { name: 'Thoát' })).toBeVisible({ timeout: 10000 });
    }
  }

  // Helper chuẩn bị giỏ hàng với sản phẩm tương ứng và chuyển tới trang Checkout
  async function prepareCartAndGoToCheckout(page, productName) {
    await ensureLoggedIn(page);

    // 1. Dọn dẹp giỏ hàng cũ nếu có
    await page.goto(`${baseUrl}/cart`);
    await expect(page.getByRole('heading', { name: /Giỏ Hàng|Giỏ hàng của bạn đang trống/i })).toBeVisible({ timeout: 10000 });
    
    const deleteButtons = page.locator('tbody button:has-text("Xóa")');
    while (await deleteButtons.count() > 0) {
      await deleteButtons.first().click();
      await page.waitForTimeout(400);
    }

    // 2. Thêm sản phẩm mong muốn vào giỏ từ trang chủ
    await page.goto(`${baseUrl}/`);
    await expect(page.getByRole('heading', { name: 'Danh sách sản phẩm' })).toBeVisible({ timeout: 10000 });

    const addToCartBtn = page.locator(`div:has(> h2:has-text("${productName}")) button:has-text("Thêm vào giỏ")`);
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();
    await page.waitForTimeout(500);

    // 3. Vào Giỏ hàng kiểm tra sản phẩm đã được thêm vào bảng
    await page.getByRole('link', { name: 'Giỏ hàng' }).click();
    const productRow = page.locator('tbody tr').filter({ hasText: productName });
    await expect(productRow.first()).toBeVisible({ timeout: 10000 });

    // 4. Nhấn Tiến hành thanh toán để sang trang Checkout
    await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByPlaceholder('Nhập mã giảm giá...')).toBeVisible({ timeout: 10000 });
  }

  test(`${testCases.TC_FR09_001.caseId}: ${testCases.TC_FR09_001.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_001;
    await prepareCartAndGoToCheckout(page, data.productName);

    // Nhập mã giảm giá phần trăm SAVE10
    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern 1: Visibility & Coupon Status Banner Assertion
    await expect(page.getByText(/Áp dụng thành công/i)).toBeVisible({ timeout: 5000 });

    // Pattern 2: Numeric Discount & Total Amount Regex Assertion
    // ER: Tiết kiệm đúng 10% (50,000 ₫) và Thành tiền / Tổng thanh toán đúng bằng 450,000 ₫
    await expect(page.getByText(new RegExp(data.expectedDiscountText))).toBeVisible();
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_002.caseId}: ${testCases.TC_FR09_002.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_002;
    await prepareCartAndGoToCheckout(page, data.productName);

    // Nhập mã giảm giá cố định BIGBUY
    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern 3: Success Confirmation & Fixed Discount Math Assertion
    // ER: Mã BIGBUY áp dụng thành công cho đơn hàng 500,000 ₫ (đạt ngưỡng tối thiểu 500,000 ₫) và tổng còn 450,000 ₫
    await expect(page.getByText(/Áp dụng thành công/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_003.caseId}: ${testCases.TC_FR09_003.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_003;
    await prepareCartAndGoToCheckout(page, data.productName);

    // Nhập mã không tồn tại INVALID999
    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern 4: Negative Validation Error Message Assertion
    // ER: Hệ thống hiển thị thông báo lỗi mã không tồn tại và giữ nguyên tổng tiền 500,000 ₫
    await expect(page.getByText(new RegExp(data.expectedErrorMessage, 'i'))).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.originalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_004.caseId}: ${testCases.TC_FR09_004.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_004;
    await prepareCartAndGoToCheckout(page, data.productName);

    // Nhập mã bị vô hiệu hóa DISABLED10
    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern 5: Security / Status Restriction Assertion
    // ER: Hệ thống báo lỗi mã bị vô hiệu hóa hoặc không tồn tại, không áp dụng giảm giá
    await expect(page.getByText(new RegExp(data.expectedErrorMessage, 'i'))).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.originalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_005.caseId}: ${testCases.TC_FR09_005.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_005;
    await prepareCartAndGoToCheckout(page, data.productName);

    // Nhập mã đã hết hạn EXPIRED
    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern: Expiration Rule Assertion
    // ER: Hệ thống báo lỗi mã hết hạn, không giảm giá và giữ nguyên tổng tiền
    await expect(page.getByText(new RegExp(data.expectedErrorMessage, 'i'))).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.originalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_006.caseId}: ${testCases.TC_FR09_006.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_006;
    // Đơn hàng 100,000 ₫ (dưới ngưỡng 300,000 ₫ của SAVE10)
    await prepareCartAndGoToCheckout(page, data.productName);

    // Nhập mã SAVE10 cho đơn 100,000 ₫
    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern: Minimum Order Value Boundary Assertion
    // ER: Hệ thống báo lỗi chưa đạt giá trị tối thiểu, không giảm giá
    await expect(page.getByText(new RegExp(data.expectedErrorMessage, 'i'))).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.originalTotal}`))).toBeVisible();
  });

});
