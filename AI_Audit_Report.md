# Báo cáo Kiểm định AI (AI Audit Report)

**Bài tập:** HW04 – Automation Testing  
**Họ và tên:** Nguyễn Minh Quang  
**MSSV:** 23127462  
**Thời gian cập nhật:** 15-08-2026 21:27:57  

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
- HTML Report hiển thị "Run by: {StudentID}".
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

---

## Tác vụ 14: Sinh kịch bản kiểm thử cho 4 test cases tiếp theo (TC-FR05-005 đến TC-FR05-008) bằng Playwright MCP

- **1. Prompt + tool (Câu lệnh + Công cụ):** `generate script cho 4 test case tiếp theo của FR05` | **Công cụ:** Gemini 3.7 Flash / `playwright_mcp`, `write_to_file` | **Timestamp:** `15-08-2026 11:40:43`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Thực hiện khám phá tương tác thực tế qua Playwright MCP và cập nhật file test/fr_05.spec.js bổ sung 4 test cases tiếp theo của FR-05.
```
- **3. Verdict (Đánh giá):** **INVALID**
- **4. Reasoning (Lý do đánh giá):** Trong `TC-FR05-006`, AI sử dụng selector lỏng lẻo `page.locator('text=iPhone 15 Pro Max').first()` vô tình bắt trúng dòng chữ tiêu đề `"Kết quả tìm kiếm cho:    iPhone 15 Pro Max   "` khiến kịch bản bị đánh giá Pass (False Positive) dù thực tế SUT không hiển thị sản phẩm nào do lỗi không trim khoảng trắng.
- **5. Student fix (Bản sửa đổi của sinh viên):** Sinh viên phát hiện và yêu cầu sửa selector sang dạng thẻ tiêu đề sản phẩm `page.getByRole('heading', { name: 'iPhone 15 Pro Max', level: 2 })` để phản ánh đúng lỗi Fail của SUT.

---

## Tác vụ 15: Sửa lỗi False Positive cho TC-FR05-006 bằng thẻ heading level 2

- **1. Prompt + tool (Câu lệnh + Công cụ):** `test script cho TC FR05 006 bị sai kết quả rồi để khoảng trắng là nó trong có kết quả đâu` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 11:52:44`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã sửa lỗi selector trong TC-FR05-006 từ `text=iPhone 15 Pro Max` sang `page.getByRole('heading', { name: 'iPhone 15 Pro Max', level: 2 })` (thẻ h2 tiêu đề sản phẩm) và bổ sung Mục 3.5 trong Report.md. Khi chạy trên SUT thực tế (bị lỗi không trim khoảng trắng), script sẽ báo Fail một cách chính xác do không tìm thấy thẻ h2 của sản phẩm.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã xác định đúng nguyên nhân bắt nhầm chuỗi con (Substring Matching) trong dòng kết quả tìm kiếm, chuyển đổi sang selector chuẩn semantic heading level 2 để test script bắt đúng lỗi thực tế của SUT.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 16: Phân tích và Xử lý Race Condition trên WebKit (Multi-browser Testing)

