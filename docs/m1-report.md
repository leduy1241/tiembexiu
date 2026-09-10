# Báo cáo M1 — Homepage V1

Ngày: 09/09/2026. Phạm vi: giao diện Homepage V1 theo mẫu tham chiếu của
người dùng. Chưa triển khai hệ thống thương mại điện tử hoặc mở bán.

## Kết quả

- Hoàn thiện announcement bar, header, thanh tìm kiếm và navigation responsive.
- Hero dùng ảnh cắt trực tiếp từ `public/assets/homepage.png`, có CTA dẫn đến danh mục.
- Hoàn thiện 6 danh mục, 7 sản phẩm mẫu, hai banner ưu đãi và 4 nhóm tuổi.
- Hoàn thiện benefits, đánh giá hư cấu có ghi nhãn, Góc của mẹ, newsletter,
  footer và nút liên hệ nổi.
- Tạo `ProductCard`, `SectionHeading`, `Benefits`, `Icon` và trạng thái storefront
  dùng lại được.
- Tìm kiếm hỗ trợ tiếng Việt có hoặc không dấu. Lọc theo danh mục, độ tuổi và
  ưu đãi hoạt động trên dữ liệu mẫu.
- Menu mobile hỗ trợ đóng bằng phím Escape. Các nút chưa có backend mở dialog
  giải thích rõ; không gửi email, tin nhắn, tạo tài khoản, thêm giỏ hoặc đặt hàng.

## File chính đã tạo hoặc cập nhật

- `app/page.tsx`: ghép Homepage V1.
- `app/globals.css`: design tokens và base styles.
- `app/storefront.css`: component styles và responsive rules.
- `components/layout/`: logo cắt từ mẫu, header và footer.
- `components/home/`: hero, categories, products, promotions, age, benefits,
  reviews và blog.
- `components/product/product-card.tsx`: thẻ sản phẩm dùng lại được.
- `components/ui/`: icon SVG nội bộ, section heading và storefront provider.
- `data/`: categories, products, reviews và blog demo.
- `types/product.ts`: kiểu dữ liệu sản phẩm, danh mục và nhóm tuổi.
- `public/assets/reference/`: 40 phần ảnh cắt từ mẫu, WebP lossless.
- `scripts/crop-home-reference.mjs`: tạo lại ảnh từ nguồn, giữ nguyên file gốc.
- `README.md`, `docs/image-assets.md`, `docs/m1-report.md`.

Không cài thêm dependency cho website trong M1. Prettier và Playwright chỉ được
chạy tạm ngoài dependency của dự án để định dạng và kiểm tra giao diện.

## Xác minh

Bản sửa dùng ảnh gốc đã được kiểm tra production ngày 09/09/2026. Tại 1024px,
hero ở y=158, danh mục y=481, banner y≈822, nhóm tuổi y≈1016 và đánh giá
y≈1205, khớp các mốc của mẫu. Chữ HTML và một số icon có thể khác nhẹ so với
chữ raster trong ảnh. Mobile được bố trí lại để sử dụng được trên màn hình nhỏ.

| Kiểm tra | Kết quả |
| --- | --- |
| `npm run lint` | PASS, 0 lỗi và 0 warning |
| `npm run typecheck` | PASS |
| `npm run build` | PASS, `/` được prerender tĩnh |
| 375 / 390 / 768 / 1024 / 1440px | PASS |
| Horizontal overflow | Không có ở cả 5 độ rộng |
| Ảnh hỏng | Không có |
| Console và page errors | Không có |
| Menu mobile + Escape/focus | PASS |
| Tìm kiếm không dấu | PASS |
| Lọc danh mục, tuổi, ưu đãi | PASS |
| Dialog, bài viết demo, newsletter | PASS |

Responsive và tương tác đã được kiểm tra trên Chrome headless bằng cả dev và
production build. Ảnh chụp kiểm tra nằm tạm trong `/tmp/tiembexiu-browser-check`.

## Nội dung cần thay trước khi mở bán

- Logo gốc SVG hoặc PNG nền trong suốt.
- Danh mục, tên sản phẩm, ảnh, giá, tồn kho và đánh giá thật đã xác minh.
- Hotline, Messenger, Zalo, địa chỉ và các mạng xã hội chính thức.
- Phạm vi giao nhanh, phí vận chuyển, ngưỡng freeship và điều kiện đổi trả.
- Nội dung bài viết đã được kiểm duyệt; đặc biệt là hướng dẫn chăm sóc và dinh dưỡng.

Nguồn ảnh và cách cắt lại được ghi tại `docs/image-assets.md`. Favicon vẫn là SVG trống
inline để không tự tạo logo. M1 dừng ở frontend Homepage; chưa có cart, checkout,
database, authentication, CMS, API, analytics, thanh toán hoặc deploy.
