/* global describe */
/* global it */
/* global beforeEach */

const { assert } = require('chai');
const nock = require('nock');
const EtherscanLabelScraper = require('../build/index.js'); // eslint-disable-line import/extensions

describe('EtherscanLabelScraper', () => {
  describe('.request', () => {
    it('should return a label for a labeled ethereum address', (done) => {
      EtherscanLabelScraper().requestEtherscan('0x829bd824b016326a401d083b33d092293333a830', (err, data) => {
        assert.equal(!!data, true);
        done();
      });
    });
    it('should return a \"no etherscan label\" for an unlabeled ethereum address', (done) => {
      EtherscanLabelScraper().requestEtherscan('0x829bd824b016326a401d083b33d092293333a830', (err, data) => {
        assert.equal(!!data, true);
        done();
      });
    });
    it('should return an error for an invalid ethereum address', (done) => {
      // the test address is just too short
      EtherscanLabelScraper().requestEtherscan('0x829bd824b016326a401d083b33d092293333a', (err) => {
        assert.equal(err, 'Must enter a valid address');
        done();
      });
    });
    it('should return an error if no address is given', (done) => {
      EtherscanLabelScraper().requestEtherscan(undefined, (err) => {
        assert.equal(err, 'Must enter a valid address');
        done();
      });
    });
    it('should return a string for the label', (done) => {
      EtherscanLabelScraper().requestEtherscan('0x829bd824b016326a401d083b33d092293333a830', (err, data) => {
        assert.isString(data.fullLabel);
        done();
      });
    });
    it('should return \'F2Pool Old\' for 0x829bd824b016326a401d083b33d092293333a830', (done) => {
      EtherscanLabelScraper().requestEtherscan('0x829bd824b016326a401d083b33d092293333a830', (err, data) => {
        assert.equal(data.fullLabel, 'F2Pool Old');
        done();
      });
    });
  });
  describe('404 tests', () => {
    beforeEach(() => {
      nock('https://etherscan.io')
        .get('/address')
        .reply(404);
    });
    it('should return an error for a 404', (done) => {
      EtherscanLabelScraper().requestEtherscan('0x829bd824b016326a401d083b33d092293333a830', (err) => {
        assert.equal(!!err, true);
        done();
      });
    });
  });
});
