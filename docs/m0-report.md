# Báo cáo M0 — Tiệm Bé Xíu

Ngày: 09/09/2026. Phạm vi: khởi tạo dự án và homepage placeholder.

## Kết quả

- Next.js App Router, React, TypeScript strict và Tailwind CSS đã cấu hình.
- Design tokens coral, sage, warm cream, màu chữ, focus, radius và shadow đã tạo.
- Trang placeholder tiếng Việt, logo chữ, metadata title/description cơ bản.
- Chưa triển khai Home V1, backend, cart, checkout, authentication, CMS, tracking
  hoặc deploy. Dừng tại M0, chờ người dùng yêu cầu M1.

## File đã tạo

- `package.json`, `package-lock.json`: scripts và phiên bản package.
- `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`.
- `.gitignore`, `.nvmrc`.
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`.
- `.gitkeep` trong `components/layout`, `components/home`, `components/product`,
  `components/ui`, `data`, `types`, `public/assets/logo`.
- `README.md`, `docs/m0-report.md`.
- `AGENTS.md`, `CLAUDE.md`: tự sinh bởi Next.js dev server, đã đọc và giữ lại.
- `next-env.d.ts`, `.next/`, `tsconfig.tsbuildinfo`: tự sinh phục vụ build/types,
  không đưa vào Git.
- `.tools/node/`: Node.js 24.20.0 riêng cho môi trường local, không đưa vào Git.

## Package đã cài

| Package | Phiên bản |
| --- | --- |
| next / eslint-config-next | 16.3.4 |
| react / react-dom | 19.2.8 |
| typescript | 6.0.3 |
| tailwindcss / @tailwindcss/postcss | 4.3.3 |
| eslint | 9.39.5 |
| @types/node | 24.13.3 |
| @types/react | 19.2.18 |
| @types/react-dom | 19.2.7 |

Không thêm UI framework, icon library hoặc animation library.
Playwright 1.63.0 được cài riêng tại `/tmp/tiembexiu-browser-check` để kiểm tra
Chrome headless sẵn có, không phải dependency của website.

## Chạy local trên máy này

```bash
cd /home/so/Duycode/tiembexiu
export PATH="$PWD/.tools/node/node_modules/.bin:$PATH"
npm run dev
```

URL: <http://localhost:3000> (server bind `127.0.0.1:3000`). Dev server được
để chạy sau khi hoàn tất M0. Xem README nếu cần cài lại hoặc chạy production.

## Xác minh cuối cùng

| Kiểm tra | Kết quả |
| --- | --- |
| `npm run lint` | PASS, 0 lỗi và 0 warning |
| `npm run typecheck` | PASS |
| `npm run build` | PASS, trang `/` được prerender tĩnh |
| HTTP trên dev server | 200 |
| Console/page errors | 0 sau khi thêm favicon trống |
| 375 / 390 / 768 / 1024 / 1440px | PASS, scrollWidth bằng viewport ở cả 5 độ rộng |
| Tiếng Việt, title, màu nền, border radius | Đúng với cấu hình |
| Xem ảnh chụp | Đã xem mobile 375px và desktop 1440px |
| npm audit trong lần cài cuối | 0 vulnerabilities tại thời điểm kiểm tra |

Ảnh và kết quả kiểm tra tạm nằm trong `/tmp/tiembexiu-browser-check`.
Trang M0 không có nút mua hàng hoặc navigation nên chưa có luồng tương tác
hay touch target thương mại để kiểm thử.

## Warning và lỗi đã xử lý / giới hạn còn lại

- Node.js hệ thống là 18.19.1; dùng runtime riêng Node.js 24.20.0 cho dự án.
- TypeScript 7 không tương thích bộ lint: đã ghim TypeScript 6.0.3.
- Turbopack không mở được cổng nội bộ trong môi trường này dù đã thử chạy
  ngoài sandbox: đã dùng Webpack cho cả dev và build.
- Build trong sandbox gặp lỗi đọc kết quả tiến trình TypeScript; cùng lệnh
  Webpack chạy ngoài sandbox đã PASS. Dev server cũng cần quyền mở cổng local.
- Cảnh báo ESLint 9 hết hỗ trợ vẫn là lưu ý dependency. Giữ bản 9 vì các plugin
  React, JSX accessibility và import hiện chưa khai báo hỗ trợ ESLint 10.
- npm 9 phát cảnh báo `DEP0169` khi cài gói bằng Node.js 24; không phải lỗi app.
- Lần cài ban đầu có peer warnings do TypeScript 7; lần cài TypeScript 6 không
  còn peer warnings. Công cụ Playwright tạm có engine warning khi cài bằng
  npm/Node hệ thống, nhưng kiểm tra thực tế đã chạy bằng Node.js 24 và PASS.
- Browser trong ứng dụng không có kết nối. Responsive được kiểm tra bằng
  Chrome headless, chưa kiểm tra trên thiết bị iOS/Android thật.
- Favicon hiện là SVG trống inline để tránh 404; chờ logo gốc, không tạo logo mới.
