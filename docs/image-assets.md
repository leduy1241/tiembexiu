# Ảnh Homepage — bản khớp mẫu

Homepage hiện dùng ảnh người dùng cung cấp tại `public/assets/homepage.png`
(1024 × 1536). File gốc được giữ nguyên. Script `scripts/crop-home-reference.mjs`
cắt 40 phần thành WebP lossless trong `public/assets/reference/`; tọa độ được
ghi trong `crops.json`. Không tạo lại hình bằng AI trong lần sửa này.

Chạy lại sau khi sửa tọa độ:

```bash
export PATH="$PWD/.tools/node/node_modules/.bin:$PATH"
node scripts/crop-home-reference.mjs
```

Các phần cắt gồm logo, hero, danh mục, ảnh sản phẩm, banner, nhóm tuổi,
icon, thẻ đánh giá và thumbnail bài viết. `ReferenceImage` dùng ảnh không nén
lại để giữ chữ trong mẫu. Header, tìm kiếm, tên/giá sản phẩm, bộ lọc, footer
và các nút tương tác được dựng bằng HTML/CSS. Chữ nằm trong banner hoặc thẻ
ảnh cần sửa ảnh/cắt lại nếu thay nội dung. Mobile sắp xếp lại thành các cột
nhỏ hơn; hero dùng hai phần cắt riêng.

Thông tin sản phẩm, chính sách và đánh giá trong mẫu là nội dung của bản xem
trước, chưa được xác nhận để mở bán. Các ảnh AI của bản cũ vẫn được giữ lại;
hero và sáu ảnh sản phẩm chính hiện đã chuyển sang ảnh cắt từ mẫu.

## Lưu trữ: ảnh minh họa của M1 trước khi khớp mẫu

Ảnh được tạo bằng **ImageGen tích hợp** (không dùng CLI/API riêng), ngày 09/09/2026.
Đây là nội dung AI hư cấu, không phải ảnh khách hàng hay bao bì sản phẩm có thật.
Không tạo logo thương hiệu. Website không tải ảnh từ website ngoài.

## File dùng trong website

- `public/assets/images/hero-baby-demo.webp`: 1200 × 800, khoảng 49 KB.
- `public/assets/images/products/diapers-demo.webp`
- `public/assets/images/products/nutrition-demo.webp`
- `public/assets/images/products/feeding-demo.webp`
- `public/assets/images/products/cleanser-demo.webp`
- `public/assets/images/products/wipes-demo.webp`
- `public/assets/images/products/stroller-demo.webp`

Sáu ảnh sản phẩm có kích thước 440 × 440, được cắt từ sáu ô ảnh đã tạo,
chuyển sang WebP để dùng trong giao diện. Tổng dung lượng bảy ảnh khoảng 90 KB.
`sharp` có sẵn trong dependency tree của Next.js được dùng để resize/cắt ô/nén,
không cài thêm package xử lý ảnh cho website.

Thay hero tại `components/home/hero.tsx`; thay ảnh sản phẩm và giá tại
`data/products.ts`. Banner và bài viết cũng dùng lại các ảnh minh họa này.
Trước khi mở bán, thay bằng ảnh và dữ liệu đã xác nhận của cửa hàng.

## Prompt hero

Use case: photorealistic-natural. Asset type: placeholder hero photograph for a
Vietnamese boutique mother and baby ecommerce homepage, Tiệm Bé Xíu. Generate one
high-quality wide 3:2 photograph only, no website UI. Subject: an adorable smiling
Vietnamese baby about 7 months old, wearing a cream knitted bear-ear bonnet and an
ivory cotton onesie, tummy time on a warm cream quilt, looking toward camera.
Medium shot including both hands, correct natural anatomy. Gentle warm morning
window light, soft pale beige nursery background, premium tender candid
photography, realistic fabric textures. Baby positioned center-right, some clean
cream negative space on left. Palette warm cream, oatmeal, subtle peach. No
words, no logo, no watermark, no collage. This is a fictional AI-generated
placeholder image for a website, not a real customer photo.

## Prompt bộ ảnh sản phẩm

Use case: product-mockup. Create a 3 columns by 2 rows contact sheet containing
SIX separate high-end ecommerce product placeholder photographs for a baby
boutique. Exactly equal rectangular panels, all same clean warm ivory background
#FAF6F0, no borders, no gutters. Each object fully visible, individually centered
in its own panel with generous padding (at least 15% margins) and realistic soft
shadow. Top left: a white and pastel sage baby diaper package with a tiny simple
leaf decoration, no text. Top center: a white cylindrical baby nutrition tin with
pale blue label and powder-blue plastic lid, no text. Top right: muted peach
silicone baby feeding set of suction bowl, spoon, fork and divided plate. Bottom
left: a translucent bottle of baby bottle cleanser with white pump and soft pale
peach label, no text. Bottom center: a white and pastel lavender soft packet of
baby wipes with a white flip top, no text. Bottom right: a full compact beige and
black baby stroller in side three-quarter view, all wheels fully visible. Every
panel distinct single product set. Straight clean studio packshot realism,
boutique ecommerce catalog, restrained pastel palette. No people, no brand logos,
no words, no watermarks. Landscape overall 3:2 aspect ratio, each of six panels
square. This is fictional placeholder product imagery, not reproductions of real
branded products.
