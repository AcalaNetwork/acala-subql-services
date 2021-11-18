import { Account, Collateral } from "../types"

export const ensureAccount = async (address: string) => {
  const _account = await Account.get(address);

  if(_account) {
    return _account;
  }
  else {
    const newAccount = new Account(address);
    newAccount.address = address;
    await newAccount.save();

    return newAccount;
  }
}

export const ensureCollateral = async (token: string) => {
  const _collateral = await Collateral.get(token);

  if(_collateral) {
    return _collateral;
  }
  else {
    const newcollateral = new Collateral(token);
    newcollateral.token = token;
    await newcollateral.save();

    return newcollateral;
  }
}