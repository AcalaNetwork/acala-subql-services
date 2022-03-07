# `@acala-subql/utils`

support some helpful functions

## Token

1. isTokenEqual

```javascript
/**
 * @name isTokenEqual
 * @param token1 {any}
 * @param token2 {any}
 * @return boolean
 **/

const isEqual = isTokenEqual('KAR', 'KUSD')
```

2. getTokenName

```javascript
/**
 * @name getTokenName
 * @descriptions get string token name, { LiquidCrowdloan: 13 } will be lc://13
 * @param token {any}
 * @return string
 **/
const name = getTokenName(token)
```

3. getTokenDecimals

```javascript
/**
 * @name getTokenDecimals
 * @descriptions get token decimals support Token, DexShare, ForeignAssets, LiquidCrowdloanToken
 * @param api {[ApiPromise,ApiAt]}
 * @param token {any}
 * @return number
 **/
const decimals = await getTokenDecimals(api, token)
```

## Date

1. getEndOfDay

```javascript
/**
 * @name getEndOfDay
 * @descriptions get end date of params
 * @param date {Date}
 * @return Date
 **/
const endOfDay = getEndOfDay(date)
```

2. getStartOfDay

```javascript
/**
 * @name getStartOfDay
 * @descriptions get start date of params
 * @param date {Date}
 * @return Date
 **/
const startOfDay = getStartOfDay(date)
```

3. getEndOfHour

```javascript
/**
 * @name getEndOfHour
 * @descriptions get end hour date of params
 * @param date {Date}
 * @return Date
 **/
const endOfHour = getEndOfHour(date)
```

2. getStartOfHour

```javascript
/**
 * @name getStartOfHour
 * @descriptions get end hour date of params
 * @param date {Date}
 * @return Date
 **/
const startOfHour = getStartOfHour(date)
```

## Price

1. getOraclePrice

```javascript
/**
 * @name queryPriceFromOracle
 * @descriptions get price form oracle, support normal oracle token, liquid token, liquidcrowdloan token
 * @param api {[ApiPromise,ApiAt]}
 * @params block {SubstrateBlock}
 * @params token {string | CurrencyId | Token}
 * @return FixedPointNumber (include decimals information)
 **/
const price = await queryPriceFromOracle(api, block, token)
```
