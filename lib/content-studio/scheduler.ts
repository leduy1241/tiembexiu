import "server-only";

import { getSettings } from "./store";
import { runPipeline } from "./pipeline";

type SchedulerState = { timer?: NodeJS.Timeout; nextRunAt?: string; started: boolean };
const globalScheduler = globalThis as typeof globalThis & { __tiemBeXiuScheduler?: SchedulerState };
const state = globalScheduler.__tiemBeXiuScheduler ?? { started: false };
globalScheduler.__tiemBeXiuScheduler = state;

export async function syncScheduler() {
  if (state.timer) clearTimeout(state.timer);
  state.timer = undefined;
  state.nextRunAt = undefined;
  const settings = await getSettings();
  state.started = settings.autoPublish;
  if (!settings.autoPublish) return;
  const delay = settings.intervalMinutes * 60_000;
  state.nextRunAt = new Date(Date.now() + delay).toISOString();
  state.timer = setTimeout(async () => {
    try { await runPipeline(); } catch (error) { console.error("[Content Studio]", error); }
    await syncScheduler();
  }, delay);
}

export function getSchedulerState() { return { started: state.started, nextRunAt: state.nextRunAt }; }
