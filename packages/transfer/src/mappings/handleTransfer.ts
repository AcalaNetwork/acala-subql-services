import { SubstrateEvent } from '@subql/types'
import { AccountType } from '../types';
import { getAccount, getBlock, getExtrinsic, getToken, getTransfer } from '../utils/records'

export async function handleTransfer(
    tokenName: string,
    fromId: string,
    toId: string,
    amount: bigint,
    originEvent: SubstrateEvent
) {
    const originBlock = originEvent.block;
    const originExtrisnic = originEvent.extrinsic;
    const block = await getBlock(originBlock);
    const token = await getToken(tokenName);
    const from = await getAccount(fromId);
    const to = await getAccount(toId);
    const transferId = `${block.id}-${originEvent.idx.toString()}`;
    const transfer = await getTransfer(transferId);

    // update token record
    token.transferVolume = token.transferVolume + amount;
    token.txCount = token.txCount + 1;
    token.updateAt = block.timestamp;
    token.updateAtBlockId = block.id;
    // update from account record
    from.txCount = from.txCount + 1;
    from.updateAt = block.timestamp;
    from.updateAtBlockId = block.id;
    // update to account record
    to.txCount = to.txCount + 1;
    to.updateAt = block.timestamp;
    to.updateAtBlockId = block.id;
    // update tranfser history record
    transfer.tokenId = token.id;
    transfer.fromId = from.id;
    transfer.toId = to.id;
    transfer.amount = amount;
    transfer.isSystemCall = from.type !== AccountType.USER || to.type !== AccountType.USER
    transfer.blockId = block.id;
    transfer.timestamp = block.timestamp;

    if (originExtrisnic) {
        const extrinsic = await getExtrinsic(originExtrisnic);

        transfer.extrinsicId = extrinsic.id;
    }

    await token.save();
    await from.save();
    await to.save();
    await transfer.save();
}
