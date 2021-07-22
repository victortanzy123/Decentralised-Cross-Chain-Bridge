# Decentralised-Cross-Chain-Bridge

Cross-chain bridge for token migration between Ethereum and Binance Smart Chain

Steps to launch:
1.) truffle migrate --reset --network ethTestnet
2.)truffle migrate --reset --network bscTestnet

// Check balance of TETH in admin:
3.) truffle exec scripts/TETH-balance.js --network ethTestnet

// Check balance of TBSC in admin:
4.) truffle exec scripts/TBSC-balance.js --network bscTestnet

// NEW LISTENING TERMINAL: 5. )tart another terminal to run the
ETH-BSC-Bridge.js to listen to transfer event:
node scripts/ETH-BSC-Bridge.js

// BACK TO THE OLD TERMINAL:
truffle exec scripts/ETH-BSC-Transfer.js --network ethTestnet

// It should listen to the transfer event and emit transfer details, minting of TBSC should be automatic and can be checked by running the balance scripts.
