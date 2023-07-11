import { Summary } from "../types";

export async function getSummary () {
  return Summary.get('liquid-staking');
}