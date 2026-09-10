import { ReferenceImage } from "@/components/ui/reference-image";

const benefits = [
  { image: "shield", title: "Hàng chính hãng", text: "Nguồn gốc rõ ràng" },
  { image: "truck", title: "Giao nhanh", text: "Nội khu Hà Nội" },
  { image: "gift", title: "Freeship toàn quốc", text: "Đơn từ 300.000đ" },
  { image: "box", title: "Đổi trả dễ dàng", text: "Trong 7 ngày" },
  { image: "heart", title: "Tư vấn tận tâm", text: "Luôn đồng hành cùng mẹ" },
];
// Wording reproduced from the supplied mockup, not a live policy.
export function Benefits() {
  return <div className="benefits" aria-label="Lợi ích trong mẫu thiết kế, chính sách chờ xác nhận">
    {benefits.map(benefit => <div className="benefit" key={benefit.image}>
      <ReferenceImage name={"benefit-" + benefit.image} width={41} height={39} />
      <div><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
    </div>)}
  </div>;
}
