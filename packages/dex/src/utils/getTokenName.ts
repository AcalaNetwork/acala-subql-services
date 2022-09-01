import { forceToCurrencyName } from '@acala-network/sdk-core'

export const getTokenName = (token: any) => {
  const tokenName = forceToCurrencyName(token);

  if(tokenName === '{"liquidCroadloan":13}') {
    return 'lc://13'
  } else {
    return tokenName
  }
}