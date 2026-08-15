import { test, expect } from '@playwright/test';

test.describe('FR-05: Xem danh sách & Tìm kiếm sản phẩm', () => {

  test('TC-FR05-001: Hiển thị mặc định danh sách sản phẩm khi vào trang chủ', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // ER 3: Trang chủ chỉ chứa duy nhất một thẻ <h1> mô tả trang chủ.
    await expect(page.locator('h1')).toHaveCount(1);

    // ER 1: Trang chủ hiển thị đầy đủ danh sách các sản phẩm mẫu dạng lưới (Grid).
    await expect(page.locator('text=iPhone 15 Pro Max')).toBeVisible();
    await expect(page.locator('text=Samsung Galaxy S24 Ultra')).toBeVisible();
    await expect(page.locator('text=MacBook Pro M3')).toBeVisible();
    await expect(page.locator('text=Tai nghe AirPods Pro 2')).toBeVisible();
    await expect(page.locator('text=Bàn phím cơ Keychron Q1')).toBeVisible();

    // ER 2: Mỗi sản phẩm hiển thị đủ: Ảnh sản phẩm, Tên sản phẩm, Giá bán (định dạng VND với ký hiệu ₫, phân tách hàng nghìn, ví dụ: 30,000,000 ₫).
    await expect(page.getByText(/30,000,000 ₫/)).toBeVisible();
  });

  test('TC-FR05-002: Kiểm tra thuộc tính Alt của hình ảnh sản phẩm', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Chờ cho React render xong danh sách sản phẩm và thẻ <img> xuất hiện trên DOM
    await expect(page.locator('img').first()).toBeVisible();

    // ER: Thẻ hình ảnh <img> của sản phẩm phải chứa thuộc tính alt mô tả nội dung hình ảnh rõ ràng (không được để rỗng hoặc thiếu).
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt?.trim()).not.toBe('');
    }
  });

  test('TC-FR05-003: Tìm kiếm khớp hoàn toàn tên sản phẩm', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.locator('input[placeholder="Tìm kiếm..."]').fill('iPhone 15 Pro Max');
    await page.locator('button:has-text("Tìm")').click();

    // ER 2: Từ khóa tìm kiếm hiển thị trên màn hình là "iPhone 15 Pro Max".
    await expect(page.locator('text=iPhone 15 Pro Max').first()).toBeVisible();

    // ER 1: Hệ thống chỉ hiển thị duy nhất sản phẩm "iPhone 15 Pro Max" trên lưới.
    await expect(page.locator('text=Samsung Galaxy S24 Ultra')).not.toBeVisible();
    await expect(page.locator('text=MacBook Pro M3')).not.toBeVisible();
    await expect(page.locator('text=Tai nghe AirPods Pro 2')).not.toBeVisible();
    await expect(page.locator('text=Bàn phím cơ Keychron Q1')).not.toBeVisible();
  });

  test('TC-FR05-004: Tìm kiếm khớp một phần tên sản phẩm', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.locator('input[placeholder="Tìm kiếm..."]').fill('S');
    await page.locator('button:has-text("Tìm")').click();

    // ER 1: Hệ thống hiển thị tất cả các sản phẩm có tên chứa chữ "S" hoặc "s".
    await expect(page.locator('text=Samsung Galaxy S24 Ultra')).toBeVisible();
    await expect(page.locator('text=Tai nghe AirPods Pro 2')).toBeVisible();

    // ER 2: Các sản phẩm khác không khớp sẽ bị ẩn đi.
    await expect(page.locator('text=iPhone 15 Pro Max')).not.toBeVisible();
    await expect(page.locator('text=MacBook Pro M3')).not.toBeVisible();
    await expect(page.locator('text=Bàn phím cơ Keychron Q1')).not.toBeVisible();
  });

  test('TC-FR05-005: Tìm kiếm sản phẩm không tồn tại (EC03)', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.locator('input[placeholder="Tìm kiếm..."]').fill('Nokia 1280');
    await page.locator('button:has-text("Tìm")').click();

    // ER 1: Hệ thống không hiển thị sản phẩm nào.
    await expect(page.locator('text=iPhone 15 Pro Max')).not.toBeVisible();
    await expect(page.locator('text=Samsung Galaxy S24 Ultra')).not.toBeVisible();
    await expect(page.locator('text=MacBook Pro M3')).not.toBeVisible();
    await expect(page.locator('text=Tai nghe AirPods Pro 2')).not.toBeVisible();
    await expect(page.locator('text=Bàn phím cơ Keychron Q1')).not.toBeVisible();

    // ER 2: Hiển thị màn hình Empty State có icon/hình minh họa và message thân thiện phù hợp.
    await expect(page.getByText(/không tìm thấy|không có sản phẩm/i)).toBeVisible();
  });

  test('TC-FR05-006: Tự động cắt bỏ khoảng trắng thừa ở hai đầu từ khóa (EC04)', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.locator('input[placeholder="Tìm kiếm..."]').fill('   iPhone 15 Pro Max   ');
    await page.locator('button:has-text("Tìm")').click();

    // ER 1: Hệ thống tự động bỏ khoảng trắng và tìm ra sản phẩm "iPhone 15 Pro Max".
    await expect(page.locator('text=iPhone 15 Pro Max').first()).toBeVisible();

    // ER 2: Kết quả hiển thị đúng như khi tìm kiếm không có khoảng trắng thừa (các sản phẩm khác bị ẩn).
    await expect(page.locator('text=Samsung Galaxy S24 Ultra')).not.toBeVisible();
    await expect(page.locator('text=MacBook Pro M3')).not.toBeVisible();
  });

  test('TC-FR05-007: Tìm kiếm với độ dài từ khóa cận biên trên hợp lệ (UB-1)', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const query254 = 'a'.repeat(254);
    await page.locator('input[placeholder="Tìm kiếm..."]').fill(query254);
    await page.locator('button:has-text("Tìm")').click();

    // ER 1: Hệ thống tiếp nhận chuỗi tìm kiếm mà không báo lỗi.
    await expect(page.getByText(`Kết quả tìm kiếm cho: ${query254}`)).toBeVisible();

    // ER 2: Trả về kết quả tìm kiếm Empty State.
    await expect(page.getByText(/không tìm thấy|không có sản phẩm/i)).toBeVisible();
  });

  test('TC-FR05-008: Tìm kiếm với độ dài từ khóa chạm biên trên hợp lệ (UB)', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const query255 = 'a'.repeat(255);
    await page.locator('input[placeholder="Tìm kiếm..."]').fill(query255);
    await page.locator('button:has-text("Tìm")').click();

    // ER 1: Hệ thống tiếp nhận chuỗi tìm kiếm bình thường.
    await expect(page.getByText(`Kết quả tìm kiếm cho: ${query255}`)).toBeVisible();

    // ER 2: Trả về kết quả tìm kiếm Empty State.
    await expect(page.getByText(/không tìm thấy|không có sản phẩm/i)).toBeVisible();
  });

});
