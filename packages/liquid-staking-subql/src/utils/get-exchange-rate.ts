export function getExchangeRate (
  toBondPool: bigint,
  bonded: bigint,
  liquidIssuance: bigint,
  totalVoidLiquid: bigint,
  decimals: number
) {
  const factor = BigInt(10 ** decimals);

  return (toBondPool + bonded) * factor / (liquidIssuance + totalVoidLiquid)
}