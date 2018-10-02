const web3 = require('./web3');

const transferDetails = async transactionHash => {
  const txnDetails = await web3.eth.getTransaction(transactionHash);
  if (!txnDetails) {
    const message =
      'Please check the supplied transaction hash (only mainnet transactions are supported)';
    console.log(message);
    return message;
  }

  const tokenTransferValue = txnDetails.input.slice(74, 74 + 64);
  if (tokenTransferValue) {
    return tokenTransferDetails(txnDetails);
  } else {
    return etherTransferDetails(txnDetails);
  }
};

const dummyAccountTxnHash =
  '0xf18741369405855431aed68d9faec18d5dc94658f5657ed44dabb27466af0685';
transferDetails(dummyAccountTxnHash);

const dummyTokenTxnHash =
  '0xeb297afc3377169816f95c8e5ec15b7f5a231be769195305acd8a231b5166eb4';
transferDetails(dummyTokenTxnHash);
