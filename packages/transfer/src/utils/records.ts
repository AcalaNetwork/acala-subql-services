import { getTokenDecimals, isSystemAccount } from '@acala-network/subql-utils';
import { SubstrateBlock, SubstrateExtrinsic } from '@subql/types';
import { Account, AccountType, Block, Extrinsic, Token, Transfer } from '../types';

export const getBlock = async (block: SubstrateBlock) => {
  const id = block.block.header.number.toString();

  let record = await Block.get(id);

  if (!record) {
    record = new Block(id);

    record.hash = block.block.hash.toString();
    record.number = BigInt(id);
    record.timestamp = block.timestamp;

    await record.save();
  }

  return record
}

export const getExtrinsic = async (extrinsic: SubstrateExtrinsic) => {
  const id = extrinsic.extrinsic.hash.toString();

  let record = await Extrinsic.get(id);

  if (!record) {
    record = new Extrinsic(id);

    const block = await getBlock(extrinsic.block);
    const account = await getAccount(extrinsic.extrinsic.signer.toString());

    record.senderId = account.id;
    record.section = extrinsic.extrinsic.method.section.toString();
    record.method = extrinsic.extrinsic.method.method.toString();
    record.hash = extrinsic.extrinsic.hash.toString();
    record.blockId = block.id;
    record.raw = extrinsic.extrinsic.toHex();

    await account.save();
    await record.save();
  }

  return record;
}

export const getAccount = async (address: string) => {
  const id = address;

  let record = await Account.get(id);

  if (!record) {
    record = new Account(id);

    const systemAccount = isSystemAccount(address);

    record.address = id;
    record.type = systemAccount ? AccountType.SYSTEM : AccountType.USER;
    record.name =  systemAccount ? systemAccount.name : 'user'; 
    record.txCount = 0;
  }

  return record;
}

export const getToken = async (token: string) => {
  const id = token;

  let record = await Token.get(id);

  if (!record) {
    record = new Token(token);

    const decimals = await getTokenDecimals(api as any, token);

    record.name = token;
    record.decimals = decimals;
    record.transferVolume = BigInt(0);
    record.txCount = 0;
  }

  return record;
}

export const getTransfer = async (id: string) => {
  let record = await Transfer.get(id);

  if (!record) {
    record = new Transfer(id);

    record.amount = BigInt(0);
  }

  return record;
}