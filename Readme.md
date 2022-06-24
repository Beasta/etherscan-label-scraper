# etherscan-label-scraper
<br />
[![NPM](https://nodei.co/npm/etherscan-label-scraper.png)](https://nodei.co/npm/etherscan-label-scraper/)<br />
Retrieve the etherscan label for a specific ethereum address. No API keys required! Its unfortunate that Etherscan won't provide API access to this information.
## Installation

```
npm install etherscan-label-scraper
```

## Usage
[RunKit Example](https://runkit.com/beasta/etherscan-label-scraper)
```js
let addressScraper = await import('etherscan-label-scraper');

addressScraper = addressScraper.default();
const address = '0x829bd824b016326a401d083b33d092293333a830';
const log = (...args) => console.log(args[1].fullLabel)

addressScraper.requestEtherscan(address, log);
// F2Pool Old
```
## Running the tests

```
npm test
```

## License
MIT

