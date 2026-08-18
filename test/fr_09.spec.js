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

  // Helper đăng xuất người dùng
  async function ensureLoggedOut(page) {
    await page.goto(`${baseUrl}/`);
    const logoutBtn = page.getByRole('button', { name: 'Thoát' });
    if (await logoutBtn.isVisible().catch(() => false)) {
      await logoutBtn.click();
      await expect(page.getByRole('link', { name: 'Đăng nhập' })).toBeVisible({ timeout: 5000 });
    }
  }

  // Helper chuẩn bị giỏ hàng với sản phẩm tương ứng và chuyển tới trang Checkout
  async function prepareCartAndGoToCheckout(page, productName, isLoggedIn = true) {
    if (isLoggedIn) {
      await ensureLoggedIn(page);
    } else {
      await ensureLoggedOut(page);
    }

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

    // 4. Nhấn Tiến hành thanh toán
    await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
  }

  test(`${testCases.TC_FR09_001.caseId}: ${testCases.TC_FR09_001.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_001;
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern 1: Visibility & Coupon Status Banner Assertion
    await expect(page.getByText(/Áp dụng thành công/i)).toBeVisible({ timeout: 5000 });

    // Pattern 2: Numeric Discount & Total Amount Regex Assertion
    // ER: Tiết kiệm đúng 10% (50,000 ₫) và Tổng thanh toán đúng bằng 450,000 ₫
    await expect(page.locator('strong').filter({ hasText: data.expectedDiscountText })).toBeVisible();
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_002.caseId}: ${testCases.TC_FR09_002.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_002;
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern 3: Success Confirmation & Fixed Discount Math Assertion
    // ER: Mã BIGBUY áp dụng thành công cho đơn hàng 500,000 ₫ và tổng còn 450,000 ₫
    await expect(page.getByText(/Áp dụng thành công/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_003.caseId}: ${testCases.TC_FR09_003.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_003;
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern 4: Negative Validation Error Message Assertion
    // ER: Báo lỗi mã không tồn tại và giữ nguyên tổng tiền 500,000 ₫
    await expect(page.getByText(new RegExp(data.expectedErrorMessage, 'i'))).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.originalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_004.caseId}: ${testCases.TC_FR09_004.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_004;
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern 5: Security / Status Restriction Assertion
    // ER: Báo lỗi mã bị vô hiệu hóa hoặc không tồn tại, giữ nguyên tổng tiền
    await expect(page.getByText(new RegExp(data.expectedErrorMessage, 'i'))).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.originalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_005.caseId}: ${testCases.TC_FR09_005.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_005;
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern: Expiration Rule Assertion
    // ER: Báo lỗi mã hết hạn, giữ nguyên tổng tiền
    await expect(page.getByText(new RegExp(data.expectedErrorMessage, 'i'))).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.originalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_006.caseId}: ${testCases.TC_FR09_006.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_006;
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // Pattern: Minimum Order Value Boundary Assertion
    // ER: Báo lỗi chưa đạt giá trị tối thiểu, không giảm giá
    await expect(page.getByText(new RegExp(data.expectedErrorMessage, 'i'))).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.originalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_007.caseId}: ${testCases.TC_FR09_007.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_007;
    // Đơn hàng vừa bằng 300,000 ₫ (vừa bằng ngưỡng tối thiểu của SAVE10)
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // ER: Mã SAVE10 được áp dụng thành công cho đơn 300,000 ₫ (giảm 30,000 ₫, tổng còn 270,000 ₫)
    await expect(page.getByText(/Áp dụng thành công/i)).toBeVisible({ timeout: 5000 });
    await expect(page.locator('strong').filter({ hasText: data.expectedDiscountText })).toBeVisible();
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_008.caseId}: ${testCases.TC_FR09_008.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_008;
    
    // 1. Đảm bảo chưa đăng nhập (khách vãng lai)
    await ensureLoggedOut(page);

    // 2. Dọn dẹp giỏ hàng cũ nếu có
    await page.goto(`${baseUrl}/cart`);
    await expect(page.getByRole('heading', { name: /Giỏ Hàng|Giỏ hàng của bạn đang trống/i })).toBeVisible({ timeout: 10000 });
    const deleteButtons = page.locator('tbody button:has-text("Xóa")');
    while (await deleteButtons.count() > 0) {
      await deleteButtons.first().click();
      await page.waitForTimeout(400);
    }

    // 3. Thêm sản phẩm mong muốn vào giỏ từ trang chủ
    await page.goto(`${baseUrl}/`);
    await expect(page.getByRole('heading', { name: 'Danh sách sản phẩm' })).toBeVisible({ timeout: 10000 });
    const addToCartBtn = page.locator(`div:has(> h2:has-text("${data.productName}")) button:has-text("Thêm vào giỏ")`);
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();
    await page.waitForTimeout(500);

    // 4. Vào Giỏ hàng kiểm tra sản phẩm đã được thêm vào bảng
    await page.getByRole('link', { name: 'Giỏ hàng' }).click();
    const productRow = page.locator('tbody tr').filter({ hasText: data.productName });
    await expect(productRow.first()).toBeVisible({ timeout: 10000 });

    // 5. Bắt sự kiện Dialog Alert hiển thị yêu cầu đăng nhập
    let dialogMessage = '';
    let dialogTriggered = false;
    page.once('dialog', async (dialog) => {
      dialogTriggered = true;
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    // 6. Nhấn "Tiến hành thanh toán"
    await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();

    // Pattern: Dialog Alert & Login Navigation Assertion
    // ER: Hệ thống bật alert yêu cầu đăng nhập ("Bạn cần đăng nhập để thanh toán!") và chuyển hướng về trang Login
    await expect.poll(() => dialogTriggered, { timeout: 5000 }).toBe(true);
    expect(dialogMessage).toMatch(new RegExp(data.expectedAlertMessage || 'đăng nhập', 'i'));
    await expect(page.getByRole('heading', { name: /Đăng Nhập|Đăng Ký/i })).toBeVisible({ timeout: 5000 });
  });

  test(`${testCases.TC_FR09_009.caseId}: ${testCases.TC_FR09_009.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_009;
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // ER: Hệ thống hiển thị thông báo lỗi giới hạn lượt sử dụng hoặc không hợp lệ, không giảm giá
    await expect(page.getByText(new RegExp(data.expectedErrorMessage, 'i'))).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.originalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_010.caseId}: ${testCases.TC_FR09_010.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_010;
    // Đơn hàng 4,000,000 ₫ với mã VIP100
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // ER: Áp dụng thành công, giảm 100,000 ₫, tổng thanh toán là 3,900,000 ₫
    await expect(page.getByText(/Áp dụng thành công/i)).toBeVisible({ timeout: 5000 });
    await expect(page.locator('strong').filter({ hasText: data.expectedDiscountText })).toBeVisible();
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_011.caseId}: ${testCases.TC_FR09_011.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_011;
    // Đơn hàng 300,000 ₫ với mã giảm cố định 400,000 ₫ (SUPERFIX)
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCode);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // ER: Hệ thống chặn không cho tổng tiền âm, số tiền thanh toán hiển thị là 0 ₫
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible({ timeout: 5000 });
  });

  test(`${testCases.TC_FR09_012.caseId}: ${testCases.TC_FR09_012.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_012;
    // Nhập mã "  VIP100  " có khoảng trắng đầu và cuối
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    await couponInput.fill(data.couponCodeWithSpaces);
    await page.getByRole('button', { name: 'Áp dụng' }).click();

    // ER: Hệ thống tự động cắt tỉa khoảng trắng và áp dụng thành công
    await expect(page.getByText(/Áp dụng thành công/i)).toBeVisible({ timeout: 5000 });
    await expect(page.locator('strong').filter({ hasText: data.expectedDiscountText })).toBeVisible();
    await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible();
  });

  test(`${testCases.TC_FR09_013.caseId}: ${testCases.TC_FR09_013.title}`, async ({ page }) => {
    const data = testCases.TC_FR09_013;
    // 1. Đăng nhập và chuyển tới Checkout
    await prepareCartAndGoToCheckout(page, data.productName);
    await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });

    // 2. Bấm Thoát (Đăng xuất) khi đang ở trang Checkout
    await page.getByRole('button', { name: 'Thoát' }).click();
    await page.waitForTimeout(500);

    // 3. Bắt sự kiện Dialog Alert hiển thị yêu cầu đăng nhập
    let dialogMessage = '';
    let dialogTriggered = false;
    page.once('dialog', async (dialog) => {
      dialogTriggered = true;
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    // 4. Cố gắng nhập mã giảm giá khi đã đăng xuất và bấm "Áp dụng"
    const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    if (await couponInput.isVisible().catch(() => false)) {
      await couponInput.fill(data.couponCode);
      await page.getByRole('button', { name: 'Áp dụng' }).click();
    }

    // Pattern: Dialog Alert & Security/Auth Restriction Assertion
    // ER: Hệ thống phải bật alert yêu cầu đăng nhập ("Bạn cần đăng nhập để thanh toán!") và chuyển hướng về trang Login
    await expect.poll(() => dialogTriggered, { timeout: 5000 }).toBe(true);
    expect(dialogMessage).toMatch(new RegExp(data.expectedAlertMessage || 'đăng nhập', 'i'));
    await expect(page.getByRole('heading', { name: /Đăng Nhập|Đăng Ký/i })).toBeVisible({ timeout: 5000 });
  });

});
