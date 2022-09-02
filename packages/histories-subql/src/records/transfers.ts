import { Transfer } from '../types';

export const getTransfer = async (id: string) => {
  let record = await Transfer.get(id);

  if (!record) {
    record = new Transfer(id);

    record.amount = BigInt(0);
  }

  return record;
}