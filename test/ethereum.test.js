const expect = require('expect');
const assert = require('assert');
const { transferDetails } = require('../src/utils/ethereum');

describe('Ethereum Utility Tests', () => {
  before(() => {
    dummyAccountTxnHash =
      '0xf18741369405855431aed68d9faec18d5dc94658f5657ed44dabb27466af0685';

    dummyTokenTxnHash =
      '0xeb297afc3377169816f95c8e5ec15b7f5a231be769195305acd8a231b5166eb4';

    invalidTxnHash =
      '0xfjaljfdk7169816f95c8e5ec153l42q3h44j32l4hjdkafkjahfdaeb4';

    rinkebyTxnHash =
      '0x81e2e5fad46e7f622a8b760f2c58b1992f3ecd3b68bcb7da9572184574cd3736';
  });

  it('should supply the details corresponding to the given account transfer transaction', async () => {
    const details = await transferDetails(dummyAccountTxnHash);
    expect(details).toBeDefined();
    expect(details.hash).toEqual(dummyAccountTxnHash);
    expect(details.depositType).toEqual('account');
  });

  it('should supply the details corresponding to the given contract(ERC20 token) transaction', async () => {
    const details = await transferDetails(dummyTokenTxnHash);
    expect(details).toBeDefined();
    expect(details.hash).toEqual(dummyTokenTxnHash);
    expect(details.ins[0].coinspecific.tokenAddress).toBeDefined();
    expect(details.depositType).toEqual('Contract');
  });

  it('should throw an error message against an invalid transactionID', async () => {
    try {
      await transferDetails(invalidTxnHash);
    } catch (err) {
      expect(err.message).toBeTruthy();
      //console.log(err.message);
    }
  });

  it('should throw an error message against test network transactionID', async () => {
    try {
      await transferDetails(rinkebyTxnHash);
    } catch (err) {
      expect(err.message).toBeTruthy();
      //console.log(err.message);
    }
  });
});