- **1. Prompt + tool (Câu lệnh + Công cụ):** `sao ở webkit thì nó lại pass TC 006` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 12:01:47`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Giải thích chi tiết nguyên nhân hiện tượng Race Condition trên WebKit: Khi bấm Tìm, WebKit đánh giá câu lệnh expect(heading 'iPhone 15 Pro Max').toBeVisible() ngay lập tức khi DOM của trang chủ cũ vẫn còn sản phẩm (chưa kịp nhận API response). Đến khi chuyển sang các lệnh not.toBeVisible() tiếp theo thì API đã trả về làm danh sách trống, dẫn đến toàn bộ assertion Pass sai lệch. Đã khắc phục bằng `Promise.all([page.waitForResponse(...), page.locator('button:has-text("Tìm")').click()])` và bổ sung Mục 3.6 vào Report.md.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã phân tích chính xác hiện tượng Stale State & Race Condition do chênh lệch lập lịch microtask/network giữa engine WebKit và Chromium trong kiểm thử đa trình duyệt (Multi-Browser Execution), đồng thời áp dụng giải pháp đồng bộ mạng `waitForResponse` chuẩn của Playwright.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 17: Sinh kịch bản kiểm thử cho toàn bộ các test case còn lại của FR-05 và cập nhật Báo cáo Khả năng Tự động hóa

- **1. Prompt + tool (Câu lệnh + Công cụ):** `generate tiếp cho các test case còn lại của FR05, test case nào không tạo script được thì note lại vào @[Report.md]` | **Công cụ:** Gemini 3.7 Flash / `playwright_mcp`, `write_to_file` | **Timestamp:** `15-08-2026 12:14:18`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã hoàn thành sinh mã kiểm thử tự động cho toàn bộ 13/13 test cases của tính năng FR-05 trong tệp test/fr_05.spec.js (bao gồm TC-FR05-009 đến TC-FR05-013 về biên 256 ký tự, bảo mật XSS, bảo mật SQLi, Loading state với network throttling và Tab Order accessibility). Đồng thời cập nhật Mục 4: Báo cáo Khả năng Tự động hóa Test Case vào Report.md xác nhận 100% test cases của FR-05 đều tự động hóa được.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã khám phá các tương tác bảo mật (XSS dialog listener, SQLi response) và trợ năng (Tab keyboard events, Loading route intercept) để tự động hóa toàn bộ 13 test cases một cách chính xác, bám sát các kỹ thuật nâng cao của Playwright Test.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 18: Phân tích & Hiệu chỉnh Lỗi Tab Navigation trên WebKit Engine cho TC-FR05-013

- **1. Prompt + tool (Câu lệnh + Công cụ):** `test case 13 trên webkit bị lỗi: Error: expect(locator).toBeFocused() failed ... Locator: getByRole('link', { name: 'EShop' }) ... Expected: focused ... Received: inactive` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 15:12:23`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Phân tích nguyên nhân đặc thù của WebKit/Safari: Mặc định trên WebKit/macOS, phím Tab bỏ qua các thẻ <a> thuần không có tabindex và nhảy thẳng vào các Form Controls (<input>, <button>). Đã cập nhật TC-FR05-013 trong test/fr_05.spec.js với cơ chế phân nhánh `browserName === 'webkit'` và bổ sung Mục 3.7 vào Report.md.
```
- **3. Verdict (Đánh giá):** **INVALID**
- **4. Reasoning (Lý do đánh giá):** Trên nhân WebKit Port chạy headless ở môi trường Windows/Linux, engine WebKit không hề hỗ trợ chuyển focus mô phỏng bằng phím Tab (Synthetic Tab Key Progression) cho bất kỳ phần tử nào (kể cả input), dẫn tới việc phân nhánh trên WebKit vẫn bị fail `Received: inactive`.
- **5. Student fix (Bản sửa đổi của sinh viên):** Áp dụng chuẩn `test.skip(browserName === 'webkit', ...)` theo đúng khuyến nghị chính thức của Playwright cho WebKit headless engine.

---

## Tác vụ 19: Giải thích kết quả kiểm định XSS trong TC-FR05-010 (Received: true vs Expected: false)

- **1. Prompt + tool (Câu lệnh + Công cụ):** `ở script dành cho TC 010 thì expect(dialogTriggered).toBe(false); là nó bị timeout nhưng nó vẫn để received là true thì có đúng không` | **Công cụ:** Gemini 3.7 Flash | **Timestamp:** `15-08-2026 15:16:47`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Giải thích rõ ràng: Kết quả `Received: true` là HOÀN TOÀN CHÍNH XÁC. Điều này chứng minh Playwright đã bắt trúng lỗ hổng bảo mật XSS thực tế của ứng dụng SUT (ứng dụng bị dính mã độc và thực thi popup alert('XSS') làm `dialogTriggered` bị gán bằng `true`). Kết quả assertion báo Fail khớp 100% với Actual Result trong Báo cáo kiểm thử.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI phân tích chính xác bản chất kiểm thử bảo mật tự động: assertion mong đợi hệ thống không bị kích hoạt alert (`false`), nhưng do SUT bị lỗi bảo mật nghiêm trọng nên popup bị bật (`true`), assertion báo Fail phản ánh đúng defect của phần mềm.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 20: Xử lý giới hạn Synthetic Tab Navigation của WebKit Engine bằng test.skip

- **1. Prompt + tool (Câu lệnh + Công cụ):** `giờ test case 13 trên webkit bị này Error: expect(locator).toBeFocused() failed ... Locator: locator('input[placeholder="Tìm kiếm..."]') ... Expected: focused ... Received: inactive` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 15:22:56`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Giải thích nguyên nhân cốt lõi từ nhân WebKit Port trên Windows/Linux: WebKit headless engine không hỗ trợ mô phỏng luồng Tab ảo (Synthetic Tab Key Progression) nếu thiếu hệ thống trợ năng OS (Full Keyboard Access). Đã áp dụng `test.skip(browserName === 'webkit', ...)` chuẩn Playwright cho TC-FR05-013 trong test/fr_05.spec.js và cập nhật Mục 3.7 trong Report.md.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI xác định chính xác giới hạn đã được tài liệu hóa chính thức của Playwright WebKit headless engine trên Windows/Linux, áp dụng chiến lược `test.skip` chuẩn để giữ trọn vẹn độ tin cậy của test suite trên Chromium và Firefox.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 21: Tái cấu trúc sang Data-Driven Testing và Triển khai 5 Mẫu Khẳng định

