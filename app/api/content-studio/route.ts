import { getPosts, getSettings, saveSettings, toPublicSettings } from "@/lib/content-studio/store";
import { getSchedulerState, syncScheduler } from "@/lib/content-studio/scheduler";
import type { StudioSettings } from "@/lib/content-studio/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [settings, posts] = await Promise.all([getSettings(), getPosts()]);
  return Response.json({ settings: toPublicSettings(settings), posts, scheduler: getSchedulerState() });
}

export async function PUT(request: Request) {
  const body = await request.json() as Partial<StudioSettings>;
  const settings = await saveSettings(body);
  await syncScheduler();
  return Response.json({ settings: toPublicSettings(settings), scheduler: getSchedulerState() });
}
