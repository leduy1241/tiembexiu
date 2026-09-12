"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { PublicSettings, StudioPost } from "@/lib/content-studio/types";

type DashboardData = { settings: PublicSettings; posts: StudioPost[]; scheduler: { started: boolean; nextRunAt?: string } };

const icons = {
  sparkles: "✦", clock: "◷", facebook: "f", image: "▧", check: "✓", settings: "⚙", wand: "✦",
};

function relativeTime(value: string) {
  const seconds = Math.round((new Date(value).getTime() - Date.now()) / 1000);
  const formatter = new Intl.RelativeTimeFormat("vi", { numeric: "auto" });
  if (Math.abs(seconds) < 60) return formatter.format(seconds, "second");
  const minutes = Math.round(seconds / 60);
  if (Math.abs(minutes) < 60) return formatter.format(minutes, "minute");
  return formatter.format(Math.round(minutes / 60), "hour");
}

export function ContentStudio() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [form, setForm] = useState<Record<string, string | number | boolean>>({});
  const [busy, setBusy] = useState<"save" | "run" | "toggle" | null>(null);
  const [notice, setNotice] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const load = useCallback(async () => {
    const response = await fetch("/api/content-studio", { cache: "no-store" });
    const next = await response.json() as DashboardData;
    setData(next);
    setForm((current) => Object.keys(current).length ? current : { ...next.settings, openaiApiKey: "", facebookAccessToken: "" });
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => void load(), 0);
    const timer = window.setInterval(() => void load(), 30_000);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); };
  }, [load]);

  async function updateSettings(patch: Record<string, unknown>, mode: "save" | "toggle") {
    setBusy(mode);
    setNotice("");
    try {
      const response = await fetch("/api/content-studio", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const result = await response.json() as Partial<DashboardData> & { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Không thể lưu cấu hình.");
      await load();
      if (mode === "toggle") setForm((current) => ({ ...current, autoPublish: Boolean(patch.autoPublish) }));
      setNotice(mode === "toggle" ? (patch.autoPublish ? "Đã bật lịch tự động." : "Đã tạm dừng lịch.") : "Đã lưu cấu hình an toàn trên máy này.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Có lỗi xảy ra."); }
    finally { setBusy(null); }
  }

  async function runNow() {
    setBusy("run"); setNotice("AI đang nghĩ ý tưởng và tạo ảnh, có thể mất khoảng một phút…");
    try {
      const response = await fetch("/api/content-studio/run", { method: "POST" });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Không thể tạo bài.");
      setNotice(data?.settings.autoPublish ? "Bài mới đã được đăng lên Facebook." : "Đã tạo bản nháp mới.");
      await load();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Có lỗi xảy ra."); }
    finally { setBusy(null); }
  }

  const published = data?.posts.filter((post) => post.status === "published").length ?? 0;
  const nextRun = useMemo(() => data?.scheduler.nextRunAt ? relativeTime(data.scheduler.nextRunAt) : "Đang tạm dừng", [data]);
  const latest = data?.posts[0];

  return (
    <main className="studio-shell">
      <aside className="studio-sidebar">
        <div className="studio-brand"><span className="studio-logo">bé<br />xíu</span><div><strong>Tiệm Bé Xíu</strong><small>Content Studio</small></div></div>
        <nav><a className="active" href="#tong-quan"><span>{icons.sparkles}</span>Tổng quan</a><a href="#bai-viet"><span>{icons.clock}</span>Lịch sử bài viết</a><button onClick={() => setShowSettings(true)}><span>{icons.settings}</span>Cấu hình</button></nav>
        <div className="studio-sidebar-note"><span>💡</span><p><strong>Mẹo nhỏ</strong>Hãy kiểm tra 2–3 bài đầu để tinh chỉnh giọng văn đúng chất Tiệm Bé Xíu.</p></div>
        <div className="studio-profile"><span>BX</span><div><strong>Tiệm Bé Xíu</strong><small>Quản trị viên</small></div><button aria-label="Mở tùy chọn">•••</button></div>
      </aside>

      <section className="studio-content" id="tong-quan">
        <header><div><p>CONTENT AUTOMATION</p><h1>Chào buổi tốt lành! 👋</h1><span>Studio đang giúp bạn chăm sóc fanpage mỗi ngày.</span></div><button className="button secondary" onClick={() => setShowSettings(true)}>{icons.settings} Cấu hình</button></header>

        <section className="status-card">
          <div className="status-copy"><div className="status-icon">{data?.settings.autoPublish ? "▶" : "Ⅱ"}</div><div><div className="eyebrow">TRẠNG THÁI HỆ THỐNG</div><h2>{data?.settings.autoPublish ? "Đang tự động sáng tạo" : "Automation đang tạm dừng"}</h2><p>{data?.settings.autoPublish ? `Mỗi ${data.settings.intervalMinutes} phút, AI sẽ tạo và đăng một bài mới lên Facebook.` : "Bật automation khi bạn đã kiểm tra đầy đủ API key và Page token."}</p></div></div>
          <div className="status-actions"><label className="switch"><input aria-label="Bật hoặc tắt automation" type="checkbox" checked={data?.settings.autoPublish ?? false} disabled={busy !== null} onChange={(event) => void updateSettings({ autoPublish: event.target.checked }, "toggle")} /><span /></label><button className="button primary" disabled={busy !== null} onClick={() => void runNow()}>{busy === "run" ? "Đang sáng tạo…" : `${icons.wand} Tạo bài ngay`}</button></div>
        </section>

        {notice && <div className={`studio-notice ${notice.includes("lỗi") || notice.includes("Chưa") ? "error" : ""}`}>{notice}</div>}

        <section className="metric-grid">
          <article><div className="metric-icon coral">{icons.clock}</div><span>BÀI ĐÃ TẠO</span><strong>{data?.posts.length ?? 0}</strong><small>50 bài gần nhất</small></article>
          <article><div className="metric-icon green">{icons.facebook}</div><span>ĐÃ ĐĂNG FACEBOOK</span><strong>{published}</strong><small>Đăng tự động thành công</small></article>
          <article><div className="metric-icon amber">{icons.clock}</div><span>LẦN CHẠY TIẾP</span><strong className="metric-time">{nextRun}</strong><small>{data?.settings.autoPublish ? `Chu kỳ ${data.settings.intervalMinutes} phút` : "Bật công tắc để bắt đầu"}</small></article>
        </section>

        <section className="latest-grid">
          <article className="latest-card">
            <div className="section-heading"><div><span>BÀI VIẾT MỚI NHẤT</span><h2>{latest?.title || "Chưa có bài viết nào"}</h2></div>{latest && <span className={`pill ${latest.status}`}>{latest.status === "published" ? "Đã đăng" : latest.status === "draft" ? "Bản nháp" : "Có lỗi"}</span>}</div>
            {latest ? <div className="post-preview">{latest.imageUrl ? <Image src={latest.imageUrl} alt={latest.title} width={170} height={170} unoptimized /> : <div className="image-placeholder">{icons.image}</div>}<div><p>{latest.content || latest.error}</p><small>{new Date(latest.createdAt).toLocaleString("vi-VN")}</small></div></div> : <div className="empty-state">Nhấn “Tạo bài ngay” để AI bắt đầu sáng tạo bài đầu tiên.</div>}
          </article>
          <aside className="flow-card"><span>QUY TRÌNH TỰ ĐỘNG</span><h2>Mỗi bài viết được tạo thế nào?</h2>{[["01", "Nghĩ ý tưởng", "Không trùng các chủ đề gần đây"], ["02", "Viết nội dung", "Đúng giọng Tiệm Bé Xíu"], ["03", "Tạo hình ảnh", "Ảnh vuông, nhẹ nhàng, không chữ"], ["04", "Đăng Facebook", "Qua Page access token"]].map(([number, title, description]) => <div className="flow-step" key={number}><b>{number}</b><div><strong>{title}</strong><small>{description}</small></div><i>{icons.check}</i></div>)}</aside>
        </section>

        <section className="history" id="bai-viet"><div className="section-heading"><div><span>LỊCH SỬ GẦN ĐÂY</span><h2>Các bài đã xử lý</h2></div></div><div className="history-list">{data?.posts.slice(0, 8).map((post) => <article key={post.id}>{post.imageUrl ? <Image src={post.imageUrl} alt="" width={42} height={42} unoptimized /> : <div className="history-placeholder">!</div>}<div><strong>{post.title}</strong><p>{post.error || post.idea}</p></div><time>{relativeTime(post.createdAt)}</time><span className={`pill ${post.status}`}>{post.status === "published" ? "Đã đăng" : post.status === "draft" ? "Bản nháp" : "Lỗi"}</span></article>)}</div></section>
      </section>

      {showSettings && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowSettings(false); }}><section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title"><button className="modal-close" aria-label="Đóng" onClick={() => setShowSettings(false)}>×</button><span className="modal-kicker">THIẾT LẬP KẾT NỐI</span><h2 id="settings-title">Cấu hình Content Studio</h2><p>Token được lưu phía server trên máy này và không hiển thị lại trên trình duyệt.</p><div className="form-grid"><label>OpenAI API key<input type="password" placeholder={data?.settings.hasOpenaiApiKey ? "Đã lưu ••••••••" : "sk-…"} value={String(form.openaiApiKey ?? "")} onChange={(event) => setForm({ ...form, openaiApiKey: event.target.value })} /></label><label>Facebook Page ID<input placeholder="Ví dụ: 123456789" value={String(form.facebookPageId ?? "")} onChange={(event) => setForm({ ...form, facebookPageId: event.target.value })} /></label><label className="wide">Facebook Page access token<input type="password" placeholder={data?.settings.hasFacebookAccessToken ? "Đã lưu ••••••••" : "EAAB…"} value={String(form.facebookAccessToken ?? "")} onChange={(event) => setForm({ ...form, facebookAccessToken: event.target.value })} /></label><label>Chu kỳ (phút)<input type="number" min="1" value={Number(form.intervalMinutes ?? 15)} onChange={(event) => setForm({ ...form, intervalMinutes: Number(event.target.value) })} /></label><label>Model viết bài<input value={String(form.contentModel ?? "")} onChange={(event) => setForm({ ...form, contentModel: event.target.value })} /></label><label>Model tạo ảnh<input value={String(form.imageModel ?? "")} onChange={(event) => setForm({ ...form, imageModel: event.target.value })} /></label><label className="wide">Nhóm chủ đề<textarea rows={3} value={String(form.topics ?? "")} onChange={(event) => setForm({ ...form, topics: event.target.value })} /></label><label className="wide">Giọng thương hiệu<textarea rows={3} value={String(form.brandVoice ?? "")} onChange={(event) => setForm({ ...form, brandVoice: event.target.value })} /></label></div><div className="modal-actions"><button className="button secondary" onClick={() => setShowSettings(false)}>Hủy</button><button className="button primary" disabled={busy !== null} onClick={async () => { await updateSettings({ ...form, autoPublish: data?.settings.autoPublish ?? false }, "save"); setShowSettings(false); }}>{busy === "save" ? "Đang lưu…" : "Lưu cấu hình"}</button></div></section></div>}
    </main>
  );
}
