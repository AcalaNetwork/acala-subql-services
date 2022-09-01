import { forceToCurrencyName } from "@acala-network/sdk-core";

export const getPoolId = (data: any) => {
  if(data?.isDexIncentive) {
    return `dex-${forceToCurrencyName(data.asDexIncentive)}`;
  } else if(data?.isDexSaving) {
    return `dex-${forceToCurrencyName(data.asDexSaving)}`;
  } else if(data?.isDex) {
    return `dex-${forceToCurrencyName(data.asDex)}`;
  } else if(data?.isLoans) {
    return `loans-${forceToCurrencyName(data.asLoans)}`;
  } else if(data?.isLoansIncentive) {
    return `loans-${forceToCurrencyName(data.asLoansIncentive)}`;
  } else {
    return data.toString();
  }
};