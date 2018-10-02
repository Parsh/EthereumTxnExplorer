const expect = require('expect');
const assert = require('assert');
const { transferDetails } = require('../src/utils/ethereum');

describe('Ethereum Utility Tests', () => {
  before(() => {
    dummyAccountTransferTxnID =
      '0x29b40daa7403dad36d20425f9d397657e54e3ec5d0a2cfef2454d4e100e17775';

    dummyTokenTxnID =
      '0xeb297afc3377169816f95c8e5ec15b7f5a231be769195305acd8a231b5166eb4';

    dummyContractExecutionTxnID =
      '0x49dc5e129fa4cfa50e87c0db44ed47b320f17234271c513b8abe5b2a8cd1fac3';

    invalidTxnID = '0xfjaljfdk7169816f95c8e5ec153l42q3h44j32l4hjdkafkjahfdaeb4';

    rinkebyTxnID =
      '0x81e2e5fad46e7f622a8b760f2c58b1992f3ecd3b68bcb7da9572184574cd3736';
  });

  it('should provide the details corresponding to the supplied account transfer transaction', async () => {
    const details = await transferDetails(dummyAccountTransferTxnID);
    expect(details).toBeDefined();
    expect(details.hash).toEqual(dummyAccountTransferTxnID);
    expect(details.depositType).toEqual('account');
  });

  it('should provide the details corresponding to the supplied ERC20 Token transfer transaction', async () => {
    const details = await transferDetails(dummyTokenTxnID);
    expect(details).toBeDefined();
    expect(details.hash).toEqual(dummyTokenTxnID);
    expect(details.depositType).toEqual('Contract');
    expect(details.ins[0].coinspecific.tokenAddress).toBeDefined();
  });

  it('should provide the details corresponding to the supplied contract execution transaction', async () => {
    const details = await transferDetails(dummyContractExecutionTxnID);
    expect(details).toBeDefined();
    expect(details.hash).toEqual(dummyContractExecutionTxnID);
    expect(details.depositType).toEqual('Contract');
    expect(details.ins[0].coinspecific.tracehash).toBeDefined();
  });

  it('should throw an error message against an invalid transactionID', async () => {
    try {
      await transferDetails(invalidTxnID);
    } catch (err) {
      expect(err.message).toBeTruthy();
      //console.log(err.message);
    }
  });

  it('should throw an error message against test network transactionID', async () => {
    try {
      await transferDetails(rinkebyTxnID);
    } catch (err) {
      expect(err.message).toBeTruthy();
      //console.log(err.message);
    }
  });
});
