import type { ReactNode } from "react";
import { type IconName } from "./icon";
import { ReferenceImage } from "./reference-image";

export function SectionHeading({
  id,
  title,
  subtitle,
  icon = "heart",
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  icon?: IconName;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="section-title-group">
        <span className={`section-icon section-icon-${icon}`}>
          <ReferenceImage name={id === "blog-title" ? "heading-blog" : "heading-" + (icon === "star" || icon === "fire" ? icon : "heart")} width={28} height={32} />
        </span>
        <div>
          <h2 id={id}>{title}{["categories-title", "age-title", "reviews-title"].includes(id) && <span className="heading-heart" aria-hidden="true">♥</span>}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
