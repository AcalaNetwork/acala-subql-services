import { SubstrateEvent } from "@subql/types";
import { XCMIn } from "../types";

export async function handleXCMIn (event: SubstrateEvent) {
  const block = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp;

  logger.info(`handle xcm in event at ${block}`);

  // get all event from the block
  const events = event.block.events;

  // filter all `tokens.Withdrawn` events
  const withdrawnEvents = events.filter((event) => {
    return event.event.section === 'tokens' && event.event.method === 'Withdrawn';
  });
  // filter all `tokens.Deposited` events
  const depositedEvents = events.filter((event) => {
    return event.event.section === 'tokens' && event.event.method === 'Deposited';
  });

  // map withdranEvents events to { token, who, amount }
  const withdrawns = withdrawnEvents.map((event) => {
    const [currency, who, amount] = event.event.data;
    return {
      token: currency.toString(),
      who: who.toString(),
      amount: BigInt(amount.toString())
    }
  });

  // map depositEvents events to { token, who, amount }
  const depositeds = depositedEvents.map((event) => {
    const [currency, who, amount] = event.event.data;
    return {
      token: currency.toString(),
      who: who.toString(),
      amount: BigInt(amount.toString())
    }
  });

  logger.info(`find ${withdrawns.length} withdrawns and ${depositeds.length} depositeds in block ${block}`);
  // try to match withdrawn and deposit, which one withdraw match two deposit, then it is a XCMIn
  const xcmIns = [];

  for (const withdrawn of withdrawns) {
    // find two deposit events which sum of amounts equal to withdrawn amount
    for (let i = 0; i < depositeds.length; i++) {
      const depositeds1 = depositeds[i];

      for (let j = i + 1; j < depositeds.length; j++) {
        const depositeds2 = depositeds[j];

        if (withdrawn.amount === depositeds1.amount + depositeds2.amount) {
          xcmIns.push([withdrawn, [depositeds1, depositeds2]]);
        }
      }
    }
  }

  logger.info(`find ${xcmIns.length} xcm ins in block ${block}`);

  for (let i = 0; i < xcmIns.length; i++) {
    const [withdrawn, depositeds] = xcmIns[i];
    const treasuryAddress = "23M5ttkmR6KcoTAAE6gcmibnKFtVaTP5yxnY8HF1BmrJ2A1i";
    const treasuryDeposited = depositeds.find((deposited) => deposited.who === treasuryAddress);
    const userDeposited = depositeds.find((deposited) => deposited.who !== treasuryAddress);

    // save xcm in event
    const xcmInEntity = new XCMIn(
      `${block}-${withdrawn.who}-${userDeposited.who}-${i}`,
      BigInt(block),
      withdrawn.token,
      withdrawn.who,
      userDeposited.who,
      withdrawn.amount,
      userDeposited.amount,
      treasuryDeposited.amount,
      timestamp
    );

    await xcmInEntity.save();

    logger.info(`save xcm in event ${xcmInEntity.id}, ${userDeposited.who} get ${userDeposited.amount} ${withdrawn.token}`);
  }
}