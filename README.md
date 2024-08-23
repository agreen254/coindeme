## CoinDeme

Coin[Deme](https://en.wikipedia.org/wiki/Deme) provides an interface with the cryptocurrency market.

## Features

### Perform Detailed Analyses
- Select up to three coins to compare and contrast prices, market caps, rate of return, or total volume.
- Customize properties such as time period, coin axis, log/linear scaling, data decimation, and more.
- Export data as a ```.xlsx``` or ```.csv``` file for outside usage.
### Build a Portfolio
- Create a custom portfolio where you can track your personal assets.
- Assets immediately show profit change percentage.
- Edit asset values or currencies after they have been entered.
### Get a Market Overview
- View the top coins by market cap or volume.
- Track statistics such as price changes and supply ratio.
- Sparklines provide an at-a-glance view of the 7 day pricing behavior.
### Review Coin Information
- View important coin statistics including: all time low, all time high, genesis date, market cap, and more.
- Read individual descriptions explaining the mission behind each coin.
- Navigate to official coin pages using auxiliary links.
### Convert Between Coins
- The coin converter tool allows you to view current and historical conversion rates.
### Use Multiple Currencies 
- The following currencies are supported: USD, GBP, EUR, BTC, and ETH.

## Development Server 

To run the development server, execute the following commands:

```bash
$ git clone https://github.com/agreen254/crypto-app
$ cd crypto-app
$ npm i
$ npm run dev
```

Note that you will need to supply your own coingecko API key to properly fetch the data.

Then, go to [http://localhost:3000](http://localhost:3000) to view the app. 