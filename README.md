# HW04 — Automation Testing (HW04-AI)

**Course:** Software Testing (Kiểm thử Phần mềm)    
**Student Name:** Nguyễn Minh Quang  
**Student ID (MSSV):** 23127462  
**GitHub Repository:** [https://github.com/QuangNg27/SoftwareTesting_HW04](https://github.com/QuangNg27/SoftwareTesting_HW04)  
**GitHub Issues (Bug Tracker):** [https://github.com/QuangNg27/SoftwareTesting_HW04/issues](https://github.com/QuangNg27/SoftwareTesting_HW04/issues)  

---

## 1. Self-Assessment Table (Section 15 Assessment Template)

| No. | Criteria | Grade | Self-Assessed Grade |
| :---: | :--- | :---: | :---: |
| **1** | **Task 1 — Feature A (FR-05: Product Listing & Search)** | 25 | **25** |
| **1** | **Task 1 — Feature B (FR-09: Discount Coupons)** | 25 | **25** |
| **1** | **Task 1 — Feature C (FR-14: Category Management CRUD)** | 25 | **25** |
| **2** | **Task 2 — Demo Video** | 15 | **15** |
| **3** | **Agent Skills** | 10 | **10** |
| | **Total** | **100** | **100** |

---

## 2. Test Summary Report

### 2.1. Overview Metrics

| Metric | Count / Detail |
| :--- | :--- |
| **Number of Features Selected** | **3 Features** (FR-05, FR-09, FR-14 from Pools A, B, C) |
| **Number of Test Cases Automated** | **38 Test Cases** (13 in FR-05, 13 in FR-09, 12 in FR-14) |
| **Number of Unique Test Cases Executed** | **38 Test Cases** (100% execution coverage) |
| **Unique Test Cases Passed** | **22 / 38 Test Cases** (57.89%) |
| **Unique Test Cases Failed (Defects Detected)** | **16 / 38 Test Cases** (42.11% — catching 16 real SUT bugs) |
| **Number of Browser Engines Tested** | **3 Browsers** (Chromium v145.0, Firefox v146.0, WebKit v26.0) |
| **Total Browser-level Test Runs** | **114 Browser Runs** (38 TCs $\times$ 3 browsers) |
| **Total Browser Runs Passed** | **54 / 114 Runs** (47.37%) |
| **Total Browser Runs Failed** | **60 / 114 Runs** (52.63%) |
| **Number of Defects / Bugs Reported** | **16 Defects** (Logged in `bug_report.md` & GitHub Issues #2–#17) |
| **Data-Driven Files** | **3 JSON datasets** in `data/` (100% separated, no inline arrays) |
| **Assertion Patterns Applied** | **5 Distinct Patterns** (Visibility, Count, RegExp/Text, Boundary, Focus/Dialog/Boolean) |

---

### 2.2. Breakdown by Feature

| Feature ID | Feature Name | Pool | Total TCs | Passed TCs | Failed TCs (Bugs) | Browser Runs (P / F) | HTML Report Path |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **FR-05** | Xem danh sách & Tìm kiếm sản phẩm | A | 13 | 4 | 9 (B001–B009) | 39 runs (12 P / 27 F) | html_report/FR05/index.html |
| **FR-14** | Quản lý Danh mục (Category CRUD) | C | 12 | 9 | 3 (B013–B015) | 36 runs (18 P / 18 F) | html_report/FR14/index.html |
| **FR-09** | Mã Giảm Giá (Discount Coupon) | B | 13 | 9 | 4 (B010–B012, B016) | 39 runs (24 P / 15 F) | html_report/FR09/index.html |
| **Total** |  |  | **38** | **22** | **16 Bugs** | **114 runs (54 P / 60 F)** |  |

---

## 3. Demo Video Link

* **Demo agent skill:** https://youtu.be/EdwX7LD4c1s
* **Demo Test E2E:** https://youtu.be/AgY3pA9nEsI

---