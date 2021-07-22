const TBSC_Token = artifacts.require("./TokenBSC.sol");

module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();

  // instantiate LAUNCHED contract:
  const TBSC_Contract = await TBSC_Token.deployed();

  // Check balance of recipient:
  const balanceOfRecipient = await TBSC_Contract.balanceOf(recipient);
  console.log("Balance TBSC of recipient: ", balanceOfRecipient.toString());

  // web3.eth.getBalance(
  //   "0x50ef8fb58b2f7bb907edaaf5065d3f880a597441",
  //   (err, balance) => {
  //     console.log("BNB Balance: ", balance);
  //   }
  // );
  done();
};
