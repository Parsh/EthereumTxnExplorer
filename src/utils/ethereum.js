const web3 = require('./web3');

const etherTransferDetails = txnDetails => {
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
  //const methodID = txnDetails.input.slice(0, 10);

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

const transferDetails = async transactionHash => {
  const txnDetails = await web3.eth.getTransaction(transactionHash);

  if (!txnDetails) {
    throw new Error(
      'Please check the supplied transaction hash (only mainnet transactions are supported)'
    );
  }

  const tokenTransferValue = txnDetails.input.slice(74, 74 + 64);
  if (tokenTransferValue) {
    return tokenTransferDetails(txnDetails);
  } else {
    return etherTransferDetails(txnDetails);
  }
};

module.exports = {
  transferDetails
};
