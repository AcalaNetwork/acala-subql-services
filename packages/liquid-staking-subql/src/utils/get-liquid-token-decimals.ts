export function getLiquidTokenDecimals(): number {
  const tokens = api.registry.chainTokens;
  const decimals = api.registry.chainDecimals;

  if (tokens.includes('LKSM')) {
    return Number(decimals[tokens.indexOf('LKSM')]);
  }

  if (tokens.includes('LDOT')) {
    return Number(decimals[tokens.indexOf('LDOT')]);
  }

  return 12;
}