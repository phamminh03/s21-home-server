# 🏡 ABC Decor Home Server

Website giới thiệu và quản lý sản phẩm nội thất **ABC Decor** được xây dựng bằng **Node.js + Express**.

Dự án bao gồm:

- 🌐 Website giới thiệu sản phẩm
- 🔐 Trang quản trị (Admin)
- 📦 Quản lý sản phẩm
- 🖼 Upload hình ảnh
- 📁 Lưu dữ liệu bằng JSON
- 📱 Responsive trên máy tính và điện thoại

---

# Công nghệ sử dụng

- Node.js
- Express.js
- Express Session
- Multer
- HTML5
- CSS3
- JavaScript (Vanilla)

---

# Cấu trúc dự án

```
myserver
│
├── controllers/
├── database/
│   ├── company.json
│   └── products.json
│
├── middleware/
├── public/
│   ├── css/
│   ├── images/
│   └── js/
│
├── routes/
├── views/
├── server.js
└── package.json
```

---

# Yêu cầu

- Node.js >= 18
- npm

Kiểm tra:

```bash
node -v
npm -v
```

---

# Clone dự án

```bash
git clone https://github.com/phamminh03/s21-home-server.git

cd s21-home-server
```

---

# Cài đặt thư viện

Chỉ cần chạy:

```bash
npm install
```

Hoặc cài thủ công:

```bash
npm install express
npm install express-session
npm install multer
```

> Không cần cài `bcrypt`.

---

# Chạy dự án

```bash
node server.js
```

Nếu thành công sẽ hiện:

```
ABC Decor running at http://0.0.0.0:3000
```

Truy cập:

```
http://localhost:3000
```

Hoặc

```
http://<IP>:3000
```

---

# Đăng nhập Admin

```
http://localhost:3000/admin
```

Tài khoản mặc định:

```
Username

admin
```

```
Password

123456
```

---

# Chức năng

## Website

- Hiển thị thông tin công ty
- Hiển thị sản phẩm
- Responsive

---

## Admin

- Đăng nhập
- Dashboard
- Thêm sản phẩm
- Upload ảnh
- Xem trước ảnh

---

# Upload ảnh

Ảnh được lưu tại:

```
public/images
```

Hiện tại hỗ trợ:

- JPG
- JPEG
- PNG

Không hỗ trợ:

- HEIC

---

# Dữ liệu

Thông tin sản phẩm được lưu tại:

```
database/products.json
```

Thông tin công ty:

```
database/company.json
```

---

# Khởi tạo dữ liệu

Ví dụ `products.json`

```json
[
    {
        "id":1,
        "name":"Bình hoa Bắc Âu",
        "description":"Bình hoa gốm",
        "price":490000,
        "image":"/images/example.jpg"
    }
]
```

---

# Cập nhật mã nguồn

```bash
git pull
```

Sau đó:

```bash
npm install
```

Nếu có thư viện mới.

---

# Đưa thay đổi lên GitHub

```bash
git add .

git commit -m "Update"

git push
```

---

# Tác giả

**Phạm Minh**

GitHub:

https://github.com/phamminh03

---

# Giấy phép

Dự án được phát triển phục vụ mục đích học tập và nghiên cứu.
Please contact me if you need more and more!
