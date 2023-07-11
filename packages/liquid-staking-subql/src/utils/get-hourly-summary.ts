import { HourlySummary } from "../types";

export async function getHourlySummary (timestamp: Date) {
  let summary = await HourlySummary.get(timestamp.getTime().toString());

  if (!summary) {
    summary = new HourlySummary(
      timestamp.getTime().toString(),
      BigInt(0),
      BigInt(0),
      new Date(),
      BigInt(0)
    );
    summary.timestamp = timestamp;
  }

  return summary;
}