const superagent = require('superagent');

// Just checks plausibility
const isPlausibleAddress = (address) => (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));

module.exports = function EtherscanLabels() {
  if (!(this instanceof EtherscanLabels)) {
    return new EtherscanLabels();
  }
  this.grabLabel = (body) => {
    const fullLabelRegex = /\(viewable by anyone\)'>(.*?)</;
    let fullLabel = body.match(fullLabelRegex);
    if (fullLabel === null) { // checking for errors if the div wasn't matched
      return 'There has been an error processing this address (span was not matched in body)';
    }
    [, fullLabel] = fullLabel;
    if (fullLabel) {
      return { fullLabel };
    }
    return 'There has been an error processing this address';
  };

  this.requestEtherscan = (address, callback) => {
    if (!address || !isPlausibleAddress(address)) {
      callback('Must enter a valid address');
      return;
    }
    superagent
      .get(`https://etherscan.io/address/${address}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          callback(err);
        } else {
          const labelsObject = this.grabLabel(res.res.text);
          if (typeof labelsObject === 'string') {
            callback(labelsObject); // return error
          } else {
            callback(null, this.grabLabel(res.res.text));
          }
        }
      });
  };
};
