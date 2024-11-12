import { subqlTest } from "@subql/testing";

// See https://academy.subquery.network/build/testing.html

// homa-lite minted, should validate at karura
subqlTest("test homa-lite minted", 	1246260, [], [], "handleHomaLiteMinted");

// homa-lite redeem requested, should validate at karura
subqlTest("test homa-lite redeem requested", 1246324, [], [], "handleHomaLiteRedeemRequested");

// homa-lite redeem request cancelled, should validate at karura
subqlTest("test homa-lite redeem request cancelled", 1225664, [], [], "handleHomaLiteRedeemRequestCancelled");

// homa-lite redeemed, should validate at karura
subqlTest("test homa-lite redeemed", 1246817, [], [], "handleHomaLiteRedeemed");