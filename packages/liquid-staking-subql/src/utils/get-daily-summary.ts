import { DailySummary } from "../types";

export async function getDailySummary (timestamp: Date) {
  let summary = await DailySummary.get(timestamp.getTime().toString());

  if (!summary) {
    summary = new DailySummary(
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