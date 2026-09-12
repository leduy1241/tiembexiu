import "server-only";

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { addPost, getPosts, getSettings } from "./store";
import type { StudioPost, StudioSettings } from "./types";

type GeneratedContent = { idea: string; title: string; content: string; imagePrompt: string };

let running = false;

function apiError(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "error" in data) {
    const error = (data as { error?: { message?: string } }).error;
    return error?.message ?? fallback;
  }
  return fallback;
}

async function generateContent(settings: StudioSettings): Promise<GeneratedContent> {
  const recent = (await getPosts()).slice(0, 12).map((post) => post.idea).filter(Boolean);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${settings.openaiApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: settings.contentModel,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: "Bạn là content strategist cho fanpage Tiệm Bé Xíu tại Việt Nam. Viết nội dung hữu ích, đúng mực cho ba mẹ; không bịa số liệu hay tư vấn y khoa; không lặp ý tưởng gần đây. Chỉ trả về JSON hợp lệ." }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: `Chủ đề: ${settings.topics}\nGiọng thương hiệu: ${settings.brandVoice}\nÝ tưởng đã dùng gần đây: ${recent.join(" | ") || "chưa có"}\nHãy tạo 1 bài Facebook tiếng Việt gồm: idea, title, content (120-220 từ, mở bài cuốn hút, xuống dòng dễ đọc, 3-5 emoji tự nhiên, CTA nhẹ và 3-5 hashtag), imagePrompt (tiếng Anh, ảnh lifestyle mẹ và bé dịu dàng, không chữ, không logo, tỷ lệ vuông).` }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "facebook_post",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["idea", "title", "content", "imagePrompt"],
            properties: {
              idea: { type: "string" }, title: { type: "string" }, content: { type: "string" }, imagePrompt: { type: "string" },
            },
          },
        },
      },
    }),
  });
  const data = await response.json() as { output_text?: string; error?: { message?: string } };
  if (!response.ok) throw new Error(apiError(data, "Không thể tạo nội dung."));
  if (!data.output_text) throw new Error("OpenAI không trả về nội dung.");
  return JSON.parse(data.output_text) as GeneratedContent;
}

async function generateImage(settings: StudioSettings, prompt: string): Promise<Buffer> {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${settings.openaiApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: settings.imageModel, prompt, size: "1024x1024", quality: "medium", output_format: "webp" }),
  });
  const data = await response.json() as { data?: Array<{ b64_json?: string; url?: string }>; error?: { message?: string } };
  if (!response.ok) throw new Error(apiError(data, "Không thể tạo ảnh."));
  const image = data.data?.[0];
  if (image?.b64_json) return Buffer.from(image.b64_json, "base64");
  if (image?.url) {
    const imageResponse = await fetch(image.url);
    return Buffer.from(await imageResponse.arrayBuffer());
  }
  throw new Error("OpenAI không trả về dữ liệu ảnh.");
}

async function publishToFacebook(settings: StudioSettings, caption: string, image: Buffer) {
  const form = new FormData();
  form.append("caption", caption);
  form.append("access_token", settings.facebookAccessToken);
  form.append("source", new Blob([new Uint8Array(image)], { type: "image/webp" }), "tiem-be-xiu.webp");
  const response = await fetch(`https://graph.facebook.com/v23.0/${encodeURIComponent(settings.facebookPageId)}/photos`, { method: "POST", body: form });
  const data = await response.json() as { id?: string; post_id?: string; error?: { message?: string } };
  if (!response.ok) throw new Error(apiError(data, "Facebook từ chối đăng bài."));
  return data.post_id ?? data.id;
}

export async function runPipeline(): Promise<StudioPost> {
  if (running) throw new Error("Một bài viết khác đang được xử lý.");
  running = true;
  const id = crypto.randomUUID();
  try {
    const settings = await getSettings();
    if (!settings.openaiApiKey) throw new Error("Chưa có OpenAI API key.");
    const content = await generateContent(settings);
    const image = await generateImage(settings, content.imagePrompt);
    const imageDirectory = path.join(process.cwd(), "public", "generated");
    await mkdir(imageDirectory, { recursive: true });
    const imagePath = path.join(imageDirectory, `${id}.webp`);
    await writeFile(imagePath, image);
    let facebookPostId: string | undefined;
    if (settings.autoPublish) {
      if (!settings.facebookPageId || !settings.facebookAccessToken) throw new Error("Chưa đủ Page ID hoặc Facebook Page access token.");
      facebookPostId = await publishToFacebook(settings, content.content, image);
    }
    const post: StudioPost = { id, createdAt: new Date().toISOString(), status: settings.autoPublish ? "published" : "draft", ...content, imageUrl: `/generated/${id}.webp`, facebookPostId };
    await addPost(post);
    return post;
  } catch (error) {
    const failed: StudioPost = { id, createdAt: new Date().toISOString(), status: "failed", title: "Tạo bài chưa thành công", content: "", idea: "", imagePrompt: "", error: error instanceof Error ? error.message : "Lỗi không xác định" };
    await addPost(failed);
    throw error;
  } finally {
    running = false;
  }
}

export function isPipelineRunning() { return running; }