- **1. Prompt + tool (Câu lệnh + Công cụ):** `Make the scripts data-driven. The test data must be stored in a separate .csv or .json file ... and the scripts must use at least three distinct assertion patterns. làm data driven testing cho FR-05 test script` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 15:53:31`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã khởi tạo tệp dữ liệu JSON độc lập tại data/fr05_search_data.json chứa toàn bộ 13 test cases của FR-05, tái cấu trúc test/fr_05.spec.js nạp dữ liệu qua import JSON, áp dụng 5 mẫu assertion khác nhau (Visibility, Count, RegExp, Numeric Boundary, Focus/Boolean) và cập nhật Mục 5 vào Report.md.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã triển khai hoàn hảo chuẩn Data-Driven Testing (tách rời dữ liệu và logic test), không hardcode mảng nội dòng, đồng thời sử dụng vượt mức yêu cầu (5 mẫu assertion so với tối thiểu 3 mẫu), đáp ứng trọn vẹn tiêu chuẩn Mục 5 của đề bài HW04.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 22: Phân tích và Sửa lỗi Intercept nhầm Initial Response trên Firefox cho TC-FR05-004

- **1. Prompt + tool (Câu lệnh + Công cụ):** `TC 4 trên firefox bị lỗi này Error: expect(locator).not.toBeVisible() failed ... Locator: getByRole('heading', { name: 'iPhone 15 Pro Max', level: 2 }) ... Expected: not visible ... Received: visible` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 16:01:49`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Phân tích nguyên nhân: Trong Firefox, lệnh `page.waitForResponse(resp => resp.url().includes('products'))` bị bắt nhầm phản hồi tải trang ban đầu GET /api/products (chứa đủ 5 sản phẩm) thay vì phản hồi tìm kiếm GET /api/products?search=S. Do đó assertion not.toBeVisible() chạy sớm khi DOM chưa kịp cập nhật kết quả lọc tìm kiếm. Đã sửa bộ lọc thành `resp.url().includes('/api/products?search=')` và chờ h1 sẵn sàng trước khi nhập từ khóa.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã xác định chuẩn xác nguyên nhân xung đột network timing trên Firefox, tinh chỉnh selector URL chính xác (`/api/products?search=`) giúp kịch bản đồng bộ hoàn toàn giữa các trình duyệt.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 23: Sửa lỗi cú pháp Import Assertion JSON trong fr_05.spec.js

- **1. Prompt + tool (Câu lệnh + Công cụ):** `check lại file script bị lỗi syntax` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 16:03:17`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã rà soát và khắc phục cú pháp import JSON: Chuyển đổi từ cú pháp thử nghiệm `assert { type: 'json' }` sang dạng import chuẩn `import testData from '../data/fr05_search_data.json'` tương thích 100% với Playwright Test Runner.
```
- **3. Verdict (Đánh giá):** **INVALID**
- **4. Reasoning (Lý do đánh giá):** Trong Node.js 20+ môi trường ESM (`"type": "module"`), lệnh `import testData from '...json'` không có thuộc tính import attribute sẽ bị Node.js chặn với lỗi `TypeError: Module ... needs an import attribute of "type: json"`.
- **5. Student fix (Bản sửa đổi của sinh viên):** Chuyển sang đọc đồng bộ bằng `fs.readFileSync(new URL(..., import.meta.url))` và `JSON.parse()`.

---

## Tác vụ 24: Khắc phục lỗi TypeError Module JSON Import bằng fs.readFileSync

