require("dotenv").config();

const Web3 = require("web3");
const moment = require("moment");

const BridgeETH = require("../build/contracts/BridgeETH.json");
const BridgeBSC = require("../build/contracts/BridgeBSC.json");

const web3ETH = new Web3(
  `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
);
const web3BSC = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

const adminPrivKey = process.env.PRIVATE_KEY;
const { address: admin } = web3ETH.eth.accounts.wallet.add(adminPrivKey);

// Instantiating both contracts to interact with it (ABI & contract ADDRESS):
const ETH_Bridge_Contract = new web3ETH.eth.Contract(
  BridgeETH.abi,
  BridgeETH.networks["4"].address // Rinkeby
);
const BSC_Bridge_Contract = new web3BSC.eth.Contract(
  BridgeBSC.abi,
  BridgeBSC.networks["97"].address
);

// Trigger Action from event emittion (Successful Transfer occur aka listen to BURN function on ETH):
ETH_Bridge_Contract.events
  .Transfer({ fromBlock: 0, step: 0 })
  .on("data", async (event) => {
    // Destructure event details:
    const { from, to, amount, nonce, date, signature } = event.returnValues;

    // const transaction = await BSC_Bridge_Contract.methods.mint(
    //   from,
    //   to,
    //   amount,
    //   nonce,
    //   signature
    // ).sendTransaction({from: admin});

    const transaction = BSC_Bridge_Contract.methods.mint(
      from,
      to,
      amount,
      nonce,
      signature
    );

    // Querying transaction details:
    const [txGasPrice, txGasCost] = await Promise.all([
      web3BSC.eth.getGasPrice(),
      transaction.estimateGas({ from: admin }),
    ]);

    const data = transaction.encodeABI();
    const transactionData = {
      from: admin,
      to: BSC_Bridge_Contract.options.address,
      data,
      gas: txGasCost,
      gasPrice: txGasPrice,
    };

    // Initiate minting function on BSC Chain to complete transaction:
    const transactionReceipt = await web3BSC.eth.sendTransaction(
      transactionData
    );

    // Logging of Transaction Details:
    console.log(`Transaction hash (BSC): ${transactionReceipt}`);
    console.log(`Details of Processed Transfer: `);
    console.log(` From: ${from}`);
    console.log(` To: ${to}`);
    console.log(` Amount: ${amount} TBSC Tokens`);
    console.log(
      ` date: ${moment(
        parseInt(date * 1000).format("MMMM Do YYYY, h:mm:ss a")
      )}`
    );
    console.log(` nonce: ${nonce}`);
  });

// formattedTime = moment(parseInt(item.timestamp * 1000)).format(
//   "MMMM Do YYYY, h:mm:ss a"
// );

console.log("HELLO");
