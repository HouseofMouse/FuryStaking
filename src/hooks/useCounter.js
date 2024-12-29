/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMoralisWeb3Api } from "react-moralis";

export const useCounter = async () => {
  const Web3Api = useMoralisWeb3Api();
  const options = {
    token_address: "0x478B463eAE733Cf9903c0C2C37EE4c2c503b075A",
  };
  const cronosNFTs = await Web3Api.account.getNFTsForContract(options);
  console.log(cronosNFTs);

return { useCounter };
};