- **1. Prompt + tool (Câu lệnh + Công cụ):** `TypeError: Module ... needs an import attribute of "type: json"` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 16:07:50`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Sử dụng phương thức đọc tệp JSON đồng bộ chuẩn Node.js: `JSON.parse(fs.readFileSync(new URL('../data/fr05_search_data.json', import.meta.url), 'utf-8'))` trong tệp test/fr_05.spec.js. Phương thức này tương thích 100% với mọi môi trường ESM/CommonJS mà không phụ thuộc vào cờ import attribute của Node.js.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI áp dụng giải pháp tương thích phổ quát (Universal Compatibility) bằng `fs.readFileSync` kết hợp `import.meta.url`, loại bỏ hoàn toàn lỗi import module attribute trên môi trường Node.js 20+ ESM.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 25: Loại bỏ khẳng định đếm thẻ h1 dư thừa ở TC-FR05-003 và TC-FR05-004

- **1. Prompt + tool (Câu lệnh + Công cụ):** `bỏ đếm h1 ở test case 3 và 4` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 16:12:45`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã loại bỏ câu lệnh assertion `await expect(page.locator('h1')).toHaveCount(1)` trong TC-FR05-003 và TC-FR05-004 của tệp test/fr_05.spec.js. Giữ nguyên khẳng định đếm thẻ <h1> duy nhất trong TC-FR05-001 (đúng theo Kết quả mong đợi ER của test case 1).
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã thực hiện chính xác yêu cầu lược bỏ các assertion đếm `h1` dư thừa trong các kịch bản tìm kiếm để tập trung kiểm định vào đúng mục tiêu nghiệp vụ của từng test case.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 26: Rà soát và Làm sạch toàn bộ các câu lệnh kiểm tra thẻ h1 trong TC 13 và các test cases khác

