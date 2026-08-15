# Báo cáo Kiểm định AI (AI Audit Report)

**Bài tập:** HW04 – Automation Testing  
**Họ và tên:** Nguyễn Minh Quang  
**Thời gian cập nhật:** 15-08-2026 11:38:14  

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
- **3. Verdict (Đánh giá):** **INVALID**
- **4. Reasoning (Lý do đánh giá):** Ở lượt này, AI chỉ trích xuất định dạng tóm tắt 6 cột cho bảng test cases thay vì giữ nguyên y chang 10 cột nguyên bản trong `hw02_report.md`. Người dùng đã yêu cầu copy chính xác y chang.
- **5. Student fix (Bản sửa đổi của sinh viên):** Yêu cầu AI copy chính xác y chang bảng 10 cột nguyên bản từ `hw02_report.md` (chuyển trạng thái Tác vụ 3 thành INVALID theo quy tắc phản biện).

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

---

## Tác vụ 6: Copy chính xác y chang bảng chi tiết test case 10 cột từ hw02_report.md vào Report.md

- **1. Prompt + tool (Câu lệnh + Công cụ):** `Copy bảng chi tiết test case giống y chang từ @[hw02_report.md]` | **Công cụ:** Gemini 3.6 Flash / `write_to_file` | **Timestamp:** `12-08-2026 16:46:45`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã copy chính xác 100% nguyên văn các bảng chi tiết test cases đầy đủ 10 cột (Function/Feature ID, Case ID, Test case name, Pre-requisites / Conditions, Test step, Expected Result (ER), Actual Result, Status, Tester, Tested Date) từ hw02_report.md sang Report.md cho cả 3 tính năng FR-05, FR-09, và FR-14.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã sao chép chính xác y chang toàn bộ các bảng test cases nguyên bản từ `hw02_report.md` với đầy đủ 10 cột thông tin chi tiết.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 7: Sử dụng Playwright MCP khám phá EShop ứng dụng trực tiếp và tạo file fr_05.spec.js

- **1. Prompt + tool (Câu lệnh + Công cụ):** `Use Playwright MCP to explore the live EShop application at: http://localhost:5173 ... create: file fr_05.spec.js` | **Công cụ:** Gemini 3.6 Flash / `playwright_mcp` | **Timestamp:** `12-08-2026 19:51:24`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Sử dụng công cụ Playwright MCP để khám phá trực tiếp trang web EShop tại http://localhost:5173 từng bước cho 4 test cases đầu của FR-05 và tạo file fr_05.spec.js.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã thực thi kịch bản trên trình duyệt bằng Playwright MCP và khởi tạo tệp script tự động hóa nháp cho 4 test cases.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 8: Rà soát và chuẩn hóa các câu lệnh expect trong script fr_05.spec.js theo đúng Kết quả mong đợi (ER)

- **1. Prompt + tool (Câu lệnh + Công cụ):** `kiểm tra lại các expect trong script phải đúng theo ER của test case` | **Công cụ:** Gemini 3.6 Flash / `write_to_file` | **Timestamp:** `12-08-2026 20:39:37`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã rà soát và cập nhật file fr_05.spec.js.
```
- **3. Verdict (Đánh giá):** **INVALID**
- **4. Reasoning (Lý do đánh giá):** Cú pháp `page.locator('text=/\\d{1,3}(,\\d{3})* ₫/').first()` sử dụng sai định dạng truyền Regex của Playwright làm phát sinh lỗi `element(s) not found`.
- **5. Student fix (Bản sửa đổi của sinh viên):** Sửa lại cú pháp chuẩn Playwright: `page.getByText(/30,000,000 ₫/)` và dùng các locator khuyến nghị `getByRole`, `getByPlaceholder`.

---

## Tác vụ 9: Sửa lỗi cú pháp locator Regex trong fr_05.spec.js bằng page.getByText(/30,000,000 ₫/)

- **1. Prompt + tool (Câu lệnh + Công cụ):** `Error: expect(locator).toBeVisible() failed ... locator('text=/\\d{1,3}(,\\d{3})* ₫/').first()` | **Công cụ:** Gemini 3.6 Flash / `write_to_file` | **Timestamp:** `12-08-2026 21:02:18`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã sửa đổi tệp fr_05.spec.js: Chuyển đổi câu lệnh locator sai cú pháp thành page.getByText(/30,000,000 ₫/) chuẩn của Playwright API.
```
- **3. Verdict (Đánh giá):** **INVALID**
- **4. Reasoning (Lý do đánh giá):** Do ứng dụng React render dữ liệu bất đồng bộ từ backend API, câu lệnh `page.locator('img').count()` chạy đồng bộ ngay sau `page.goto()` khi DOM chưa có thẻ `<img>`, dẫn tới `count()` luôn bằng `0`.
- **5. Student fix (Bản sửa đổi của sinh viên):** Bổ sung `await expect(page.locator('img').first()).toBeVisible()` trước khi đếm `count()`.

