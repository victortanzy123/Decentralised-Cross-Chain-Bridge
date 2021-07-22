const TETH_Token = artifacts.require("./TokenETH.sol");

module.exports = async (done) => {
  // Instantiate sender from ETH Side:
  const [sender, _] = await web3.eth.getAccounts();

  // Instantiate LAUNCHED TETH Contract:
  const TETH_Contract = await TETH_Token.deployed();

  // Checking balance of sender in TETH:
  const balanceOfSender = await TETH_Contract.balanceOf(sender);
  console.log("Balance of BETH from Sender: ", balanceOfSender.toString());
  done();
};
