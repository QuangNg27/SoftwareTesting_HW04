# AI Critique — Reflection on Human-AI Collaboration

Suốt quá trình tự động hóa kiểm thử, AI bộc lộ rõ **Thiên vị Kịch bản Tích cực (Happy Path Bias)**, **xử lý bất đồng bộ thiếu ổn định**, và **bỏ sót khẳng định phủ định**. Ở FR-05 (`TC-FR05-006`), AI dùng selector chuỗi con lỏng lẻo (`text=...`) bắt nhầm tiêu đề tìm kiếm thay vì thẻ sản phẩm, gây False Positive trên SUT lỗi. Ở FR-14 (`TC-FR14-005`), AI thực thi `not.toBeVisible()` ngay 0ms sau submit khi backend chưa kịp phản hồi, che giấu lỗi vi phạm biên 256 ký tự. Ở FR-09, AI bỏ sót alert native (`window.alert`) khi chưa đăng nhập và liên tục vi phạm strict-mode do không cô lập phần tử giá tiền.

Nguyên nhân thất bại bắt nguồn từ bản chất LLM: AI sinh mã theo cú pháp tĩnh thay vì thấu hiểu vòng đời động của Single Page Application (SPA). Mô hình thiếu nhận thức về độ trễ mạng, hydration lag của React, lập lịch microtask giữa các engine (WebKit vs Chromium), và tính chặn luồng của sự kiện trình duyệt, dẫn đến xu hướng tạo kịch bản pass hời hợt hơn là bắt lỗi hệ thống.

Bài học cốt lõi là: **AI chỉ là công cụ tăng tốc tạo khung mã, không phải oracle kiểm thử độc lập**. Tester phải duy trì phản biện nghiêm ngặt, dùng semantic locator theo vai trò (role), đồng bộ hóa mạng trước khi assert, và đảm bảo kịch bản phản ánh trung thực defect thực tế của SUT.
