
## 💝 Ủng hộ tôi

### Nếu bạn thấy dự án của tôi hữu ích và muốn ủng hộ tôi, hãy quét mã QR bên dưới:

| ![QR Code for MoMo](./img_github_momo_donate.png)                                                                             | ![Thank you](./img_thank_you.gif) | ![QR Code for Bank](./img_github_tech_donate.png) | ![Thank you](./img_thank_you.gif) |
|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|---------------------------------------------------|-----------------------------------|
| **Momo:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>0981054498 - NGUYEN ANH DAT** | **Thank you 🙌**                  | **Techcombank:<br/>1981054498 - NGUYEN ANH DAT**  | **Thank you 🙌**                  |

### Cảm ơn sự hào phóng của bạn! 🙌

---

# Giới thiệu dự án TokyoLife

### Mô tả

- Dự án **TokyoLife** là một dự án thương mại điện tử, có giao diện giống với website TokyoLife. Tôi code cơ bản và dễ hiểu, phù hợp với ai mới học. Bạn có thể dùng **TokyoLife** như một tài liệu tham khảo hoặc dùng làm bài tập của mình.
- Dự án **TokyoLife** có 3 thư mục là 3 ứng dụng khác nhau:
    - Thư mục **Server** là ứng dụng API
    - Thư mục **Admin** là ứng dụng web trang quản lý
    - Thư mục **User** là ứng dụng web trang thương mại điện tử, có giao diện giống với TokyoLife
- Back-End Framework: **ExpressJS**
- Front-End Framework: **Bootstrap 5** & **AngularJS**

### Cài Đặt
<details>
<summary>Click để mở rộng</summary>

1. **Yêu cầu Node.js**
- Đảm bảo bạn đã cài đặt Node.js trên máy tính.

2. **Clone repository**
- Clone repository từ Github vào máy tính của bạn.

3. **Cài đặt Server**
- Bạn cần cài đặt ứng dụng API trước tiên.
- Mở thư mục **Server** bằng `VSCode` hoặc IDE của bạn, sau đó mở Terminal và chạy lệnh sau để cài đặt các dependencies:
    ```sh
    npm install
    ```
    hoặc
    ```sh
    yarn install
    ```
4. **Cấu hình biến môi trường**
- Mở tệp `.env.example`, đổi tên tệp thành `.env`, và điền các thông tin sau:
    - **PORT**: cổng mà API chạy
    - **MONGO_URL**: địa chỉ kết nối tới CSDL
    - **SECRET_KEY**: Khoá bí mật
    - **MAIL_NAME**: địa chỉ email
    - **MAIL_PASSWORD**: khoá ứng dụng của Google
    - **URL**: địa chỉ web client
    - **CLOUDINARY_NAME**: thông tin này lấy từ dashboard của Cloudinary
    - **CLOUDINARY_KEY**: thông tin này lấy từ dashboard của Cloudinary
    - **CLOUDINARY_SECRET**: thông tin này lấy từ dashboard của Cloudinary

5. **Ví dụ biến môi trường**
- Tệp `.env` có thể có nội dung như sau:
    - **PORT**: `8081`
        - `8081` là do bạn đặt, sao cho không trùng với cổng của các ứng dụng khác.
    - **MONGO_URL**: `mongodb://root:pass@localhost:27017`
        - Tôi đang sử dụng **Docker** để cài đặt **MongoDB**. Bạn cài đặt **Docker Desktop** vào máy. Sau đó, di chuyển đến thư mục **TokyoLife**, nơi chứa file `docker-compose.yml`. Mở Terminal và chạy lệnh sau để cài đặt:
            ```sh
            docker-compose up -d
            ```
        - Bạn có thể cài đặt **MongoDB** trên máy và tạo 1 database cụ thể ví dụ database TokyoLife chẳng hạn. Khi đó **MONGO_URL** sẽ thay đổi.
    - **SECRET_KEY**: `SecretKey@123`
        - Khoá bí mật là do bạn đặt. Khoá này dùng để tạo `token` vì vậy bạn nên đặt dài một chút.
    - **MAIL_NAME**: `tokyolifedemo@gmail.com`
        - Email để gửi email thông báo.
    - **MAIL_PASSWORD**: `qwer tyui asdf ghjk`
        - Khoá ứng dụng của Google, bạn vào `Quản lý tài khoản Google` > `Mật khẩu ứng dụng`, tạo 1 mật khẩu. Mật khẩu có dạng `qwer tyui asdf ghjk`.
    - **URL**: `http://127.0.0.1:5501`
        - Đây là **URL** của web thương mại điện tử, thư mục **User**
    - **CLOUDINARY_NAME**, **CLOUDINARY_KEY**, **CLOUDINARY_SECRET**: Bạn truy cập `https://cloudinary.com` để đăng ký. Sau đó, bạn copy nội dung vào.

</details>

### Chạy thử
<details>
<summary>Click để mở rộng</summary>

1. **Chạy Server**

- Tạo tài khoản Admin:
    ```sh
    npm run createAdmin
    ```
    hoặc
    ```sh
    yarn createAdmin
    ```
    - Tài khoản Admin:
        ```js
        {
            name: "Admin",
            email: "admin@gmail.com",
            password: "123456",
            role: "admin"
        }
        ```
- Khởi chạy dev:
     ```sh
    npm run dev
    ```
    hoặc
    ```sh
    yarn dev
    ```
- Khởi chạy product:
     ```sh
    npm run start
    ```
    hoặc
    ```sh
    yarn start
    ```

2. **Chạy Admin**

- Cài đặt plugin `Live Server` trên `VSCode`
- Di chuyển tới thư mục **Admin**, chuột phải vào file `index.html` chọn `Open with Live Server`

3. **Chạy User**

- Cài đặt plugin `Live Server` trên `VSCode`
- Di chuyển tới thư mục **User**, chuột phải vào file `index.html` chọn `Open with Live Server`

</details>