---

## Tác vụ 10: Xử lý đếm số lượng hình ảnh bất đồng bộ trong TC-FR05-002

- **1. Prompt + tool (Câu lệnh + Công cụ):** `nó có cái locator img luôn bằng 0` | **Công cụ:** Gemini 3.6 Flash / `write_to_file` | **Timestamp:** `12-08-2026 21:04:47`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Cập nhật tệp fr_05.spec.js: Bổ sung câu lệnh `await expect(page.locator('img').first()).toBeVisible()` để đảm bảo Playwright chờ React fetch API và render xong danh sách sản phẩm cùng các thẻ <img> lên DOM trước khi gọi `await images.count()`.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã xác định đúng nguyên nhân bất đồng bộ của React Single Page Application (SPA), thêm bước auto-wait cho thẻ `<img>` đầu tiên giúp `count()` đếm chính xác 5 hình ảnh sản phẩm.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 11: Giải thích và kiểm định kết quả báo lỗi của TC-FR05-002

- **1. Prompt + tool (Câu lệnh + Công cụ):** `Error: expect(received).not.toBe(expected) ... expect(alt?.trim()).not.toBe('') ... cái này là đúng mà đúng không` | **Công cụ:** Gemini 3.6 Flash | **Timestamp:** `12-08-2026 21:11:15`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Xác nhận câu lệnh expect(alt?.trim()).not.toBe('') trong script hoạt động hoàn toàn CHÍNH XÁC.
Việc assertion này bị thối (Fail) trên ứng dụng thực tế chứng minh test script đã phát hiện đúng lỗi (defect) của SUT (tất cả ảnh sản phẩm đều để thuộc tính alt="" rỗng), hoàn toàn khớp với Kết quả thực tế (Actual Result: Thuộc tính alt bị rỗng) và Trạng thái (Status: Fail) trong Báo cáo kiểm thử.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI giải thích đúng nguyên lý của Automation Testing: Mục tiêu của test script là kiểm tra theo Kết quả mong đợi (ER). Nếu SUT bị lỗi thực tế (bị rỗng `alt=""`), test script báo lỗi Fail là đúng mục đích phát hiện Defect của kiểm thử tự động.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 12: Bổ sung Mục 3: AI Gap Analysis vào Báo cáo chính Report.md

- **1. Prompt + tool (Câu lệnh + Công cụ):** `ghi lại nhưng gì tôi đã chỉnh sửa script vào một phần AI Gap Analysis vô @[Report.md]` | **Công cụ:** Gemini 3.6 Flash / `write_to_file` | **Timestamp:** `12-08-2026 21:17:54`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã bổ sung Mục 3: AI Gap Analysis (Đánh giá & Hiệu chỉnh Kịch bản Tự động của Sinh viên) vào Report.md bao gồm 4 điểm hạn chế/bỏ sót của AI kèm giải thích nguyên nhân và chi tiết các hiệu chỉnh của sinh viên.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã cập nhật đầy đủ, chi tiết và chính xác phần phân tích khoảng trống (AI Gap Analysis) theo đúng tiêu chí yêu cầu trong Mục 6 (Task 1) của đề bài HW04.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 13: Tạo Agent Skill cho luồng Tự động hóa Kiểm thử Playwright MCP (Mục 7 Đề bài HW04)

- **1. Prompt + tool (Câu lệnh + Công cụ):** `lấy đoạn promt tôi dùng để tạo script bên trên làm thành skill cho tôi` | **Công cụ:** Gemini 3.6 Flash / `write_to_file` | **Timestamp:** `15-08-2026 11:38:14`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Khởi tạo thành công Agent Skill mới tên là `playwright-mcp-automation` tại thư mục `.agents/skills/playwright-mcp-automation/SKILL.md` đóng gói toàn bộ quy trình prompt khám phá SUT bằng Playwright MCP, kiểm tra trạng thái DOM/Snapshot từng bước và tự động sinh mã test spec nháp (.spec.js) đạt tiêu chuẩn Mục 7 của đề bài HW04.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã đóng gói chính xác đoạn prompt mẫu thành một Agent Skill chuẩn có định dạng YAML frontmatter đầy đủ tên, mô tả và quy trình 4 bước hướng dẫn thực hiện, đáp ứng điểm thưởng Mục 7 (Agent Skill) của đề bài HW04.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.
