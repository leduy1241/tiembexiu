import Link from "next/link";
import { ReferenceImage } from "@/components/ui/reference-image";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Tiệm Bé Xíu — Trang chủ">
      <ReferenceImage
        name={footer ? "footer-logo" : "logo"}
        width={footer ? 155 : 154}
        height={footer ? 77 : 75}
        alt="Tiệm Bé Xíu — Những món đồ nhỏ xinh dành cho em bé iu"
        preload={!footer}
      />
    </Link>
  );
}
