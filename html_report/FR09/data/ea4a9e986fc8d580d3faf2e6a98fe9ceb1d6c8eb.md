# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr_09.spec.js >> FR-09: Mã Giảm Giá (Coupon) >> TC-FR09-013: Áp dụng được mã giảm giá khi đã đăng xuất
- Location: test\fr_09.spec.js:289:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Đăng Nhập|Đăng Ký/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /Đăng Nhập|Đăng Ký/i })

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Xác Nhận Đơn Hàng" [level=2]
  - heading "Sản phẩm:" [level=3]
  - list:
    - listitem: Tai nghe Gaming Havit H2002D x 1 — 500,000 ₫
  - text: "Tổng tiền thanh toán (VND):"
  - spinbutton: "500000"
  - text: Mã Giảm Giá
  - textbox "Nhập mã giảm giá...": SAVE10
  - button "Áp dụng"
  - paragraph: ✅ Áp dụng thành công! Giảm 10%
  - paragraph:
    - text: "Tiết kiệm:"
    - strong: "-4,500,000 ₫"
  - paragraph:
    - text: "Thành tiền:"
    - strong: 5,000,000 ₫
  - text: "Tổng thanh toán: 5,000,000 ₫"
  - button "Xác Nhận Thanh Toán"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  207 |     const productRow = page.locator('tbody tr').filter({ hasText: data.productName });
  208 |     await expect(productRow.first()).toBeVisible({ timeout: 10000 });
  209 | 
  210 |     // 5. Bắt sự kiện Dialog Alert hiển thị yêu cầu đăng nhập
  211 |     let dialogMessage = '';
  212 |     let dialogTriggered = false;
  213 |     page.once('dialog', async (dialog) => {
  214 |       dialogTriggered = true;
  215 |       dialogMessage = dialog.message();
  216 |       await dialog.accept();
  217 |     });
  218 | 
  219 |     // 6. Nhấn "Tiến hành thanh toán"
  220 |     await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
  221 | 
  222 |     // Pattern: Dialog Alert & Login Navigation Assertion
  223 |     // ER: Hệ thống bật alert yêu cầu đăng nhập ("Bạn cần đăng nhập để thanh toán!") và chuyển hướng về trang Login
  224 |     await expect.poll(() => dialogTriggered, { timeout: 5000 }).toBe(true);
  225 |     expect(dialogMessage).toMatch(new RegExp(data.expectedAlertMessage || 'đăng nhập', 'i'));
  226 |     await expect(page.getByRole('heading', { name: /Đăng Nhập|Đăng Ký/i })).toBeVisible({ timeout: 5000 });
  227 |   });
  228 | 
  229 |   test(`${testCases.TC_FR09_009.caseId}: ${testCases.TC_FR09_009.title}`, async ({ page }) => {
  230 |     const data = testCases.TC_FR09_009;
  231 |     await prepareCartAndGoToCheckout(page, data.productName);
  232 |     await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });
  233 | 
  234 |     const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
  235 |     await couponInput.fill(data.couponCode);
  236 |     await page.getByRole('button', { name: 'Áp dụng' }).click();
  237 | 
  238 |     // ER: Hệ thống hiển thị thông báo lỗi giới hạn lượt sử dụng hoặc không hợp lệ, không giảm giá
  239 |     await expect(page.getByText(new RegExp(data.expectedErrorMessage, 'i'))).toBeVisible({ timeout: 5000 });
  240 |     await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.originalTotal}`))).toBeVisible();
  241 |   });
  242 | 
  243 |   test(`${testCases.TC_FR09_010.caseId}: ${testCases.TC_FR09_010.title}`, async ({ page }) => {
  244 |     const data = testCases.TC_FR09_010;
  245 |     // Đơn hàng 4,000,000 ₫ với mã VIP100
  246 |     await prepareCartAndGoToCheckout(page, data.productName);
  247 |     await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });
  248 | 
  249 |     const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
  250 |     await couponInput.fill(data.couponCode);
  251 |     await page.getByRole('button', { name: 'Áp dụng' }).click();
  252 | 
  253 |     // ER: Áp dụng thành công, giảm 100,000 ₫, tổng thanh toán là 3,900,000 ₫
  254 |     await expect(page.getByText(/Áp dụng thành công/i)).toBeVisible({ timeout: 5000 });
  255 |     await expect(page.locator('strong').filter({ hasText: data.expectedDiscountText })).toBeVisible();
  256 |     await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible();
  257 |   });
  258 | 
  259 |   test(`${testCases.TC_FR09_011.caseId}: ${testCases.TC_FR09_011.title}`, async ({ page }) => {
  260 |     const data = testCases.TC_FR09_011;
  261 |     // Đơn hàng 300,000 ₫ với mã giảm cố định 400,000 ₫ (SUPERFIX)
  262 |     await prepareCartAndGoToCheckout(page, data.productName);
  263 |     await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });
  264 | 
  265 |     const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
  266 |     await couponInput.fill(data.couponCode);
  267 |     await page.getByRole('button', { name: 'Áp dụng' }).click();
  268 | 
  269 |     // ER: Hệ thống chặn không cho tổng tiền âm, số tiền thanh toán hiển thị là 0 ₫
  270 |     await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible({ timeout: 5000 });
  271 |   });
  272 | 
  273 |   test(`${testCases.TC_FR09_012.caseId}: ${testCases.TC_FR09_012.title}`, async ({ page }) => {
  274 |     const data = testCases.TC_FR09_012;
  275 |     // Nhập mã "  VIP100  " có khoảng trắng đầu và cuối
  276 |     await prepareCartAndGoToCheckout(page, data.productName);
  277 |     await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });
  278 | 
  279 |     const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
  280 |     await couponInput.fill(data.couponCodeWithSpaces);
  281 |     await page.getByRole('button', { name: 'Áp dụng' }).click();
  282 | 
  283 |     // ER: Hệ thống tự động cắt tỉa khoảng trắng và áp dụng thành công
  284 |     await expect(page.getByText(/Áp dụng thành công/i)).toBeVisible({ timeout: 5000 });
  285 |     await expect(page.locator('strong').filter({ hasText: data.expectedDiscountText })).toBeVisible();
  286 |     await expect(page.getByText(new RegExp(`Tổng thanh toán:\\s*${data.expectedFinalTotal}`))).toBeVisible();
  287 |   });
  288 | 
  289 |   test(`${testCases.TC_FR09_013.caseId}: ${testCases.TC_FR09_013.title}`, async ({ page }) => {
  290 |     const data = testCases.TC_FR09_013;
  291 |     // 1. Đăng nhập và chuyển tới Checkout
  292 |     await prepareCartAndGoToCheckout(page, data.productName);
  293 |     await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible({ timeout: 10000 });
  294 | 
  295 |     // 2. Bấm Thoát (Đăng xuất) khi đang ở trang Checkout
  296 |     await page.getByRole('button', { name: 'Thoát' }).click();
  297 |     await page.waitForTimeout(500);
  298 | 
  299 |     // 3. Cố gắng nhập mã giảm giá khi đã đăng xuất
  300 |     const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
  301 |     if (await couponInput.isVisible().catch(() => false)) {
  302 |       await couponInput.fill(data.couponCode);
  303 |       await page.getByRole('button', { name: 'Áp dụng' }).click();
  304 |     }
  305 | 
  306 |     // ER: Hệ thống yêu cầu đăng nhập trước khi checkout / không cho phép áp dụng giảm giá khi đã đăng xuất
> 307 |     await expect(page.getByRole('heading', { name: /Đăng Nhập|Đăng Ký/i })).toBeVisible({ timeout: 5000 });
      |                                                                             ^ Error: expect(locator).toBeVisible() failed
  308 |   });
  309 | 
  310 | });
  311 | 
```