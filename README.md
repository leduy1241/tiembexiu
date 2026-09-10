# Tiệm Bé Xíu

Website mẹ & bé. Đã hoàn thành **M1 — Homepage V1** theo mẫu tham chiếu của người dùng.
Đã bổ sung trang danh mục và chi tiết sản phẩm bằng dữ liệu mẫu:
`/san-pham`, `/danh-muc/care`, `/san-pham/demo-01`, giỏ hàng frontend
tại `/gio-hang` và luồng đặt hàng mẫu tại `/dat-hang`.
Chi tiết phạm vi tại `docs/catalog-detail-report.md`.
Dự án dùng Next.js App Router, React, TypeScript strict, Tailwind CSS và design
tokens. Đây là bản xem trước với dữ liệu minh họa, chưa mở bán.

## Chạy local

Dự án sử dụng Node.js 24 (xem `.nvmrc`). Máy hiện tại có Node.js 18 nên M0
đã chuẩn bị runtime riêng tại `.tools/node`, không thay đổi Node.js hệ thống.
Trong terminal mới trên máy này:

```bash
cd /home/so/Duycode/tiembexiu
export PATH="$PWD/.tools/node/node_modules/.bin:$PATH"
npm run dev
```

Mở <http://localhost:3000>. Nếu cổng 3000 đang được dùng, xem cổng thực tế
trong terminal. Server chỉ lắng nghe trên loopback `127.0.0.1`.
Sao chép `.env.example` thành `.env.local` nếu cần cấu hình domain/CMS riêng
trên máy local.

Trên máy khác, cài Node.js 24 (hoặc `nvm use` nếu đã có nvm), rồi:

```bash
npm ci
npm run dev
```

Thư mục `.tools/` chỉ dùng cho môi trường local, không đưa vào Git. Nếu cần
tạo lại runtime riêng trên máy này:

```bash
npm install --prefix .tools/node node@24
export PATH="$PWD/.tools/node/node_modules/.bin:$PATH"
```

## Kiểm tra và chạy bản production

```bash
npm run lint
npm run build
npm run typecheck
npm run start
```

Chạy build trước typecheck ở checkout mới để Next.js tạo các kiểu route.
Chạy `start` sau build, khi không có dev server chiếm cổng 3000.
Khi deploy, đặt `NEXT_PUBLIC_SITE_URL=https://tiembexiu.store` để canonical URL,
Open Graph, `robots.txt` và `sitemap.xml` trỏ đúng domain chính.

## WordPress/WooCommerce

CMS hiện dùng domain dự kiến `https://cms.tiembexiu.store`, website chính dùng
`https://tiembexiu.store`. WooCommerce là hướng bán hàng đầy đủ cho sản phẩm,
tồn kho, đơn hàng và thanh toán.
Trang danh sách, danh mục, chi tiết, giỏ hàng và đặt hàng đã có lớp đọc sản
phẩm từ WooCommerce. Nếu API lỗi hoặc chưa cấu hình key, website tự quay về dữ
liệu mẫu để không gãy giao diện.

Các biến môi trường cần chuẩn bị khi nối API:

```bash
NEXT_PUBLIC_SITE_URL=https://tiembexiu.store
WORDPRESS_URL=https://cms.tiembexiu.store
WOOCOMMERCE_CONSUMER_KEY=...
WOOCOMMERCE_CONSUMER_SECRET=...
WORDPRESS_APP_USERNAME=...
WORDPRESS_APP_PASSWORD=...
```

Tạo WooCommerce REST API key trong WordPress admin tại
`WooCommerce → Settings → Advanced → REST API`. Với website đọc sản phẩm trước,
chỉ cấp quyền `Read`; khi làm tool tạo/sửa sản phẩm hoặc đơn hàng mới cân nhắc
`Read/Write`. Application Password của WordPress dùng cho bài viết SEO và media,
tạo tại `Users → Profile → Application Passwords`.
Sản phẩm WooCommerce nên có slug, giá, ảnh đại diện và danh mục khớp một trong
các slug `diapers`, `nutrition`, `feeding`, `care`, `essentials`, `mother` để
lọc đúng trên website.

## Cấu trúc

```text
app/
  layout.tsx            # Ngôn ngữ tiếng Việt, title và description cơ bản
  page.tsx              # Ghép các section Homepage V1
  globals.css           # Design tokens, Tailwind theme và base styles
  storefront.css        # Styles và responsive của giao diện cửa hàng
components/
  layout/               # Header, footer và logo cắt từ mẫu
  home/                 # Các section homepage
  product/              # ProductCard dùng chung
  ui/                   # Icon, dialog và trạng thái bộ lọc
data/                   # Dữ liệu minh họa
types/                  # Kiểu Product, CategoryId và AgeId
public/assets/logo/     # Đặt logo gốc tại đây khi có
```

