const TokenETH = artifacts.require("TokenETH.sol");
const TokenBSC = artifacts.require("TokenBSC.sol");
const BridgeETH = artifacts.require("BridgeETH.sol");
const BridgeBSC = artifacts.require("BridgeBSC.sol");

module.exports = async function (deployer, network, addresses) {
  if (network === "ethTestnet") {
    // Deploy TETH first:
    await deployer.deploy(TokenETH);
    const TokenETH_Contract = await TokenETH.deployed();

    await TokenETH_Contract.mintToken(addresses[0], 2000);

    // Deploy the ETH BRIDGE Contract:
    await deployer.deploy(BridgeETH, TokenETH_Contract.address);
    const BridgeETH_Contract = await BridgeETH.deployed();

    // update admin of TETH to the BRIDGE_ETH CONTRACT:
    await TokenETH_Contract.updateAdmin(BridgeETH_Contract.address);
  }

  if (network === "bscTestnet") {
    // Deploy TBSC:
    await deployer.deploy(TokenBSC);
    const TokenBSC_Contract = await TokenBSC.deployed();

    // Deploy BSC BRIDGE CONTRACT:
    await deployer.deploy(BridgeBSC, TokenBSC_Contract.address);
    const BridgeBSC_Contract = await BridgeBSC.deployed();

    // Update admin of token contract to the BRIDGE BSC Contract:
    await TokenBSC_Contract.updateAdmin(BridgeBSC_Contract.address);
  }
};
