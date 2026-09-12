import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PublicSettings, StudioPost, StudioSettings } from "./types";

const dataDirectory = path.join(process.cwd(), ".data", "content-studio");
const settingsFile = path.join(dataDirectory, "settings.json");
const postsFile = path.join(dataDirectory, "posts.json");

const defaults: StudioSettings = {
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  facebookPageId: process.env.FACEBOOK_PAGE_ID ?? "",
  facebookAccessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN ?? "",
  intervalMinutes: 15,
  contentModel: process.env.OPENAI_CONTENT_MODEL ?? "gpt-5-mini",
  imageModel: process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1",
  brandVoice: "Ấm áp, gần gũi, đáng tin cậy; xưng Tiệm Bé Xíu và gọi người đọc là ba mẹ. Không hù dọa, không đưa chẩn đoán y khoa.",
  topics: "chăm sóc mẹ và bé, ăn dặm, giấc ngủ, vệ sinh, phát triển theo độ tuổi, mẹo chọn đồ dùng an toàn",
  autoPublish: false,
};

async function ensureDataDirectory() {
  await mkdir(dataDirectory, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function getSettings(): Promise<StudioSettings> {
  const stored = await readJson<Partial<StudioSettings>>(settingsFile, {});
  return { ...defaults, ...stored };
}

export async function saveSettings(input: Partial<StudioSettings>): Promise<StudioSettings> {
  await ensureDataDirectory();
  const current = await getSettings();
  const next = {
    ...current,
    ...input,
    intervalMinutes: Math.max(1, Math.round(Number(input.intervalMinutes ?? current.intervalMinutes))),
    openaiApiKey: input.openaiApiKey?.trim() || current.openaiApiKey,
    facebookAccessToken: input.facebookAccessToken?.trim() || current.facebookAccessToken,
  };
  await writeFile(settingsFile, JSON.stringify(next, null, 2), "utf8");
  return next;
}

export function toPublicSettings(settings: StudioSettings): PublicSettings {
  const { openaiApiKey, facebookAccessToken, ...safe } = settings;
  return {
    ...safe,
    hasOpenaiApiKey: Boolean(openaiApiKey),
    hasFacebookAccessToken: Boolean(facebookAccessToken),
  };
}

export async function getPosts(): Promise<StudioPost[]> {
  return readJson<StudioPost[]>(postsFile, []);
}

export async function addPost(post: StudioPost): Promise<void> {
  await ensureDataDirectory();
  const posts = await getPosts();
  await writeFile(postsFile, JSON.stringify([post, ...posts].slice(0, 50), null, 2), "utf8");
}
