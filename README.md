# 📅 Get Fiscal Year

![npm version](https://img.shields.io/npm/v/get-fiscal-year.svg)
![bundlephobia](https://img.shields.io/bundlephobia/min/get-fiscal-year.svg)
![twitter](https://img.shields.io/twitter/follow/alexginns.svg?style=social)

> Easily get the fiscal year for any country - Get the Last Fiscal Year, Current Fiscal Year and Next Fiscal Year

## Features 🔥

- Get the fiscal year information of any country!
- 20kb minified / 3.2kb minified + gzipped!
- No dependencies!
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
import GetFiscalYear from 'get-fiscal-year';

const gfy = new GetFiscalYear();

gfy.getFiscalYear('AU');
```

### Input

The method has one mandatory argument and one optional

First argument is the country - this can be a country code or the full name of a country
`'AU'` or `'Australia'`

Second argument is the time period - You can pass in `'current'`, `'last'`, `'next'`

### Output

Examples:

```js
gfy.getFiscalYear('AU');
/**
 * {
 *  period: 'current',
 *  fiscalStart: '2019/07/01',
		fiscalEnd: '2020/06/30'
 * }
 */

gfy.getFiscalYear('GB', 'last');
/**
 * {
 *  period: 'last',
 *  fiscalStart: '2018/04/06',
 *	fiscalEnd: '2019/04/05'
 * }
 */

gfy.getFiscalYear('US', 'next');
/**
 * {
 *  period: 'next',
 *  fiscalStart: '2021/10/01',
 *	fiscalEnd: '2022/09/30'
 * }
 */
```

## Support 💬

- 🐞 For Bug Reports, Wrong Fiscal Data and Enhancements please use the [issues section](https://github.com/Alex61NN5/get-fiscal-year/issues)

- 🕊️ To contact me directly you can find me via my [twitter](https://twitter.com/alexginns)
