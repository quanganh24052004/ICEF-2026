# Ứng Dụng Lịch Trình ICEF 2026 (React + Tailwind CSS + IndexedDB)

Ứng dụng web hiện đại xây dựng bằng **React**, **Vite** và **Tailwind CSS v3**, tối ưu giao diện đáp ứng (responsive) trên mọi thiết bị (Mobile, Tablet, Desktop) và tích hợp **Cơ sở dữ liệu IndexedDB Client-Side**, hỗ trợ tự động triển khai (Auto-deploy) lên **GitHub Pages**.

Dành cho đoàn công tác nghiên cứu **Đại học Bách khoa Hà Nội (HUST)** & **Đại học Xây dựng Hà Nội (HUCE)** tại Hội thảo Quốc tế ICEF 2026 (Emeralda Resort & Alo Garden Ninh Bình).

---

## 🚀 Công Nghệ Sử Dụng

- **Frontend Core**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) (build siêu nhanh, HMR tức thì).
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) (thiết kế responsive linh hoạt cho Mobile, Tablet, Laptop, màn hình lớn).
- **Icons**: [Lucide React](https://lucide.dev/) & [FontAwesome 6](https://fontawesome.com/).
- **Database Engine**: **IndexedDB** với cơ chế **LocalStorage fallback** (không cần server backend, lưu trữ vĩnh viễn trên trình duyệt, sẵn sàng offline).
- **Deployment**: Tích hợp **GitHub Actions CI/CD** tự động build và deploy lên **GitHub Pages**.

---

## 🌟 Tính Năng Nổi Bật

1. **Giao Diện Tối Ưu Đa Thiết Bị (Tailwind Responsive Design)**:
   - Tối ưu kích thước, padding, font-size và bố cục co giãn tự động theo từng điểm ngắt màn hình (`xs`, `sm`, `md`, `lg`, `xl`).
   - Trên điện thoại: Có thanh trượt ngang chọn thành viên không che khuất, nút nổi FAB (+ Thêm mới) tiện lợi ở góc màn hình.
   - Hiệu ứng viền phát sáng (Highlight Pulse) cho 2 báo cáo trọng tâm: **Oral PID 628 (CapyVocab)** và **Poster PID 661**.

2. **Quản Trị CRUD Đầy Đủ (Thêm / Sửa / Xóa)**:
   - **Thêm hoạt động mới**: Form modal trực quan với đầy đủ trường thông tin (ngày, giờ, địa điểm, phân loại, đánh dấu trọng tâm/tham khảo, danh sách thành viên tham gia, bài báo con chi tiết và phân công nhiệm vụ riêng).
   - **Chỉnh sửa hoạt động**: Nút ✏️ trên từng thẻ cho phép sửa mọi thông tin và cập nhật ngay vào CSDL.
   - **Xóa hoạt động**: Modal xác nhận an toàn trước khi xóa khỏi CSDL.

3. **Cơ Sở Dữ Liệu Bền Vững (IndexedDB Storage)**:
   - Dữ liệu lịch trình, thành viên và lưu trú được lưu trong cơ sở dữ liệu `ICEF2026_Database`.
   - Giữ nguyên các thay đổi ngay cả khi tắt mở lại trình duyệt hoặc mất kết nối mạng.

4. **Sao Lưu & Khôi Phục (Backup & Restore)**:
   - **Xuất file JSON**: Tải bản sao lưu toàn bộ lịch trình về máy.
   - **Nhập file JSON**: Khôi phục lại lịch trình từ file sao lưu.
   - **Khôi phục dữ liệu gốc**: Đặt lại về dữ liệu ban đầu chuẩn của ICEF 2026.

5. **Bộ Lọc Nâng Cao & Tìm Kiếm Thông Minh**:
   - Lọc theo từng thành viên (Quang Anh, Đức Kiên, Đình Khôi, Thảo Nguyên, Khánh Linh, Thị Hồng, Phương Ly) kèm hiển thị tóm tắt phòng ở và vai trò học thuật.
   - Lọc theo ngày: *Tất cả 3 ngày*, *Thứ 5 (22/10)*, *⭐ Thứ 6 (23/10 - Trọng tâm)*, *Thứ 7 (24/10)*.
   - Công tắc ẩn/hiện các Session song song tham khảo.
   - Tìm kiếm nhanh thời gian thực kèm phím tắt `/`.
   - Hỗ trợ in ấn tối ưu / xuất file PDF (`Ctrl+P` / `Cmd+P`).

---

## 📁 Cấu Trúc Dự Án

```text
Web/
├── .github/workflows/deploy.yml # GitHub Actions workflow tự động deploy lên GitHub Pages
├── index.html                   # HTML template với Google Fonts (Inter, Outfit)
├── package.json                 # Cấu hình scripts & dependencies
├── vite.config.js               # Cấu hình Vite với base: './'
├── tailwind.config.js           # Cấu hình Tailwind CSS v3 & Design Tokens
├── postcss.config.js            # PostCSS plugin cho Tailwind
├── src/
│   ├── main.jsx                 # Entry point khởi tạo React root
│   ├── App.jsx                  # Main component quản lý state và điều phối giao diện
│   ├── index.css                # Tailwind directives & CSS utilities
│   ├── data/
│   │   └── initialData.js       # Dữ liệu ban đầu (7 thành viên, 18 sự kiện, lưu trú)
│   ├── services/
│   │   └── db.js                # Lớp Database Service IndexedDB (CRUD, import/export)
│   └── components/
│       ├── Header.jsx           # Top navbar, search box, các nút tác vụ
│       ├── StatsBar.jsx         # 4 thẻ thống kê tổng quan
│       ├── MemberFilter.jsx     # Bộ lọc thành viên & thẻ chi tiết cá nhân
│       ├── AccommodationsCard.jsx # Bảng lưu trú khách sạn & phân công báo cáo
│       ├── DayTabs.jsx          # Tab chọn ngày & toggle Session tham khảo
│       ├── ScheduleList.jsx     # Nhóm lịch trình theo ngày kèm sticky header
│       ├── EventCard.jsx        # Thẻ hoạt động đơn lẻ kèm nút sửa/xóa
│       ├── EventModal.jsx       # Modal form thêm/sửa hoạt động
│       ├── DeleteModal.jsx      # Modal xác nhận xóa an toàn
│       ├── BackupModal.jsx      # Modal sao lưu, nhập file JSON & khôi phục
│       ├── Toast.jsx            # Thông báo nổi thông minh
│       └── FloatingAddButton.jsx # Nút FAB nổi trên màn hình di động
└── README.md
```

---

## 💻 Hướng Dẫn Chạy Cục Bộ (Local)

1. Cài đặt các gói phụ thuộc (nếu chưa cài):
   ```bash
   npm install
   ```

2. Khởi chạy máy chủ phát triển (Development Server):
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại đường link hiển thị trên terminal (thường là `http://localhost:5173`).

3. Kiểm tra bản đóng gói sản phẩm (Production Build):
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Hướng Dẫn Triển Khai Lên GitHub Pages (Tự Động Bằng GitHub Actions)

Dự án đã có sẵn file workflow [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml).

### Cách thiết lập trên GitHub:
1. Đẩy mã nguồn lên kho lưu trữ GitHub của bạn:
   ```bash
   git add .
   git commit -m "feat: migrate ICEF 2026 app to React + Tailwind CSS"
   git push origin main
   ```

2. Trên GitHub, vào kho lưu trữ của bạn:
   - Chọn tab **Settings** ➔ Mục **Pages** ở danh mục bên trái.
   - Tại phần **Build and deployment** ➔ **Source**: Chọn **`GitHub Actions`** (thay vì *Deploy from a branch*).
   - Ngay lập tức, GitHub Actions sẽ tự động chạy workflow, cài đặt dependencies, chạy `npm run build` và deploy thư mục `dist` lên GitHub Pages.
   - Sau ~1 phút, bạn sẽ nhận được đường link trang web hoạt động trực tiếp dạng: `https://<ten-tai-khoan>.github.io/<ten-repo>/`.

---

## 👥 Nhóm Nghiên Cứu & Hội Thảo
- **Hội thảo**: The International Conference on English Language Teaching and Faculty Development (ICEF 2026) - Emeralda Resort Ninh Bình.
- **Thời gian**: 22/10 – 24/10/2026.
- **Đơn vị**: Đại học Bách khoa Hà Nội (HUST) & Đại học Xây dựng Hà Nội (HUCE).
- **Báo cáo**: Oral PID 628 (CapyVocab) & Poster PID 661.
