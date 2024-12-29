/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import { Mice, Quacks, Houses, Staking, TFU } from "components/StakeFury/Contracts";
import ABI from "./components/card/ABI/ABI";
import VAULTABI from "./components/card/ABI/VAULTABI";
import { createAlchemyWeb3 } from '@alch/alchemy-web3';

const Signer = () => {
const { library, account } = useActiveWeb3React();
const signer = library.getSigner();
return {signer: signer}
}

export async function Contractor() {

  const { library, account } = useActiveWeb3React();
  const signer = library.getSigner();

 const simpleRpcProvider = new ethers.providers.JsonRpcProvider('https://rpc.vvs.finance/');
 const Web3Alc = createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/v2/vI9xj-bH51cHLlA_KxVtOye_AZownjSB");
 const vaultcontract = new ethers.Contract( Staking, VAULTABI, signer )
 const HouseContract =  new ethers.Contract(Houses, ABI, signer );
 const QuacksContract = new  ethers.Contract(Quacks, ABI, signer );
 const MiceContract = new ethers.Contract(Mice, ABI, signer );

 return {
   vaultcontract: vaultcontract, 
   HouseContract: HouseContract,
   QuacksContract: QuacksContract,
   MiceContract: MiceContract
  }
}
/*
async function enable() {
  HouseContract.setApprovalForAll(Staking, true).send({ from: account });
  MiceContract.setApprovalForAll(Staking, true).send({ from: account });
  QuacksContract.setApprovalForAll(Staking, true).send({ from: account });
}
*/