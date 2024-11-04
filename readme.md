# Stock System - README

## Mô tả dự án

Hệ thống này là một ứng dụng web quản lý và dự đoán cổ phiếu, gồm nhiều chức năng như đăng nhập, đăng ký, xem thông tin thị trường, dự đoán cổ phiếu, và quản lý thông tin cá nhân. Ứng dụng được xây dựng với **React.js** cho frontend và có các thành phần UI tương ứng với các trang được chỉ ra trong Use Case Diagram.

## Cấu trúc thư mục

```bash
/stock-system
  ├── /public
  │     ├── /assets
  │     │     └── /images
  │     └── index.html
  ├── /src
  │     ├── /components
  │     │     ├── Header.js
  │     │     ├── Footer.js
  │     │     ├── MarketOverview.js
  │     │     ├── Login.js
  │     │     ├── Register.js
  │     │     ├── Instructions.js
  │     │     ├── Contact.js
  │     │     ├── About.js
  │     │     ├── Dashboard.js
  │     │     ├── StockPrediction.js
  │     │     └── PersonalDashboard.js
  │     ├── /styles
  │     │     ├── main.css
  │     │     ├── header.css
  │     │     ├── footer.css
  │     │     ├── marketOverview.css
  │     │     ├── login.css
  │     │     ├── register.css
  │     │     └── dashboard.css
  │     ├── App.js
  │     └── index.js
  ├── /services
  │     ├── authService.js
  │     └── stockService.js
  ├── package.json
  ├── .gitignore
  └── README.md
1. /public
/assets: Thư mục này chứa các tài nguyên tĩnh như hình ảnh, biểu tượng cần thiết cho ứng dụng.
index.html: Đây là file HTML chính mà ứng dụng React.js sẽ được render vào.
2. /src
/components: Thư mục này chứa các thành phần UI chính như Header, Footer, Market Overview, v.v.
/styles: Thư mục này chứa các file CSS để quản lý style của từng thành phần:
main.css: File CSS chứa các style chung cho toàn bộ ứng dụng.
Các file khác như marketOverview.css, login.css, dashboard.css: Áp dụng style riêng cho từng thành phần giao diện khác nhau.
App.js: Đây là file gốc của ứng dụng React, nơi các thành phần chính của trang web được tổ chức và điều hướng.
index.js: File này dùng để render ứng dụng React vào index.html trong thư mục /public.
3. /services
authService.js: Quản lý các logic liên quan đến xác thực.
stockService.js: Quản lý logic liên quan đến dữ liệu cổ phiếu và dự đoán.
4. Các file khác
package.json: Chứa thông tin về dependencies và scripts.
.gitignore: Chứa các file mà Git sẽ bỏ qua.
README.md: Tài liệu hướng dẫn.