Homepage đã có 6 danh mục, 7 sản phẩm mẫu (hiện mặc định 6), banner ưu đãi,
mua theo 4 nhóm tuổi, benefits, đánh giá minh họa, Góc của mẹ, newsletter và footer.
Tìm kiếm không dấu, lọc thương hiệu/danh mục/tuổi/giá, sắp xếp, phân trang,
chi tiết sản phẩm, giỏ hàng lưu trong `localStorage`, form đặt hàng mẫu, menu
mobile và dialog hoạt động trên trình duyệt. Không tạo đơn hàng thật, database,
authentication, CMS, API, tracking hoặc thanh toán. Chưa deploy.

## Design tokens

Chỉnh token nền tại `app/globals.css` và token khớp mẫu tại `app/storefront.css`. `@theme inline`
ánh xạ token sang các utility Tailwind. Palette gồm coral/peach, sage và warm
cream, chữ nâu đậm; có màu coral đậm riêng cho chữ và CTA dễ đọc. Font hệ thống
hỗ trợ tiếng Việt và không cần tải font từ dịch vụ ngoài.

Logo, hero, banner và ảnh sản phẩm chính được cắt trực tiếp từ ảnh người dùng
cung cấp tại `public/assets/homepage.png`, lưu trong `public/assets/reference`.
Tạo lại bằng `node scripts/crop-home-reference.mjs`. Nội dung chính sách và
đánh giá được ghi rõ là bản xem trước, cần xác nhận trước khi mở bán.

## Ghi chú tương thích

- Phiên bản trực tiếp được ghim trong `package.json`; `package-lock.json`
  lưu dependency tree để cài lại bằng `npm ci`.
- Dùng TypeScript 6 vì bộ lint hiện tại của Next.js chưa hỗ trợ TypeScript 7.
- Dùng ESLint 9 để phù hợp peer dependencies của các plugin trong cấu hình
  Next.js. npm có cảnh báo phiên bản ESLint 9 đã hết hỗ trợ; cần kiểm tra lại
  khả năng chuyển sang ESLint 10 khi các plugin cập nhật tương thích.
- Dùng Webpack cho dev/build vì Turbopack bị môi trường này chặn mở cổng
  nội bộ khi xử lý CSS, kể cả lần chạy đã xin quyền ngoài sandbox.
- npm 9 có thể phát cảnh báo `DEP0169` khi chạy bằng Node.js 24. Đây là cảnh
  báo từ công cụ cài package, không phải lỗi của trang web.
- Báo cáo: `docs/m0-report.md`, `docs/m1-report.md`.
- Nguồn ảnh, prompt và cách thay ảnh: `docs/image-assets.md`.

## Thay nội dung Homepage

- `data/products.ts`: sản phẩm, giá, ảnh, danh mục, nhóm tuổi, đánh giá mẫu.
- `data/categories.ts`: 6 danh mục và 4 nhóm tuổi.
- `data/reviews.ts`: nhân vật/đánh giá hư cấu, đã ghi nhãn minh họa trên UI.
- `data/blog.ts`: nội dung bài viết sắp có, chưa phải bài tư vấn đã xuất bản.
- `components/layout/footer.tsx`: newsletter, liên hệ và thông báo chính sách.
- `components/ui/storefront-provider.tsx`: điều hướng bộ lọc đến trang danh sách và dialog dùng chung.
- `data/product-details.ts`: thương hiệu và phân loại mẫu.
- `components/product/catalog.tsx`: lọc, sắp xếp và phân trang lưu trên URL.
- `components/product/product-detail.tsx`: ảnh, phân loại, số lượng và tạm tính.
- `components/cart/cart-page.tsx`: cập nhật số lượng, xóa món và tổng giỏ hàng mẫu.
- `components/checkout/checkout-page.tsx`: form nhận hàng và hoàn tất đơn hàng mẫu.
- `lib/seo.ts`, `app/robots.ts`, `app/sitemap.ts`: metadata, canonical, robots và sitemap.

Không có email, đơn hàng, tin nhắn hoặc dữ liệu cá nhân nào được gửi/lưu khi
bấm bước đặt hàng. Giỏ chỉ lưu cục bộ trên thiết bị và có thể xóa bất cứ lúc nào.
Cần cung cấp logo, sản phẩm, liên hệ và chính sách đã xác nhận
trước khi triển khai các tích hợp thật.
