/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
// Set of helper functions to facilitate wallet setup

import { nodes } from "./getRpcUrl";
import { useEffect } from 'react';

const ChainId = async () => {
  const provider = window.ethereum;
  const chainType = 'Mainnet'
  //const BASE_URL = process.env.REACT_APP_BASE_URL; // FIXME env var base URL
  return provider.request({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId: `0x19`,
    
      },
    ],
  });
};

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
 export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x19`,
            chainName: `Cronos Mainnet`,
            nativeCurrency: {
              name: 'CRO',
              symbol: 'CRO',
              decimals: 18,
            },
            rpcUrls: nodes,
            blockExplorerUrls: [`https://cronoscan.com/`],
          },
        ],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the Cronos network on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
