# 📅 Get Fiscal Year

![npm version](https://img.shields.io/npm/v/get-fiscal-year.svg)
![bundlephobia](https://img.shields.io/bundlephobia/min/get-fiscal-year.svg)

> Easily get the fiscal year for any country - Get the Last Fiscal Year, Current Fiscal Year and Next Fiscal Year

## Features 🔥

- Get the fiscal year information of any country!
- 20kb minified / 3.2kb minified + gzipped!
- No dependencies!
- Built with Typescript!
- Easy to use and you can use anywhere! 💪

## Install 🔮

#### NPM

```bash
$ npm install get-fiscal-year
```

#### Yarn

```bash
$ yarn add get-fiscal-year
```

#### Via script tag

```html
<script src="https://cdn.jsdelivr.net/npm/get-fiscal-year@latest/dist/get-fiscal-year.min.js"></script>
```

## Usage

If you are using a module loader you will need to import the module

```js
import GetFiscalYear from "get-fiscal-year";
```

## By Country

```js
const gfy = new GetFiscalYear();

gfy.getFiscalYear("AU");
```

### Input

The `getFiscalYear` method has one mandatory argument and one optional

First argument is the country - this can be a country code or the full name of a country
`'AU'` or `'Australia'`

Second argument is the time period - You can pass in `'current'`, `'last'`, `'next'`

### Output

Examples:

```js
gfy.getFiscalYear("AU");
/**
 * {
 *  period: 'current',
 *  fiscalYearStart: '2020-06-30T14:00:00.000Z',
 *  fiscalYearEnd: '2021-06-29T14:00:00.000Z'
 * }
 */

gfy.getFiscalYear("GB", "last");
/**
 * {
 *  period: 'last',
 *  fiscalYearStart: '2019-04-05T13:00:00.000Z',
 *  fiscalYearEnd: '2020-04-04T13:00:00.000Z'
 * }
 */

gfy.getFiscalYear("US", "next");
/**
 * {
 *  period: 'next',
 *  fiscalYearStart: '2021-09-30T14:00:00.000Z',
 *  fiscalYearEnd: '2022-09-29T14:00:00.000Z'
 * }
 */
```

## By Date

```js
import GetFiscalYear from "get-fiscal-year";

const gfy = new GetFiscalYear();

gfy.getFiscalYearByDate("06/30");
```

### Input

The `getFiscalYearByDate` method has one mandatory argument and one optional

First argument is the date - it must follow this format `<month>/<day>`

Second argument is the time period - You can pass in `'current'`, `'last'`, `'next'`

### Output

Examples:

```js
gfy.getFiscalYearByDate("06/30");
/**
 * {
 *  period: 'current',
 *  fiscalYearStart: '2020-06-30T14:00:00.000Z',
 *  fiscalYearEnd: '2021-06-29T14:00:00.000Z'
 * }
 */

gfy.getFiscalYearByDate("04/05", "last");
/**
 * {
 *  period: 'last',
 *  fiscalYearStart: '2019-04-05T13:00:00.000Z',
 *  fiscalYearEnd: '2020-04-04T13:00:00.000Z'
 * }
 */

gfy.getFiscalYearByDate("09/30", "next");
/**
 * {
 *  period: 'next',
 *  fiscalYearStart: '2021-09-30T14:00:00.000Z',
 *  fiscalYearEnd: '2022-09-29T14:00:00.000Z'
 * }
 */
```

## Support 💬

- 🐞 For Bug Reports, Wrong Fiscal Data and Enhancements please use the [issues section](https://github.com/Alex61NN5/get-fiscal-year/issues)
