import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";

import * as dotenv from 'dotenv';
import path from 'path';

const mode = process.env.NODE_ENV || 'production';

// Load the appropriate .env file
const dotenvPath = path.resolve(__dirname, `.env${mode !== 'production' ? `.${mode}` : ''}`);
dotenv.config({ path: dotenvPath });

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "user-histories",
  description:
    "for user action history records",
  runner: {
    node: {
      name: "@subql/node",
      version: ">=3.0.1",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /* The genesis hash of the network (hash of block 0) */
    chainId: process.env.CHAIN_ID!,
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: process.env.ENDPOINT!?.split(',') as string[] | string,
    chaintypes: {
      file: "./dist/chaintypes.js",
    },
  },
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          // homa-lite
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleHomaLiteMinted",
            filter: {
              module: "homaLite",
              method: "Minted",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleHomaLiteRedeemed",
            filter: {
              module: "homaLite",
              method: "Redeemed",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleHomaLiteRedeemRequestCancelled",
            filter: {
              module: "homaLite",
              method: "RedeemRequestCancelled",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleHomaLiteRedeemRequested",
            filter: {
              module: "homaLite",
              method: "RedeemRequested",
            },
          },


          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleMinted",
          //   filter: {
          //     module: "homa",
          //     method: "Minted",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleRedeemRequestCancelled",
          //   filter: {
          //     module: "homa",
          //     method: "RedeemRequestCancelled",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleRequestedRedeem",
          //   filter: {
          //     module: "homa",
          //     method: "RequestedRedeem",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleRedeemedByFastMatch",
          //   filter: {
          //     module: "homa",
          //     method: "RedeemedByFastMatch",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleRedeemedByUnbond",
          //   filter: {
          //     module: "homa",
          //     method: "RedeemedByUnbond",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleCurrentEraBumped",
          //   filter: {
          //     module: "homa",
          //     method: "CurrentEraBumped",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleBalancesTransfer",
          //   filter: {
          //     module: "balances",
          //     method: "Transfer",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleCurrenciesTransfer",
          //   filter: {
          //     module: "currencies",
          //     method: "Transferred",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleDepositDexShare",
          //   filter: {
          //     module: "incentives",
          //     method: "DepositDexShare",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleWithdrawDexShare",
          //   filter: {
          //     module: "incentives",
          //     method: "WithdrawDexShare",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event, 
          //   handler: "handlePayoutRewards",
          //   filter: {
          //     module: "incentives",
          //     method: "PayoutRewards",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleClaimRewards",
          //   filter: {
          //     module: "incentives",
          //     method: "ClaimRewards",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleNewCollateralAuction",
          //   filter: {
          //     module: "auctionManager",
          //     method: "NewCollateralAuction",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleCancelAuction",
          //   filter: {
          //     module: "auctionManager",
          //     method: "CancelAuction",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleCollateralAuctionDealt",
          //   filter: {
          //     module: "auctionManager",
          //     method: "CollateralAuctionDealt",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleDEXTakeCollateralAuction",
          //   filter: {
          //     module: "auctionManager",
          //     method: "DEXTakeCollateralAuction",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleCollateralAuctionAborted",
          //   filter: {
          //     module: "auctionManager",
          //     method: "CollateralAuctionAborted",
          //   },
          // },
          // {
          //   kind: SubstrateHandlerKind.Event,
          //   handler: "handleBid",
          //   filter: {
          //     module: "auction",
          //     method: "Bid",
          //   },
          // },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
