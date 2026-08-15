import { test, expect } from '@playwright/test';

test.describe('FR-05: Xem danh sách & Tìm kiếm sản phẩm', () => {

  test('TC-FR05-001: Hiển thị mặc định danh sách sản phẩm khi vào trang chủ', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // ER 3: Trang chủ chỉ chứa duy nhất một thẻ <h1> mô tả trang chủ.
    await expect(page.locator('h1')).toHaveCount(1);

    // ER 1: Trang chủ hiển thị đầy đủ danh sách các sản phẩm mẫu dạng lưới (Grid).
    await expect(page.getByRole('heading', { name: 'iPhone 15 Pro Max', level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Samsung Galaxy S24 Ultra', level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'MacBook Pro M3', level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tai nghe AirPods Pro 2', level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bàn phím cơ Keychron Q1', level: 2 })).toBeVisible();

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
    
    // Đợi API search hoàn tất trước khi kiểm tra giao diện
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('products') && resp.status() === 200).catch(() => {}),
      page.locator('button:has-text("Tìm")').click(),
    ]);

    // ER 2: Từ khóa tìm kiếm hiển thị trên màn hình là "iPhone 15 Pro Max".
    await expect(page.getByText('Kết quả tìm kiếm cho: iPhone 15 Pro Max')).toBeVisible();

    // ER 1: Hệ thống chỉ hiển thị duy nhất sản phẩm "iPhone 15 Pro Max" trên lưới.
    await expect(page.getByRole('heading', { name: 'iPhone 15 Pro Max', level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Samsung Galaxy S24 Ultra', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'MacBook Pro M3', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tai nghe AirPods Pro 2', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bàn phím cơ Keychron Q1', level: 2 })).not.toBeVisible();
  });

  test('TC-FR05-004: Tìm kiếm khớp một phần tên sản phẩm', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.locator('input[placeholder="Tìm kiếm..."]').fill('S');
    
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('products') && resp.status() === 200).catch(() => {}),
      page.locator('button:has-text("Tìm")').click(),
    ]);

    // ER 1: Hệ thống hiển thị tất cả các sản phẩm có tên chứa chữ "S" hoặc "s".
    await expect(page.getByRole('heading', { name: 'Samsung Galaxy S24 Ultra', level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tai nghe AirPods Pro 2', level: 2 })).toBeVisible();

    // ER 2: Các sản phẩm khác không khớp sẽ bị ẩn đi.
    await expect(page.getByRole('heading', { name: 'iPhone 15 Pro Max', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'MacBook Pro M3', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bàn phím cơ Keychron Q1', level: 2 })).not.toBeVisible();
  });

  test('TC-FR05-005: Tìm kiếm sản phẩm không tồn tại (EC03)', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.locator('input[placeholder="Tìm kiếm..."]').fill('Nokia 1280');
    
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('products') && resp.status() === 200).catch(() => {}),
      page.locator('button:has-text("Tìm")').click(),
    ]);

    // ER 1: Hệ thống không hiển thị sản phẩm nào.
    await expect(page.getByRole('heading', { name: 'iPhone 15 Pro Max', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Samsung Galaxy S24 Ultra', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'MacBook Pro M3', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tai nghe AirPods Pro 2', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bàn phím cơ Keychron Q1', level: 2 })).not.toBeVisible();

    // ER 2: Hiển thị màn hình Empty State có icon/hình minh họa và message thân thiện phù hợp.
    await expect(page.getByText(/không tìm thấy|không có sản phẩm/i)).toBeVisible();
  });

  test('TC-FR05-006: Tự động cắt bỏ khoảng trắng thừa ở hai đầu từ khóa (EC04)', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.locator('input[placeholder="Tìm kiếm..."]').fill('   iPhone 15 Pro Max   ');
    
    // Đợi API search hoàn tất trước khi assert để tránh Race Condition (kiểm tra nhầm trạng thái DOM cũ của trang chủ)
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('products') && resp.status() === 200).catch(() => {}),
      page.locator('button:has-text("Tìm")').click(),
    ]);

    // Đợi dòng thông báo tìm kiếm cập nhật
    await expect(page.getByText(/Kết quả tìm kiếm cho:/)).toBeVisible();

    // ER 1: Hệ thống tự động bỏ khoảng trắng và tìm ra sản phẩm "iPhone 15 Pro Max" (thẻ h2 tiêu đề sản phẩm).
    await expect(page.getByRole('heading', { name: 'iPhone 15 Pro Max', level: 2 })).toBeVisible();

    // ER 2: Kết quả hiển thị đúng như khi tìm kiếm không có khoảng trắng thừa (các sản phẩm khác bị ẩn).
    await expect(page.getByRole('heading', { name: 'Samsung Galaxy S24 Ultra', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'MacBook Pro M3', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tai nghe AirPods Pro 2', level: 2 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bàn phím cơ Keychron Q1', level: 2 })).not.toBeVisible();
  });

  test('TC-FR05-007: Tìm kiếm với độ dài từ khóa cận biên trên hợp lệ (UB-1)', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const query254 = 'a'.repeat(254);
    await page.locator('input[placeholder="Tìm kiếm..."]').fill(query254);
    
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('products') && resp.status() === 200).catch(() => {}),
      page.locator('button:has-text("Tìm")').click(),
    ]);

    // ER 1: Hệ thống tiếp nhận chuỗi tìm kiếm mà không báo lỗi.
    await expect(page.getByText(`Kết quả tìm kiếm cho: ${query254}`)).toBeVisible();

    // ER 2: Trả về kết quả tìm kiếm Empty State.
    await expect(page.getByText(/không tìm thấy|không có sản phẩm/i)).toBeVisible();
  });

  test('TC-FR05-008: Tìm kiếm với độ dài từ khóa chạm biên trên hợp lệ (UB)', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const query255 = 'a'.repeat(255);
    await page.locator('input[placeholder="Tìm kiếm..."]').fill(query255);
    
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('products') && resp.status() === 200).catch(() => {}),
      page.locator('button:has-text("Tìm")').click(),
    ]);

    // ER 1: Hệ thống tiếp nhận chuỗi tìm kiếm bình thường.
    await expect(page.getByText(`Kết quả tìm kiếm cho: ${query255}`)).toBeVisible();

    // ER 2: Trả về kết quả tìm kiếm Empty State.
    await expect(page.getByText(/không tìm thấy|không có sản phẩm/i)).toBeVisible();
  });

});
