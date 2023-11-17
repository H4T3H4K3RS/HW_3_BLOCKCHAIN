import dotenv from 'dotenv';

dotenv.config ();

const INFURA_API = process.env.INFURA_API || 'https://polygon-mumbai.infura.io/v3/';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0x000000';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0x000000';
export {
  INFURA_API,
  CONTRACT_ADDRESS,
  PRIVATE_KEY,
}
