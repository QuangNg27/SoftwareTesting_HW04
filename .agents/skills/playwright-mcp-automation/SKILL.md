---
name: playwright-mcp-automation
description: Kỹ năng tự động hóa kiểm thử web bằng Playwright MCP - Khám phá ứng dụng trực tiếp từng bước (live browser exploration), rà soát trạng thái giao diện sau mỗi thao tác (snapshot/DOM state inspection), và tự động tạo kịch bản kiểm thử Playwright (.spec.js/.spec.ts) dựa trên các tương tác thực tế quan sát được. Kích hoạt kỹ năng này khi cần tự động hóa kiểm thử cho các tính năng web trên SUT.
---

# Hướng dẫn Kỹ năng: Playwright MCP Live Exploration & Test Spec Generator

Kỹ năng này định nghĩa quy trình chuẩn để AI sử dụng công cụ **Playwright MCP** khám phá ứng dụng web đang chạy thực tế (Live SUT), ghi nhận trạng thái giao diện từng bước và tự động sinh kịch bản kiểm thử Playwright Test (`.spec.js` / `.spec.ts`).

---

## 1. Mục tiêu & Nguyên tắc làm việc
- **Tương tác thực tế (Live Browser Exploration):** Sử dụng các công cụ Playwright MCP (`browser_navigate`, `browser_snapshot`, `browser_click`, `browser_fill_form`, `browser_evaluate`...) để thực thi kịch bản kiểm thử trực tiếp trên ứng dụng SUT.
- **Rà soát trạng thái từng bước (Step-by-step Inspection):** Sau mỗi hành động quan trọng (click, fill, search...), kiểm tra lại DOM/Snapshot để xác nhận phản hồi của hệ thống trước khi quyết định hành động tiếp theo.
- **Tạo mã kiểm thử thuần túy (AI-generated Draft Spec):** Tạo tệp kịch bản kiểm thử `.spec.js` dựa 100% trên các tương tác và phần tử quan sát được qua Playwright MCP, đảm bảo các câu lệnh `expect` bám sát Kết quả mong đợi (ER) của từng test case.

---

## 2. Câu lệnh Mẫu (Prompt Template)

Khi cần thực hiện kiểm thử tự động cho một tính năng mới, sử dụng mẫu Prompt chuẩn sau:

```text
Use Playwright MCP to explore the live EShop application at: <Target_URL>

Scenario lấy các test case của <Feature_ID>

Use the Playwright MCP browser tools to perform the scenario step by step.

After each important action, inspect the live browser state before deciding the next action.

Important:
- Use Playwright MCP for all browser interaction.
- Do not use a built-in browser subagent.
- Do not write a custom Node.js or Python browser automation script.
- Do not use Playwright CLI.
- Do not inspect existing Playwright tests.
- Do not inspect application source code.
- Do not run any test.

Once you have successfully completed the scenario in the live browser, create: file <spec_file_name>.spec.js (trong đó describe là <Feature_ID> và các test nhỏ là theo từng test case)

Generate the test based only on the interaction you observed through Playwright MCP.

Keep it as a straightforward AI-generated draft.
Do not audit or improve the test.

Stop after creating the file.
```

---

## 3. Quy trình Thực hiện 4 Bước chuẩn

### Bước 1: Khám phá ứng dụng bằng Playwright MCP
1. Gọi `browser_navigate` để mở URL ứng dụng SUT.
2. Kiểm tra DOM bằng `browser_snapshot` hoặc `browser_evaluate`.
3. Thực hiện các thao tác nhập liệu (`browser_fill_form`), nhấp chuột (`browser_click`) theo từng test case.
4. Lặp lại bước chụp snapshot để ghi nhận kết quả hiển thị (Text, Heading, Image alt, Count...).

### Bước 2: Sinh kịch bản Playwright Test Spec (`.spec.js`)
1. Tạo tệp `<spec_file_name>.spec.js` với cấu trúc `test.describe('<Feature_ID>', () => { ... })`.
2. Mỗi test case được viết thành một khối `test('<Case_ID>: <Test_Case_Name>', async ({ page }) => { ... })`.
3. Sử dụng các locator khuyến nghị của Playwright (`getByRole`, `getByText`, `getByPlaceholder`).
4. **Chú ý xử lý bất đồng bộ (Async SPA):** Bổ sung `await expect(page.locator('<selector>').first()).toBeVisible()` trước khi thực hiện các phép đếm `count()` để đảm bảo dữ liệu React/Vite đã render xong.

### Bước 3: Đồng bộ Nhật ký Prompt (`promt_log.md`)
Tự động ghi nhận nguyên văn prompt vào `promt_log.md` kèm **Timestamp (DD-MM-YYYY HH:MM:SS)**:
```markdown
### [DD-MM-YYYY HH:MM:SS] | Gemini
```text
<Prompt_Nội_Dung>
```
```

### Bước 4: Lập báo cáo kiểm định AI (`AI_Audit_Report.md`)
Bổ sung tác vụ kiểm định vào `AI_Audit_Report.md` với đầy đủ 5 mục (Prompt + tool, AI output, Verdict, Reasoning, Student fix) và mốc Timestamp.

---

## 4. Các Điều khoản Ràng buộc (Constraints)
- **Nghiêm cấm dùng subagent ngoài:** Mọi thao tác trình duyệt phải dùng duy nhất bộ công cụ Playwright MCP.
- **Không tự ý xem source code app:** Không mở các file JSX/TSX của ứng dụng để lấy selector (phải lấy selector thực tế quan sát qua snapshot).
- **Khớp chuẩn 100% ER:** Mọi câu lệnh `expect(...)` phải phản ánh chính xác tiêu chí của Kết quả mong đợi trong Báo cáo kiểm thử.
