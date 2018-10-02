const web3 = require('./web3');

const accountTransferDetails = txnDetails => {
  const details = {
    block: {
      blockHeight: txnDetails.blockNumber
    },
    outs: [
      {
        address: txnDetails.to,
        value: +txnDetails.value
      }
    ],
    ins: [
      {
        address: txnDetails.from,
        value: -txnDetails.value
      }
    ],
    hash: txnDetails.hash,
    currency: 'ETH',
    state: txnDetails.blockNumber ? 'confirmed' : 'pending',
    depositType: 'account',
    chain: 'ETH.main'
  };

  return details;
};

const tokenTransferDetails = txnDetails => {
  const recipient = txnDetails.input.slice(10, 10 + 64).replace(/^0+/, '');
  const value = parseInt('0x' + txnDetails.input.slice(74, 74 + 64));

  const details = {
    block: {
      blockHeight: txnDetails.blockNumber
    },
    outs: [
      {
        address: recipient,
        value: +value, // +ve to keep internal type consistency
        type: 'token',
        coinspecific: {
          tokenAddress: txnDetails.to
        }
      }
    ],
    ins: [
      {
        address: txnDetails.from,
        value: -value,
        type: 'token',
        coinspecific: {
          tokenAddress: txnDetails.to
        }
      }
    ],
    hash: txnDetails.hash,
    currency: 'ETH',
    state: txnDetails.blockNumber ? 'confirmed' : 'pending',
    depositType: 'Contract',
    chain: 'Eth.main'
  };

  return details;
};

const contractExecutionDetails = txnDetails => {
  const details = {
    block: {
      blockHeight: txnDetails.blockNumber
    },
    outs: [
      {
        address: txnDetails.to,
        value: +txnDetails.value,
        type: 'transfer',
        coinspecific: {
          tracehash: txnDetails.hash
        }
      }
    ],
    ins: [
      {
        address: txnDetails.from,
        value: -txnDetails.value,
        type: 'transfer',
        coinspecific: {
          tracehash: txnDetails.hash
        }
      }
    ],
    hash: txnDetails.hash,
    currency: 'ETH',
    state: txnDetails.blockNumber ? 'confirmed' : 'pending',
    depositType: 'Contract',
    chain: 'ETH.main'
  };

  return details;
};

const transferDetails = async transactionHash => {
  const txnDetails = await web3.eth.getTransaction(transactionHash);

  if (!txnDetails) {
    throw new Error(
      'Please check the supplied transaction hash (only mainnet transactions are supported)'
    );
  }

  const methodID = txnDetails.input.slice(2, 10);

  if (!methodID) {
    // it's an account transfer transaction
    return accountTransferDetails(txnDetails);
  } else {
    if (methodID == 'a9059cbb') {
      // it's a token transfer transaction
      return tokenTransferDetails(txnDetails);
    } else {
      // it's a contract execution transaction
      return contractExecutionDetails(txnDetails);
    }
  }
};

module.exports = {
  transferDetails
};
