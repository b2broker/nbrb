# nbrb ![CI Status](https://github.com/b2broker/nbrb/workflows/CI/badge.svg) [![version](https://img.shields.io/github/package-json/v/b2broker/nbrb?style=plastic)](https://github.com/b2broker/nbrb) [![Known Vulnerabilities](https://snyk.io/test/github/b2broker/nbrb/badge.svg)](https://snyk.io/test/github/b2broker/nbrb) [![Coverage Status](https://coveralls.io/repos/github/b2broker/nbrb/badge.svg?branch=main)](https://coveralls.io/github/b2broker/nbrb?branch=main) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) ![GitHub top language](https://img.shields.io/github/languages/top/b2broker/nbrb) ![node version](https://img.shields.io/node/v/nbrb) ![npm downloads](https://img.shields.io/npm/dt/nbrb) ![License](https://img.shields.io/github/license/b2broker/nbrb)

A simple [Node.js](https://nodejs.org/en/) library for the [NBRB](https://www.nbrb.by/engl) API.

## Installation

```bash
npm install nbrb
```

## Usage

### NBRBClient

```typescript
import { NBRBClient } from "nbrb";
const client = new NBRBClient();
```

- `.getCurrencies()`

```typescript
const currencies = await client.getCurrencies();
```

- `.getCurrency()`

```typescript
const Cur_ID = 431;
const currency = await client.getCurrency({ Cur_ID });
```

- `.getRates()`

```typescript
const ondate = new Date("2020-8-1");
const rates = await client.getRates({ ondate });
```

- `.getRate()`

```typescript
const ondate = new Date("2020-8-1");
// by `Cur_ID`
const Cur_ID = 431;
const rate = await client.getRate({ ondate, Cur_ID });
// by `Cur_Code`
const Cur_Code = "840";
const rate = await client.getRate({ ondate, Cur_Code });
// by `Cur_Abbreviation`
const Cur_Abbreviation = "USD";
const rate = await client.getRate({ ondate, Cur_Abbreviation });
```

- `.getDynamics()`

```typescript
const startdate = new Date("2021-8-1");
const enddate = new Date();
const Cur_ID = 431;
const rates = await client.getDynamics({ startdate, enddate, Cur_ID });
```

### Test

```bash
npm run test:ci
```
