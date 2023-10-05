import { UserPool } from '../types/models/UserPool';
import { Pool } from '../types/models/Pool';

export async function getUserPoolEntity (address: string) {
  // get user entity
  const entity = await UserPool.get(address);

  if (!entity) {
    return UserPool.create({
      id: address,

      address,
      share: BigInt(0),

      updatedAt: BigInt(0),
      timestamp: new Date()
    });
  }

  return entity;
}

export async function getPoolEntity (id: string) {
  // get pool entity
  const entity = await Pool.get(id);

  if (!entity) {
    return Pool.create({
      id,

      totalShares: BigInt(0),

      updatedAt: BigInt(0),
      timestamp: new Date()
    });
  }

  return entity;
}
