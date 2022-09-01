export const getTotalTVL = (t0: bigint, t1: bigint) => {
  if(t0 !== BigInt(0) && t1 !== BigInt(0)) {
    return t0 + t1;
  } else if(t0 == BigInt(0) && t1 == BigInt(0)) {
    return BigInt(0);
  } else {
    return t0 * BigInt(2) + t1 * BigInt(2);
  }
}