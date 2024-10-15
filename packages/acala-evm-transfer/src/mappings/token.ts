import { Token } from "../types";
import { Erc20__factory } from "../types/contracts";

export async function getToken (address: string) {
  let token = await Token.get(address);

  if (token) {
    return token;
  }

  const erc20 = Erc20__factory.connect(address, api);
  const name = await erc20.name();
  const symbol = await erc20.symbol();
  const decimals = await erc20.decimals();

  token = new Token(address, name, symbol, BigInt(decimals.toString()));

  await token.save();

  return token;
}
