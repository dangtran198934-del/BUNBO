# 🍲 Quán Bún Bò Huế - Hệ Thống Đặt Hàng & Thanh Toán

Ứng dụng web quản lý đặt hàng và thanh toán cho quán Bún Bò Huế.

## 🎯 Tính Năng

✅ **Quản lý danh sách món ăn**
- Xem danh sách các món ăn có sẵn
- Thêm món ăn mới vào menu
- Xóa món ăn khỏi menu

✅ **Đặt hàng**
- Click vào món ăn để thêm vào giỏ hàng
- Thay đổi số lượng món ăn
- Xóa món ăn khỏi giỏ hàng

✅ **Tính toán hóa đơn**
- Tính tổng tiền tự động
- Áp dụng chiết khấu theo phần trăm
- Thêm phí vận chuyển
- Hiển thị tổng tiền cần thanh toán

✅ **In hóa đơn**
- Hiển thị preview hóa đơn
- In hóa đơn để thanh toán
- Bao gồm thông tin chi tiết đơn hàng

✅ **Lịch sử đơn hàng**
- Lưu trữ lịch sử tất cả đơn hàng
- Hiển thị 5 đơn hàng gần nhất
- Thống kê tổng doanh thu

✅ **Lưu trữ dữ liệu**
- Sử dụng LocalStorage để lưu trữ data
- Dữ liệu được giữ lại khi đóng/mở lại ứng dụng

## 📋 Các Món Ăn Mặc Định

| Món Ăn | Giá |
|--------|-----|
| Bún Bò Huế Bò Nạm | 40.000 VND |
| Bún Bò Huế Bò Viên | 35.000 VND |
| Bún Bò Huế Tôm | 45.000 VND |
| Bún Bò Huế Cả Hai | 50.000 VND |
| Bún Bò Huế Đặc Biệt | 55.000 VND |
| Nước Dùng Bò (Lạnh) | 15.000 VND |
| Nước Dùng Bò (Nóng) | 10.000 VND |
| Rau Tươi | 5.000 VND |

## 🚀 Cách Sử Dụng

### 1. Mở Ứng Dụng
```bash
# Mở file index.html trong trình duyệt web
# Có thể sử dụng Live Server extension trong VS Code
```

### 2. Thêm Món Ăn Mới (Nếu cần)
- Nhập tên món ăn vào ô "Tên món ăn"
- Nhập giá vào ô "Giá (VND)"
- Click nút "Thêm Món"

### 3. Đặt Hàng
- Click vào các món ăn trong danh sách
- Thay đổi số lượng nếu cần
- Xóa món bằng nút "Xóa" nếu cần

### 4. Tính Toán Thanh Toán
- Nhập chiết khấu (%) nếu có
- Nhập phí vận chuyển (nếu có)
- Hệ thống tự động tính tổng tiền

### 5. In Hóa Đơn
- Click nút "🧾 In Hóa Đơn"
- Xem preview hóa đơn
- Click nút "🖨️ In" để in hóa đơn
- Click "Đóng" để đóng

### 6. Lưu Đơn Hàng
- Click nút "💾 Lưu Đơn Hàng"
- Đơn hàng sẽ được lưu vào lịch sử
- Giỏ hàng sẽ được xóa trống để đặt hàng mới

### 7. Xóa Tất Cả
- Click nút "🔄 Xóa Tất Cả" để xóa toàn bộ giỏ hàng

## 📁 Cấu Trúc File

```
BUNBO/
├── index.html      # Giao diện chính
├── style.css       # Stylesheet
├── app.js          # Logic ứng dụng
└── README.md       # Tài liệu
```

## 🛠️ Công Nghệ Sử Dụng

- **HTML5** - Cấu trúc trang web
- **CSS3** - Trang trí giao diện (Responsive Design)
- **JavaScript (Vanilla)** - Logic ứng dụng
- **LocalStorage** - Lưu trữ dữ liệu

## 💾 Lưu Trữ Dữ Liệu

Ứng dụng sử dụng **LocalStorage** của trình duyệt để lưu trữ:
- Danh sách các món ăn
- Lịch sử tất cả đơn hàng

Dữ liệu sẽ được giữ lại ngay cả khi:
- Đóng tab trình duyệt
- Tắt máy tính
- Xóa bộ nhớ cache (ngoại trừ LocalStorage)

## 📱 Hỗ Trợ Thiết Bị

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet
- ✅ Mobile

Giao diện tự động thích ứng với kích thước màn hình.

## 🎨 Giao Diện

- **Màu chủ đạo**: Gradient tím (Purple & Indigo)
- **Màu accent**: Đỏ (để chỉ giá), Xanh lá (thành công)
- **Bố cục**: Sidebar + Main Content
- **Responsive**: Tự động điều chỉnh trên mobile

## 📝 Ghi Chú

- Tất cả giá được tính bằng **Đồng Việt Nam (VND)**
- Số tiền được định dạng tự động theo tiêu chuẩn Việt Nam
- Chiết khấu được tính dựa trên tổng tiền hàng
- Phí vận chuyển được thêm vào sau khi chiết khấu

## 🚀 Cải Tiến Trong Tương Lai

- [ ] Kết nối database (MySQL/MongoDB)
- [ ] Xác thực người dùng
- [ ] Hệ thống quản lý tài khoản
- [ ] Báo cáo doanh thu chi tiết
- [ ] Export hóa đơn PDF
- [ ] Tích hợp thanh toán trực tuyến
- [ ] Quản lý nhân viên
- [ ] Thống kê doanh số theo ngày/tháng/năm

## 📞 Liên Hệ & Hỗ Trợ

Nếu có bất kỳ câu hỏi hoặc vấn đề, vui lòng liên hệ!

---

**Phiên bản**: 1.0  
**Cập nhật**: 2024  
**Tác giả**: Quán Bún Bò Huế
