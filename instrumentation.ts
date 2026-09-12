export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { syncScheduler } = await import("./lib/content-studio/scheduler");
    await syncScheduler();
  }
}
