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
  name: "acala-starter",
  description:
    "This project can be used as a starting point for developing your SubQuery project. It indexes all transfers on Acala network",
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
          {
            handler: "handleEnableTradingPair",
            kind: SubstrateHandlerKind.Event,
            filter: {
              module: "dex",
              method: "EnableTradingPair",
            },
          },
          {
            handler: "handleProvisioningToEnabled",
            kind: SubstrateHandlerKind.Event,
            filter: {
              module: "dex",
              method: "ProvisioningToEnabled",
            },
          },
          {
            handler: "handleListProvision",
            kind: SubstrateHandlerKind.Event,
            filter: {
              module: "dex",
              method: "ListProvisioning",
            },
          },
          {
            handler: "handleAddProvision",
            kind: SubstrateHandlerKind.Event,
            filter: {
              module: "dex",
              method: "AddProvision",
            },
          },
          {
            handler: "handleAddLiquidity",
            kind: SubstrateHandlerKind.Event,
            filter: {
              module: "dex",
              method: "AddLiquidity",
            },
          },
          {
            handler: "handleRemoveLiquidity",
            kind: SubstrateHandlerKind.Event,
            filter: {
              module: "dex",
              method: "RemoveLiquidity",
            },
          },
          {
            handler: "handleSwap",
            kind: SubstrateHandlerKind.Event,
            filter: {
              module: "dex",
              method: "Swap",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
