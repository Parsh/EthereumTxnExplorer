const { transferDetails } = require('../utils/ethereum');

const transactionDetails = async (request, response) => {
  const transactionHash = request.params.txid;

  try {
    const result = await transferDetails(transactionHash);
    return response.status(200).send(JSON.stringify(result));
  } catch (err) {
    return response.status(500).send(err.message);
  }
};

module.exports = {
  transactionDetails
};
