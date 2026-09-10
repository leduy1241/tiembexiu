# Trang danh mục và chi tiết sản phẩm

Ngày triển khai: 09/09/2026. Phạm vi: bước 1–2 được người dùng duyệt,
giao diện với dữ liệu mẫu, giữ phong cách Homepage V1.

## Các trang

- `/san-pham`: tất cả 7 sản phẩm mẫu, 6 sản phẩm mỗi trang.
- `/danh-muc/[category]`: 6 danh mục theo ID trong `data/categories.ts`.
- `/san-pham/[id]`: chi tiết từng sản phẩm mẫu.
- Đường dẫn danh mục/sản phẩm không tồn tại trả trang 404.

Danh sách hỗ trợ tìm không dấu, lọc thương hiệu/tuổi/khoảng giá/ưu đãi,
sắp xếp giá hoặc tên, phân trang và trạng thái không có kết quả.
Các lựa chọn nằm trong URL để tải lại, chia sẻ và quay lại bằng Back.
Thay bộ lọc đưa phân trang về trang đầu.

Chi tiết có ảnh chính, phóng to, chọn phân loại, số lượng 1–10, tạm tính,
thông tin sản phẩm, mô tả mở rộng và sản phẩm liên quan.
Nút giỏ hàng thêm lựa chọn vào giỏ frontend tại `/gio-hang`. Giỏ hỗ trợ nhiều
phân loại, số lượng 1–10, xóa từng món/xóa tất cả và tạm tính; dữ liệu được lưu
cục bộ bằng `localStorage`. Bước đặt hàng tại `/dat-hang` có form nhận hàng và
phương thức thanh toán mẫu; khi hoàn tất chỉ hiện thông báo xem trước và xóa giỏ
cục bộ, chưa tạo đơn thật.
Các danh mục, tìm kiếm, nhóm tuổi, ưu đãi và sản phẩm trên homepage đã nối
với các trang mới.

## Nguồn dữ liệu và ảnh

- `data/products.ts`: sản phẩm, giá và ảnh từ mẫu homepage.
- `data/product-details.ts`: thương hiệu, phân loại minh họa và sản phẩm liên quan.
- `components/product/catalog.tsx`: bộ lọc và danh sách.
- `components/product/product-detail.tsx`: tương tác trang chi tiết.
- `components/cart/cart-page.tsx`: giao diện và thao tác giỏ hàng cục bộ.
- `components/checkout/checkout-page.tsx`: giao diện form đặt hàng mẫu.
- `app/shop.css`: giao diện mới, được giới hạn bằng class để giữ homepage.

Ảnh cắt từ homepage có độ phân giải nhỏ, hiện chỉ có một góc mỗi sản phẩm.
Thư viện ảnh có ảnh chính và phóng to; cần ảnh gốc nhiều góc để hoàn thiện bộ ảnh.
Phân loại, giá và đánh giá vẫn là dữ liệu mẫu; mô tả kỹ thuật đang chờ thông
tin nhà sản xuất. Không thêm dependency cho website, backend, thanh toán hoặc deploy.

## Xác minh

- ESLint: PASS, không lỗi hoặc warning.
- Production build và TypeScript: PASS, tạo 6 trang danh mục và 7 trang chi tiết.
- Chrome production ở 375 / 768 / 1024 / 1440px: không tràn ngang trên trang
  tất cả sản phẩm, danh mục chăm sóc và chi tiết sản phẩm.
- PASS: lọc kết hợp, không có kết quả, xóa lọc, tìm không dấu, sắp xếp giá,
  phân trang, tải lại URL và Back.
- PASS: phân loại, số lượng, tạm tính, dialog/Escape, phóng to ảnh,
  điều hướng sản phẩm liên quan và menu mobile.
- Đường dẫn sai trả HTTP 404; không ghi nhận page error trong luồng kiểm thử.
- Screenshot và script kiểm thử tạm nằm trong `/tmp/tiembexiu-browser-check`
  (`shop-check.cjs`, `shop-results.json`, `shop-*.png`).

## Bổ sung giỏ hàng — 10/09/2026

- ESLint, TypeScript và production build: PASS; `/gio-hang` prerender tĩnh.
- HTTP production: `/gio-hang` và `/san-pham/demo-01` trả 200.
- Lần nối tiếp: ESLint, TypeScript và production build: PASS; `/dat-hang`
  prerender tĩnh.
- Phiên trình duyệt điều khiển không khả dụng tại thời điểm kiểm tra, nên các thao
  tác giỏ hàng mới chưa được ghi nhận là đã kiểm thử E2E bằng trình duyệt.
- `next.config.ts` dùng TypeScript 6 compiler API vì tiến trình CLI của Next trả
  stdout rỗng trong runtime Node 24 cục bộ; `npm run typecheck` vẫn chạy riêng và PASS.
