const Web3 = require('web3');
const config = require('./config');
let web3;

//optimized for server-side rendering
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //We are in the browser and metamask in running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //We are either on the server or the user isn't running metamask
  const provider = new Web3.providers.HttpProvider(config.NETWORK_URL);

  web3 = new Web3(provider);
}
module.exports = web3;
