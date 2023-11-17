import Web3 from 'web3';
import { INFURA_API, CONTRACT_ADDRESS, PRIVATE_KEY } from './config.js';
import abi from './abi.json' assert { type: "json" };

const web3 = new Web3 (INFURA_API);
const smartContract = new web3.eth.Contract (abi, CONTRACT_ADDRESS);

const account = web3.eth.accounts.privateKeyToAccount (PRIVATE_KEY);
const blockNumber = await web3.eth.getBlockNumber ();
async function addDataToContract (key, number, text, flag) {
  const nonce = await web3.eth.getTransactionCount (account.address);

  const txObject = smartContract.methods.addData (key, number, text, flag);
  const gasEstimate = await txObject.estimateGas ({ from: account.address });

  const tx = {
    from: account.address,
    to: CONTRACT_ADDRESS,
    gas: gasEstimate,
    gasPrice: await web3.eth.getGasPrice (),
    nonce: nonce,
    data: txObject.encodeABI ()
  };

  const signedTx = await web3.eth.accounts.signTransaction (tx, PRIVATE_KEY);

  await web3.eth.sendSignedTransaction (signedTx.rawTransaction);
}

async function removeDataFromContract (key) {
  const nonce = await web3.eth.getTransactionCount (account.address);

  const txObject = smartContract.methods.removeData (key);
  const gasEstimate = await txObject.estimateGas ({ from: account.address });

  const tx = {
    from: account.address,
    to: CONTRACT_ADDRESS,
    gas: gasEstimate,
    gasPrice: await web3.eth.getGasPrice (),
    nonce: nonce,
    data: txObject.encodeABI ()
  };

  const signedTx = await web3.eth.accounts.signTransaction (tx, PRIVATE_KEY);

  await web3.eth.sendSignedTransaction (signedTx.rawTransaction);
}

function getEvents (filter) {
  const events = smartContract.getPastEvents ({
    fromBlock: 0,
    toBlock: 'latest',
    filter: filter
  });

  return events;
}

async function viewStorageSlots (slot) {
  const storage = await web3.eth.getStorageAt (CONTRACT_ADDRESS, slot, blockNumber);
  console.log (`Storage at slot ${slot} :`, storage);
}

await addDataToContract (1, 42, 'HW_3', true);
await addDataToContract (2, 42, 'Hey HSE!', true);
await removeDataFromContract (2);
const events = await getEvents ({});
console.log ('Events:', events);
await viewStorageSlots (0);
await viewStorageSlots (1);
await viewStorageSlots (2);
