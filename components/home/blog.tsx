"use client";
import { posts } from "@/data/blog";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReferenceImage } from "@/components/ui/reference-image";
import { Icon } from "@/components/ui/icon";
import { useStorefront } from "@/components/ui/storefront-provider";

export function Blog() {
  const { showNotice } = useStorefront();
  return <section id="goc-cua-me" className="home-section blog-section" aria-labelledby="blog-title">
    <SectionHeading id="blog-title" title="Góc của mẹ" subtitle="Kiến thức hay, đồng hành cùng mẹ nuôi con khỏe, con vui" icon="heart">
      <button className="text-link" onClick={() => showNotice({title: "Góc của mẹ", description: "Các bài viết đang được chuẩn bị. Nội dung trong giao diện hiện là mẫu để xem trước."})}>Xem tất cả <Icon name="arrow" size={13} /></button>
    </SectionHeading>
    <div className="blog-grid">{posts.map((post, index) => <article className="blog-card" key={post.id}>
      <button className="blog-open" onClick={() => showNotice({ title: post.title, description: post.excerpt })}>
        <ReferenceImage name={"blog-" + (index + 1)} width={127} height={66} alt={"Ảnh trong mẫu thiết kế: " + post.title} />
        <div className="blog-copy"><h3>{post.title}</h3><span className="blog-date">{["12/09/2023", "10/09/2023", "08/09/2023"][index]}</span></div>
      </button>
    </article>)}</div>
  </section>;
}
