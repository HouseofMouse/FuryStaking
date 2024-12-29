/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers';

const simpleRpcProvider = new ethers.providers.JsonRpcProvider('https://rpc.vvs.finance/')

const Prov = Web3Provider
/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = function Prov() {
  const { library, chainId, account, ...web3React } = useWeb3React()
  const refEth = useRef(library)
  const [provider, setprovider] = useState(library || simpleRpcProvider)

  useEffect(() => {
    if (library !== refEth.current) {
      setprovider(library || simpleRpcProvider)
      refEth.current = library
    }
  }, [library])

  return { library: provider, chainId: chainId, account: account, ...web3React }
}

export default useActiveWeb3React
