import { Summary } from "../types";

export async function getSummary () {
  return await Summary.get('liquid-staking');
}