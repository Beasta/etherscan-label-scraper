# etherscan-label-scraper

Retrieve the etherscan label for a specific ethereum address. No API keys required! Its unfortunate that Etherscan won't provide API access to this information.
## Installation

```
npm install etherscan-label-scraper
```

## Usage
[RunKit Example](https://runkit.com/beasta/etherscan-label-scraper)
```js
let addressScraper = await import('etherscan-label-scraper');
import * as weather from '/Users/barryblaha/Code/etherscan-labels/index.js';

addressScraper = addressScraper.default();
const address = '0x829bd824b016326a401d083b33d092293333a830';

addressScraper.requestEtherscan(address, console.log);
// null { fullLabel: 'F2Pool Old' }
```
## Running the tests

```
npm test
```

## License
MIT