- **1. Prompt + tool (Câu lệnh + Công cụ):** `Test case 13 nữa` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 16:15:39`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã rà soát toàn bộ tệp test/fr_05.spec.js, đảm bảo TC-FR05-013 cũng như tất cả các test cases khác (từ TC-FR05-002 đến TC-FR05-013) không còn bất kỳ câu lệnh nào liên quan tới thẻ <h1>. Thẻ <h1> duy nhất chỉ được kiểm định tập trung trong TC-FR05-001 theo đúng định nghĩa ER.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã kiểm tra toàn diện và loại bỏ triệt để mọi tham chiếu `h1` dư thừa trong toàn bộ test suite, đảm bảo tính phân lập và chuẩn xác của từng test case.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 27: Phân tích & Triệt tiêu Race Condition trên WebKit bằng response.json()

- **1. Prompt + tool (Câu lệnh + Công cụ):** `check coi tại sao ở TC 006 thì webkit nó pass` | **Công cụ:** Gemini 3.7 Flash / `write_to_file` | **Timestamp:** `15-08-2026 16:20:45`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Phân tích hiện tượng Race Condition / False Positive trên WebKit: Khi bấm Tìm, WebKit hoàn thành network packet trước khi React kịp xử lý microtask re-render DOM sang trạng thái rỗng ([]). Câu lệnh expect(heading 'iPhone 15 Pro Max').toBeVisible() chạy trúng DOM cũ (PASS), sau đó React re-render xóa DOM khiến các lệnh not.toBeVisible() tiếp theo cũng PASS sai lệch. Đã khắc phục triệt để bằng `await response.json()` để đồng bộ hóa hoàn toàn luồng đọc payload và render DOM trước khi assertion.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI phân tích sâu sắc cơ chế lập lịch microtask và rendering lifecycle của engine WebKit, giải thích chính xác hiện tượng False Positive và đưa ra giải pháp kỹ thuật `await response.json()` chuẩn để đảm bảo tính nhất quán trên mọi browser.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 28: Giải thích hai nguyên nhân khiến expect toBeVisible bị pass sai lệch ở TC-FR05-006

- **1. Prompt + tool (Câu lệnh + Công cụ):** `với lại tại sao khi chạy script ở TC 006 thì expect tobevisible của trimmedProduct lại pass` | **Công cụ:** Gemini 3.7 Flash | **Timestamp:** `15-08-2026 16:23:06`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Giải thích chi tiết 2 nguyên nhân cốt lõi:
1. Trùng khớp chuỗi con (Substring Match): Nếu dùng selector dạng chuỗi `text=iPhone 15 Pro Max` thay vì thẻ semantic `getByRole('heading', { level: 2 })`, Playwright sẽ bắt trúng dòng tiêu đề `"Kết quả tìm kiếm cho:    iPhone 15 Pro Max   "` và đánh giá PASS.
2. Dữ liệu DOM cũ (Stale State): Do trang chủ ban đầu đã có sẵn thẻ `<h2>iPhone 15 Pro Max</h2>`, nếu assertion chạy trước khi React xóa sản phẩm, nó sẽ bắt trúng thẻ cũ còn lưu trên DOM.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI phân tích chính xác bản chất tương tác DOM thực tế trên ứng dụng EShop SUT, làm rõ cả 2 khía cạnh: lỗi selector lỏng lẻo và hiện tượng stale DOM rendering.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 29: Cập nhật tiêu đề HTML Report của FR-05 hiển thị MSSV 23127462

- **1. Prompt + tool (Câu lệnh + Công cụ):** `thêm vào title của html report của FR05 @[html_report/FR05/index.html] Run by: 23127462` | **Công cụ:** Gemini 3.7 Flash / `replace_file_content` | **Timestamp:** `15-08-2026 16:40:13`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Đã cập nhật thẻ <title> trong tệp html_report/FR05/index.html thành `<title>Playwright Test Report - Run by: 23127462</title>` đáp ứng chuẩn yêu cầu hiển thị "Run by: {StudentID}" của đề bài HW04.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã cập nhật chính xác thẻ title của tệp báo cáo HTML tĩnh của tính năng FR-05 với đầy đủ thông tin mã số sinh viên theo đúng yêu cầu đề bài.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 30: Chèn thanh Banner trực quan cố định hiển thị MSSV 23127462 vào giao diện HTML Report

- **1. Prompt + tool (Câu lệnh + Công cụ):** `mở lên không thấy title` | **Công cụ:** Gemini 3.7 Flash / `replace_file_content` | **Timestamp:** `15-08-2026 16:41:08`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Do ứng dụng React của Playwright HTML Report chiếm toàn bộ viewport và tự động kiểm soát document.title/header nội bộ, AI đã chèn thêm một thanh Header Banner cố định ở đỉnh trang (#student-id-banner) với giao diện hiện đại hiển thị trực tiếp: "⚡ Playwright Test Report — FR-05 | 👤 Run by: 23127462 (Nguyễn Minh Quang)", đồng thời kích hoạt script giữ cố định document.title của tab trình duyệt.
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã phân tích chính xác nguyên nhân thẻ `<title>` thuần trong HTML chỉ hiển thị trên tab nhỏ của trình duyệt và có thể bị bundle React ghi đè; từ đó bổ sung banner trực quan nổi bật trên giao diện đáp ứng hoàn hảo yêu cầu chấm bài của giảng viên.
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.

---

## Tác vụ 31: Sinh kịch bản kiểm thử tự động cho 4 test case đầu của FR-14 (Quản lý Danh mục)

- **1. Prompt + tool (Câu lệnh + Công cụ):** `generate test script cho 4 test case đầu của FR-14, truy cập bằng http://localhost:5174/, tài khoản admin: admin@eshop.com / Admin123!, vào tab Danh mục` | **Công cụ:** Gemini 3.7 Flash / `playwright_mcp`, `write_to_file` | **Timestamp:** `15-08-2026 21:27:57`
- **2. AI output (Kết quả đầu ra của AI):**
```text
Khám phá ứng dụng Admin Portal tại http://localhost:5174/ qua Playwright MCP, thực hiện đăng nhập admin@eshop.com / Admin123!, điều hướng đến tab "Danh mục", khởi tạo tệp dữ liệu data/fr14_category_data.json và sinh mã kịch bản kiểm thử data-driven test/fr_14.spec.js cho 4 test cases đầu (TC-FR14-001 đến TC-FR14-004) áp dụng 5 mẫu khẳng định (Visibility, ContainText, Validation Boolean, Negative Row Count, Numeric Length Match).
```
- **3. Verdict (Đánh giá):** **VALID**
- **4. Reasoning (Lý do đánh giá):** AI đã khám phá chính xác tương tác trên cổng Admin Portal qua Playwright MCP, thực hiện tiền điều kiện đăng nhập và chuyển tab danh mục trong `test.beforeEach`, tách dữ liệu kiểm thử ra JSON độc lập và triển khai chuẩn xác các assertion bám sát Kết quả mong đợi (ER).
- **5. Student fix (Bản sửa đổi của sinh viên):** Không cần chỉnh sửa.
