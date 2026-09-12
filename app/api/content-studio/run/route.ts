import { runPipeline } from "@/lib/content-studio/pipeline";

export const runtime = "nodejs";

export async function POST() {
  try {
    return Response.json({ post: await runPipeline() });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Không thể tạo bài." }, { status: 500 });
  }
}
