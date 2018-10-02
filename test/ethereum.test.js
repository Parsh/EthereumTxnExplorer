const expect = require('expect');

const { transferDetails } = require('../src/utils/ethereum');

describe('Ethereum Utility Tests', () => {
  before(() => {
    dummyAccountTxnHash =
      '0xf18741369405855431aed68d9faec18d5dc94658f5657ed44dabb27466af0685';
    transferDetails(dummyAccountTxnHash);

    dummyTokenTxnHash =
      '0xeb297afc3377169816f95c8e5ec15b7f5a231be769195305acd8a231b5166eb4';
    transferDetails(dummyTokenTxnHash);
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
});
