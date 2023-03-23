import { HourlySummary } from "../types";

export async function getHourlySummary (timestamp: Date) {
  let summary = await HourlySummary.get(timestamp.getTime().toString());

  if (!summary) {
    summary = new HourlySummary(timestamp.toString());
    summary.timestamp = timestamp;
  }

  return summary;
}