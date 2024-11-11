import { subqlTest } from "@subql/testing";

// https://academy.subquery.network/build/testing.html
subqlTest(
  "testName", // test name
  6724840, // block height to process
  [], // dependent entities
  [], // expected entities
  "handleTransfer" //handler name
);

// test approve
subqlTest(
  "testApprove", // test name
  6689597, // block height to process
  [], // dependent entities
  [], // expected entities
  "handleApprove" //handler name
);

// test transfer event
subqlTest(
  "testTransferEvent", // test name
  6855773, // block height to process
  [], // dependent entities
  [], // expected entities
  "handleTransferEvent" //handler name
);
