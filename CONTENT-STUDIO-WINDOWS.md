# Tiệm Bé Xíu Content Studio — chạy trên Windows

## 1. Chuẩn bị

- Cài Node.js 24 LTS.
- Mở PowerShell tại thư mục dự án.
- Chạy `npm install`, sau đó `npm run dev`.
- Mở `http://127.0.0.1:3000/content-studio`.

## 2. Kết nối dịch vụ

Nhấn **Cấu hình** trên dashboard và nhập:

- OpenAI API key có quyền gọi Responses API và Image API.
- Facebook Page ID.
- Page access token có quyền đăng nội dung lên Page.

Nhấn **Lưu cấu hình**, tắt chế độ tự động và dùng **Tạo bài ngay** để kiểm tra một bản nháp trước. Khi nội dung và ảnh ổn, bật công tắc automation. Tool sẽ tạo một bài theo chu kỳ 15 phút mặc định.

## 3. Lưu ý vận hành

- Cửa sổ PowerShell và Next.js server phải tiếp tục chạy để lịch hoạt động.
- Dữ liệu cấu hình/lịch sử nằm trong `.data/content-studio`; ảnh ở `public/generated`. Hai thư mục này đã được loại khỏi Git.
- Token được giữ phía server, không được gửi lại cho trình duyệt. Vì đây là tool local, hãy bảo vệ tài khoản Windows và không chia sẻ thư mục `.data`.
- Facebook token phải là **Page access token**, không phải App token. Quyền và thời hạn token phụ thuộc cấu hình Meta App/Page của bạn.
- Muốn chạy bền sau khi khởi động Windows, có thể tạo tác vụ Task Scheduler chạy `npm start` sau khi đã chạy `npm run build`.
