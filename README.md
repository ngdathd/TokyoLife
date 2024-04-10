# TokyoLife

## Front-End Framework: Bootstrap 5 & AngularJS

### Hướng Dẫn Sử Dụng

#### Cài Đặt

1. **Yêu Cầu Node.js**: Đảm bảo bạn đã cài đặt Node.js trên máy tính của mình.

2. **Clone Repository**: Clone repository từ Github vào máy tính của bạn.

3. **Cài Đặt Dependencies**: Mở terminal và di chuyển vào thư mục của dự án, sau đó chọn server và chạy lệnh sau để cài đặt các dependencies:
- **npm install**

4. **Cấu Hình Biến Môi Trường**: Mở tệp `.env.example`, đổi tên tệp thành `.env`, và điền các thông tin sau:
- **MONGO_URL**: địa chỉ kết nối tới CSDL
- **URL**: địa chỉ web client
- **SECRET_KEY**: Khoá bí mật
- **MAIL_PASSWORD**: khoá ứng dụng của Google
- **MAIL_NAME**: địa chỉ email
- **CLOUDINARY_NAME**: thông tin này lấy từ dashboard của Cloudinary
- **CLOUDINARY_KEY**: thông tin này lấy từ dashboard của Cloudinary
- **CLOUDINARY_SECRET**: thông tin này lấy từ dashboard của Cloudinary

#### Khởi Chạy

- **Khởi Chạy Server**: Sau khi cài đặt dependencies, chạy lệnh sau để khởi động ứng dụng:
- **npm run dev** # for development
- **npm start** # for production**

- **Khởi Chạy Client**: Sử dụng liveserver để khởi chạy trang web.

### Sử Dụng

- **User**: Các chức năng cơ bản bao gồm: đăng ký, đăng nhập, mua hàng, bình luận, ...

- **Admin**: Các chức năng cơ bản bao gồm: thêm, sửa, xoá, thống kê, ...

### Đóng Góp

Nếu bạn muốn đóng góp vào dự án, vui lòng tạo một pull request và mô tả chi tiết về thay đổi bạn đề xuất.

### Vấn Đề

Nếu bạn gặp bất kỳ vấn đề nào khi sử dụng ứng dụng, vui lòng tạo một issue trên Github và mô tả vấn đề một cách chi tiết.

### Tác Giả

Ứng dụng được phát triển bởi: Trần Công Minh.

### Giấy Phép

Mọi quyền được bảo lưu.
