import { SubstrateEvent } from "@subql/types";

export const isNewAccount = (address: string, event: SubstrateEvent) => {
  const events = event.block.events;

  const newAccountEvents = events.filter((item) => {
    return item.event.section === 'system' && item.event.method === 'NewAccount'
  });

  const testResult = newAccountEvents.filter((item) => {
    const [account] = item.event.data;

    return account.toString() === address;
  })

  return testResult.length !== 0
}