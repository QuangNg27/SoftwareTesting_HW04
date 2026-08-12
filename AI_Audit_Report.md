# Báo cáo Kiểm định AI (AI Audit Report)

**Bài tập:** HW04 – Automation Testing  
**Họ và tên:** Nguyễn Minh Quang  
**Thời gian cập nhật:** 12-08-2026 16:36:51  

---

## Tác vụ 1: Đọc đề bài HW04 & Tóm tắt Yêu cầu Kiểm thử

- **1. Prompt + tool (Câu lệnh + Công cụ):** `đọc qua đề bài trước @[2026.HW04.Automation Testing_En.pdf]` | **Công cụ:** Gemini 3.6 Flash / `view_file` | **Timestamp:** `12-08-2026 16:16:03`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Tôi đã đọc và tổng hợp đầy đủ nội dung bài tập HW04 – Automation Testing (HW04-AI) từ tệp 2026.HW04.Automation Testing_En.pdf.

1. Đối tượng kiểm thử (SUT)
Ứng dụng: EShop (E-commerce demo app) – Repository: https://github.com/ttbhanh/eshop-sut
Lựa chọn tính năng (3 tính năng web):
Pool A (Auth/Product): FR-01, FR-02, FR-03, FR-04, FR-05, FR-06.
Pool B (Cart/Checkout): FR-07, FR-08, FR-09, FR-10, FR-11.
Pool C (Admin): FR-12, FR-13, FR-14, FR-15, FR-16, FR-17, FR-18, FR-19.

2. Các Nhiệm vụ chính (Tasks)
Task 1 — AI-generated Automation Scripts (75/100 điểm):
- Tối thiểu 12 test cases cho mỗi tính năng.
- Data-driven testing (.csv/.json).
- Tối thiểu 3 assertion patterns.
- Multi-browser execution (>= 9 browser runs).
- HTML Report displaying "Run by: {StudentID}".
- Human review & fix.
- Bug report on GitHub Issues.
Task 2 — Demo Video (15/100 điểm): Video 5 phút tiếng Việt.
Agent Skill (10/100 điểm): Build Agent Skill cho automation workflow.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã đọc chính xác và đầy đủ toàn bộ nội dung PDF đề bài HW04, trích xuất chuẩn xác các yêu cầu về SUT, số lượng test cases, data-driven, multi-browser, báo cáo HTML và phụ lục AI Audit.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 2: Đọc báo cáo HW02 để xác định 3 tính năng Web và danh sách Test Cases

- **1. Prompt + tool (Câu lệnh + Công cụ):** `đọc @[hw02_report.md] để xem tính năng của tôi đã chọn và các test case đã thiết kế` | **Công cụ:** Gemini 3.6 Flash / `view_file` | **Timestamp:** `12-08-2026 16:18:23`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Dựa trên báo cáo hw02_report.md, đây là thông tin về 3 tính năng web thuộc 3 Pools A, B, C và danh sách test cases bạn đã thiết kế:

1. Các tính năng Web được chọn (Pools A, B, C):
- Pool A – FR-05: Xem danh sách & Tìm kiếm sản phẩm (13 Test Cases)
- Pool B – FR-09: Mã giảm giá (Coupon) (13 Test Cases)
- Pool C – FR-14: Quản lý Danh mục (Category CRUD) (11 Test Cases)

(Lưu ý: HW04 yêu cầu tối thiểu 12 test cases cho mỗi tính năng. Riêng FR-14 đang có 11 TCs, chúng ta có thể bổ sung thêm 1 test case TC-FR14-012).
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI phân tích đúng 3 tính năng web FR-05, FR-09, FR-14 từ file HW02, phát hiện chính xác FR-14 mới có 11 test cases và đề xuất bổ sung `TC-FR14-012` để đạt chuẩn $\ge 12$ test cases theo yêu cầu HW04.
- **5. Student fix (Bản sửa đổi của sinh viên):** Đã đồng ý bổ sung `TC-FR14-012` (Kiểm tra tự động cắt khoảng trắng 2 đầu khi nhập tên danh mục).

---

## Tác vụ 3: Cập nhật thông tin tính năng và test cases vào Report.md

- **1. Prompt + tool (Câu lệnh + Công cụ):** `trước tiên thì ghi thông tin về các feature kèm test case vào @[Report.md]` | **Công cụ:** Gemini 3.6 Flash / `write_to_file` | **Timestamp:** `12-08-2026 16:32:13`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã khởi tạo file Report.md chứa đầy đủ thông tin chung, mô tả 3 tính năng (FR-05, FR-09, FR-14) và bảng chi tiết 38 test cases (13 TCs cho FR-05, 13 TCs cho FR-09, và 12 TCs cho FR-14).
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã cập nhật đầy đủ, chuẩn xác cấu trúc báo cáo Markdown cho 38 test cases với các cột rõ ràng (Function ID, Case ID, Test Case Name, Pre-requisites, Test Steps, Expected Result).
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 4: Cập nhật thông tin Timestamp cho AI Audit Report

- **1. Prompt + tool (Câu lệnh + Công cụ):** `cập nhật AI Audit phải có timestamp` | **Công cụ:** Gemini 3.6 Flash / `write_to_file` | **Timestamp:** `12-08-2026 16:33:53`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã cập nhật file promt_log.md và AI_Audit_Report.md bổ sung thông tin Timestamp chính xác theo từng tác vụ giao tiếp.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã cập nhật lại toàn bộ tài liệu kiểm định AI, bổ sung trường Timestamp dạng `DD-MM-YYYY HH:MM:SS` cho từng tác vụ theo chuẩn skill ai-audit-prompt-log và yêu cầu đề bài.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 5: Cập nhật tài liệu Kỹ năng (Skill) quy định rõ bắt buộc Timestamp

- **1. Prompt + tool (Câu lệnh + Công cụ):** `cập nhật lại skill có timestamp` | **Công cụ:** Gemini 3.6 Flash / `write_to_file` | **Timestamp:** `12-08-2026 16:36:51`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã cập nhật tệp SKILL.md trong thư mục .agents/skills/ai_audit_prompt_log/SKILL.md bổ sung định dạng và quy định bắt buộc đính kèm Timestamp (DD-MM-YYYY HH:MM:SS) cho cả quy trình promt_log.md lẫn AI_Audit_Report.md.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã cập nhật chính xác file hướng dẫn kỹ năng `SKILL.md`, định nghĩa rõ quy chuẩn ghi nhận Timestamp trong quy trình làm việc với AI.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.
