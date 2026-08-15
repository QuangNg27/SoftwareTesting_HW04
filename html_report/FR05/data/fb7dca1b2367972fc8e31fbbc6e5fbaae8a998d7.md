# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr_05.spec.js >> FR-05: Xem danh sách & Tìm kiếm sản phẩm >> TC-FR05-002: Kiểm tra thuộc tính Alt của hình ảnh sản phẩm
- Location: tests\fr_05.spec.js:29:3

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "EShop" [ref=e5]:
      - /url: /
    - navigation [ref=e6]:
      - link "Giỏ hàng" [ref=e7]:
        - /url: /cart
      - link "Đăng nhập" [ref=e8]:
        - /url: /login
      - link "Đăng ký" [ref=e9]:
        - /url: /register
  - main [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e12]:
        - heading "Danh sách sản phẩm" [level=1] [ref=e13]
        - generic [ref=e14]:
          - textbox "Tìm kiếm..." [ref=e15]
          - button "Tìm" [ref=e16] [cursor=pointer]
      - generic [ref=e17]:
        - generic [ref=e18]:
          - heading "iPhone 15 Pro Max" [level=2] [ref=e19]
          - paragraph [ref=e20]: 30,000,000 VND
          - generic [ref=e21]:
            - link "Xem chi tiết" [ref=e22]:
              - /url: /product/1
            - button "Thêm vào giỏ" [ref=e23] [cursor=pointer]
        - generic [ref=e24]:
          - heading "Samsung Galaxy S24 Ultra" [level=2] [ref=e25]
          - paragraph [ref=e26]: 28,000,000 VND
          - generic [ref=e27]:
            - link "Xem chi tiết" [ref=e28]:
              - /url: /product/2
            - button "Thêm vào giỏ" [ref=e29] [cursor=pointer]
        - generic [ref=e30]:
          - heading "MacBook Pro M3" [level=2] [ref=e31]
          - paragraph [ref=e32]: 45,000,000 VND
          - generic [ref=e33]:
            - link "Xem chi tiết" [ref=e34]:
              - /url: /product/3
            - button "Thêm vào giỏ" [ref=e35] [cursor=pointer]
        - generic [ref=e36]:
          - heading "Tai nghe AirPods Pro 2" [level=2] [ref=e37]
          - paragraph [ref=e38]: 6,000,000 VND
          - generic [ref=e39]:
            - link "Xem chi tiết" [ref=e40]:
              - /url: /product/4
            - button "Thêm vào giỏ" [ref=e41] [cursor=pointer]
        - generic [ref=e42]:
          - heading "Bàn phím cơ Keychron Q1" [level=2] [ref=e43]
          - paragraph [ref=e44]: 4,000,000 VND
          - generic [ref=e45]:
            - link "Xem chi tiết" [ref=e46]:
              - /url: /product/5
            - button "Thêm vào giỏ" [ref=e47] [cursor=pointer]
      - heading "Hiển thị 5 sản phẩm" [level=1] [ref=e48]
  - contentinfo [ref=e49]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import fs from 'fs';
  3   | 
  4   | // Đọc dữ liệu kiểm thử từ tệp JSON tương thích tuyệt đối với mọi phiên bản Node.js/Playwright ESM
  5   | const testData = JSON.parse(
  6   |   fs.readFileSync(new URL('../data/fr05_search_data.json', import.meta.url), 'utf-8')
  7   | );
  8   | 
  9   | const { baseUrl, testCases } = testData;
  10  | 
  11  | test.describe(testData.feature, () => {
  12  | 
  13  |   test(`${testCases.TC_FR05_001.caseId}: ${testCases.TC_FR05_001.title}`, async ({ page }) => {
  14  |     const data = testCases.TC_FR05_001;
  15  |     await page.goto(baseUrl);
  16  | 
  17  |     // Pattern 1: Count Assertion (ER 3: Trang chủ chỉ chứa duy nhất một thẻ <h1>)
  18  |     await expect(page.locator('h1')).toHaveCount(data.expectedH1Count);
  19  | 
  20  |     // Pattern 2: Visibility Assertions for each expected product from dataset
  21  |     for (const productName of data.expectedProducts) {
  22  |       await expect(page.getByRole('heading', { name: productName, level: 2 })).toBeVisible();
  23  |     }
  24  | 
  25  |     // Pattern 3: RegExp Text Match Assertion
  26  |     await expect(page.getByText(new RegExp(data.expectedPricePattern))).toBeVisible();
  27  |   });
  28  | 
  29  |   test(`${testCases.TC_FR05_002.caseId}: ${testCases.TC_FR05_002.title}`, async ({ page }) => {
  30  |     const data = testCases.TC_FR05_002;
  31  |     await page.goto(baseUrl);
  32  | 
  33  |     // Chờ cho React render xong danh sách sản phẩm và thẻ <img> xuất hiện trên DOM
  34  |     await expect(page.locator('img').first()).toBeVisible();
  35  | 
  36  |     const images = page.locator('img');
  37  |     const count = await images.count();
  38  |     
  39  |     // Pattern 1: Comparison Assertion
  40  |     expect(count).toBeGreaterThanOrEqual(data.minImageCount);
  41  | 
  42  |     // Pattern 2: Attribute & String Assertions
  43  |     for (let i = 0; i < count; i++) {
  44  |       const alt = await images.nth(i).getAttribute('alt');
  45  |       expect(alt).not.toBeNull();
> 46  |       expect(alt?.trim()).not.toBe('');
      |                               ^ Error: expect(received).not.toBe(expected) // Object.is equality
  47  |     }
  48  |   });
  49  | 
  50  |   test(`${testCases.TC_FR05_003.caseId}: ${testCases.TC_FR05_003.title}`, async ({ page }) => {
  51  |     const data = testCases.TC_FR05_003;
  52  |     await page.goto(baseUrl);
  53  | 
  54  |     await page.locator('input[placeholder="Tìm kiếm..."]').fill(data.keyword);
  55  |     
  56  |     const [response] = await Promise.all([
  57  |       page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
  58  |       page.locator('button:has-text("Tìm")').click(),
  59  |     ]);
  60  |     await response.json();
  61  | 
  62  |     // Pattern 1: Text Search Label Visibility
  63  |     await expect(page.getByText(data.expectedSearchLabel)).toBeVisible();
  64  | 
  65  |     // Pattern 2: Expected Visible Product Assertions
  66  |     for (const name of data.expectedVisible) {
  67  |       await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
  68  |     }
  69  | 
  70  |     // Pattern 3: Expected Hidden Products Assertions
  71  |     for (const name of data.expectedHidden) {
  72  |       await expect(page.getByRole('heading', { name, level: 2 })).not.toBeVisible();
  73  |     }
  74  |   });
  75  | 
  76  |   test(`${testCases.TC_FR05_004.caseId}: ${testCases.TC_FR05_004.title}`, async ({ page }) => {
  77  |     const data = testCases.TC_FR05_004;
  78  |     await page.goto(baseUrl);
  79  | 
  80  |     await page.locator('input[placeholder="Tìm kiếm..."]').fill(data.keyword);
  81  |     
  82  |     const [response] = await Promise.all([
  83  |       page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
  84  |       page.locator('button:has-text("Tìm")').click(),
  85  |     ]);
  86  |     await response.json();
  87  | 
  88  |     await expect(page.getByText(`Kết quả tìm kiếm cho: ${data.keyword}`)).toBeVisible();
  89  | 
  90  |     for (const name of data.expectedVisible) {
  91  |       await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
  92  |     }
  93  | 
  94  |     for (const name of data.expectedHidden) {
  95  |       await expect(page.getByRole('heading', { name, level: 2 })).not.toBeVisible();
  96  |     }
  97  |   });
  98  | 
  99  |   test(`${testCases.TC_FR05_005.caseId}: ${testCases.TC_FR05_005.title}`, async ({ page }) => {
  100 |     const data = testCases.TC_FR05_005;
  101 |     await page.goto(baseUrl);
  102 | 
  103 |     await page.locator('input[placeholder="Tìm kiếm..."]').fill(data.keyword);
  104 |     
  105 |     const [response] = await Promise.all([
  106 |       page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
  107 |       page.locator('button:has-text("Tìm")').click(),
  108 |     ]);
  109 |     await response.json();
  110 | 
  111 |     await expect(page.getByText(`Kết quả tìm kiếm cho: ${data.keyword}`)).toBeVisible();
  112 | 
  113 |     for (const name of data.expectedHidden) {
  114 |       await expect(page.getByRole('heading', { name, level: 2 })).not.toBeVisible();
  115 |     }
  116 | 
  117 |     // Pattern: Regex Match for Empty State
  118 |     await expect(page.getByText(new RegExp(data.emptyStatePattern, 'i'))).toBeVisible();
  119 |   });
  120 | 
  121 |   test(`${testCases.TC_FR05_006.caseId}: ${testCases.TC_FR05_006.title}`, async ({ page }) => {
  122 |     const data = testCases.TC_FR05_006;
  123 |     await page.goto(baseUrl);
  124 | 
  125 |     await page.locator('input[placeholder="Tìm kiếm..."]').fill(data.rawKeyword);
  126 |     
  127 |     // Đợi chính xác response body hoàn tất để đồng bộ hóa tuyệt đối trạng thái render DOM trên mọi browser engine (tránh WebKit Race Condition)
  128 |     const [response] = await Promise.all([
  129 |       page.waitForResponse(resp => resp.url().includes('/api/products?search=') && resp.status() === 200),
  130 |       page.locator('button:has-text("Tìm")').click(),
  131 |     ]);
  132 |     await response.json();
  133 | 
  134 |     // Đợi dòng thông báo tìm kiếm cập nhật
  135 |     await expect(page.getByText(/Kết quả tìm kiếm cho:/)).toBeVisible();
  136 | 
  137 |     // ER 1: Hệ thống tự động bỏ khoảng trắng và tìm ra sản phẩm "iPhone 15 Pro Max" (thẻ h2 tiêu đề sản phẩm).
  138 |     await expect(page.getByRole('heading', { name: data.trimmedProduct, level: 2 })).toBeVisible();
  139 | 
  140 |     // ER 2: Kết quả hiển thị đúng như khi tìm kiếm không có khoảng trắng thừa (các sản phẩm khác bị ẩn).
  141 |     for (const name of data.expectedHidden) {
  142 |       await expect(page.getByRole('heading', { name, level: 2 })).not.toBeVisible();
  143 |     }
  144 |   });
  145 | 
  146 |   test(`${testCases.TC_FR05_007.caseId}: ${testCases.TC_FR05_007.title}`, async ({ page }) => {
```