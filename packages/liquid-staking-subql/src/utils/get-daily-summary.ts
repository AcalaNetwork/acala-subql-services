import { DailySummary } from "../types";

export async function getDailySummary (timestamp: Date) {
  let summary = await DailySummary.get(timestamp.getTime().toString());

  if (!summary) {
    summary = new DailySummary(timestamp.toString());

    summary.timestamp = timestamp;
  }

  return summary;
}