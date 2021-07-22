require("dotenv").config();

const BridgeETH = artifacts.require("./BridgeETH.sol");

const privKey = process.env.PRIVATE_KEY;

module.exports = async (done) => {
  // Need to increment nonce for a new transfer from the same sender
  const nonce = 1;
  const accounts = await web3.eth.getAccounts();
  const amount = 1000;

  // Same as prefix function in smart contract:
  const message = web3.utils
    .soliditySha3(
      { t: "address", v: accounts[0] },
      { t: "address", v: accounts[0] },
      { t: "uint256", v: amount },
      { t: "uint256", v: nonce }
    )
    .toString("hex");

  const { signature } = web3.eth.accounts.sign(message, privKey);

  // Interact directly with the Contract
  await BridgeETH.burn(accounts[0], amount, nonce, signature);
  done();
};
