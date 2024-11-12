import { SubstrateEvent } from "@subql/types";
import { ensureBlock, ensureExtrinsic } from ".";
import { getAccount, getStartOfHour, getStableAssetSwap, getStableAssetPoolHourlyData } from "../utils";
import { getPoolId } from "../utils/getPoolId";
import { getTokenName } from '../utils/getTokenName';

const getTotalStaking = async (api: any) => {
    const toBond = await api.query.homa.toBondPool();
    const stakingLedgers = await api.query.homa.stakingLedgers.entries();
    let totalInSubAccount = BigInt(0);
    stakingLedgers.map((item: any) => {
      const ledge = (item[1] as any).unwrapOrDefault();
      totalInSubAccount = totalInSubAccount + BigInt(ledge.bonded.unwrap().toString());
    });
    return BigInt(toBond.toString()) + totalInSubAccount;
};
  
const getTotalLiquidity = async (api: any, tokenName: any) => {
    const issuance = await api.query.tokens.totalIssuance({ Token: tokenName });
    const voidLiquid = await api.query.homa.totalVoidLiquid();
    return BigInt(issuance.toString()) + BigInt(voidLiquid.toString());
};

export const stableAssetSwap = async (event: SubstrateEvent) => {
    // logger.info('Swap Events: ' + JSON.stringify(event));
    // [swapper, pool id, a, input asset, output asset, input amount, min_output_amount, balances, total supply, output amount]
    const [swapper, poolId, a, inputAsset, outputAsset, inputAmount, minOutputAmount, balances, totalSupply, outputAmount] = event.event.data as unknown as [any, any, any, any, any, any, any, any, any, any];
    const blockData = await ensureBlock(event);
    const [_, token0Name, token1Name] = getPoolId(inputAsset, outputAsset);
    // logger.info('swapper: ' + swapper.toString());
    // logger.info('poolId: ' +  poolId);
    // logger.info('a:' + a);
    // logger.info('inputAsset:' + inputAsset)
    // logger.info('outputAsset: ' + outputAsset)
    // logger.info('inputAmount: ' + inputAmount)
    // logger.info('min: ' +  minOutputAmount)
    // logger.info('balances: ' + balances)
    // logger.info('totalSupply: ' + totalSupply)
    // logger.info('outputAmount:' +  outputAmount)
    const hourTime = getStartOfHour(blockData.timestamp!);

    const swapId = `${blockData.hash}-${event.idx.toString()}`;
    logger.info('Swap ID: ' + swapId)
    const swap = await getStableAssetSwap(swapId);

    // Ensure swapper is in database
    await getAccount(swapper.toString());
    swap.addressId = swapper.toString();
    swap.poolId = poolId;
    swap.a = a;
    swap.inputTokenId = getTokenName(inputAsset);
    swap.outputTokenId = getTokenName(outputAsset);
    swap.inputAmount = BigInt(inputAmount.toString());
    swap.minOutputAmount = BigInt(minOutputAmount.toString());
    swap.balances = balances.map((amount: any) => amount.toString()).join();
    swap.totalSupply = BigInt(totalSupply.toString());
    swap.outputAmount = BigInt(outputAmount.toString());

    swap.blockId = blockData.id
    swap.timestamp = blockData.timestamp;


    const token0Amount = token0Name === swap.inputTokenId ? BigInt(swap.inputAmount) :  BigInt(swap.outputAmount)
    const token1Amount = token1Name === swap.inputTokenId ? BigInt(swap.inputAmount) :  BigInt(swap.outputAmount);

    // Update extrinsic data
    if (event.extrinsic) {
		const extrinsicData = await ensureExtrinsic(event);
		swap.extrinsicId = extrinsicData.id;
		await getAccount(event.extrinsic.extrinsic.signer.toString());

		extrinsicData.section = event.event.section;
		extrinsicData.method = event.event.method;
		extrinsicData.addressId = event.extrinsic.extrinsic.signer.toString();

		await extrinsicData.save();

        // Update fee data
        const feeEvent = event.extrinsic.events.find(event => event.event.method === 'FeeCollected');
        if (feeEvent) {
            const [,,,,,,, feeAmount] = feeEvent.event.data as unknown as [any, any, any, any, any, any, any, any];
            swap.feeAmount = swap.feeAmount! + BigInt(feeAmount.toString());
        }

        // Update yield data
        const yieldEvent = event.extrinsic.events.find(event => event.event.method === 'YieldCollected');
        if (yieldEvent) {
            const [,,,,, yieldAmount] = yieldEvent.event.data as unknown as [any, any, any, any, any, any];
            swap.yieldAmount = BigInt(yieldAmount.toString());
        }
	}

    if (api.query?.homa?.toBondPool && api.query?.homa?.stakingLedgers && api.query?.homa?.totalVoidLiquid) {
        const totalStaking = await getTotalStaking(api as any);
        const totalLiquidity = await getTotalLiquidity(api as any, token1Name);
        
        swap.exchangeRate = Number((Number(totalLiquidity) / Number(totalStaking)).toFixed(6))
        swap.totalStaking = totalStaking;
        swap.totalLiquidity = totalLiquidity;
        swap.price = BigInt(Math.pow(10, 18)) * token1Amount * totalLiquidity / (token0Amount * totalStaking);
    }

    // Update hourly data
    const hourlyData = await getStableAssetPoolHourlyData(poolId, hourTime);

    hourlyData.timestamp = hourTime;
    hourlyData.lastPrice = swap.price;
    hourlyData.token0Id = token0Name;
    hourlyData.token1Id = token1Name;
    hourlyData.totalTx = hourlyData.totalTx! + 1;
    hourlyData.hourlyToken0TradeVolume = hourlyData.hourlyToken0TradeVolume! + token0Amount;
    hourlyData.hourlyToken1TradeVolume = swap.totalStaking && swap.totalLiquidity ? 
        hourlyData.hourlyToken1TradeVolume! + token1Amount * swap.totalLiquidity / swap.totalStaking :
        BigInt(0);
    hourlyData.priceHigh = hourlyData.priceHigh! > swap.price! ? hourlyData.priceHigh! : swap.price!;
	hourlyData.priceLow = hourlyData.priceLow! === BigInt(0) ? swap.price! : (hourlyData.priceLow! < swap.price! ? hourlyData.priceLow! : swap.price!);

    hourlyData.updateAtBlockId = blockData.id;


    await hourlyData.save();

	await swap.save();
}