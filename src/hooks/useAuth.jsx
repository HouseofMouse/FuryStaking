/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
// import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core';
import { connectors } from '../components/Account/config'
import { useCallback, useState, useEffect } from 'react'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { DeFiWeb3Connector } from 'deficonnect'
import getNodeUrl from '../utils/getRpcUrl'
import { setupNetwork } from '../utils/wallet'

const POLLING_INTERVAL = 12000
const rpcUrl = getNodeUrl()
const chainId = '25'

const injected = new InjectedConnector({
  supportedChainIds: [25, chainId],
})

const walletconnect = new WalletConnectConnector({
  rpc: 'https://evm.cronos.org/',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const defiWalletConnect = new DeFiWeb3Connector({
  supportedChainIds: 25,
  rpc: 'https://evm.cronos.org/',
  pollingInterval: 15000,
})

const useAuth = () => {
  const { activate, deactivate, account, active } = useWeb3React();
  const [connector, setConnector] = useState();
  const [connector2, setWallet] = useState();

  /*
  useEffect(() => {
    {connectors.map((connectorId) => {
    if (connectors)
     var connectorNames = connectorId;
    return () => {
     setConnector(connectorNames)
    }
   })}
  }, [])
  */
    
  const login = useCallback(function (connectorId, title) {
    async function connectAsync() {
      if (connector)
      return await activate(connector)
    }
    var connector = connectorId
    var ifcon = connector.connector
    if 
    (title === "Metamask") 
    try {
      activate(connector)
    } catch (e) {
    }
    if 
    (title === "WalletConnect") 
    try {
      activate(connector)
    } catch (e) {
      console.error(e)
    }
    if 
    (title === "DeFi Wallet") 
    try {
      activate(connector)
    } catch (e) {
      console.error(e)
    }
    if 
    (title === "DeFi Desktop") 
    try {
      activate(connector)
    } catch (e) {
      console.error(e)
    }
  },[activate, account, deactivate],)

/*
const login = (({connector})) => {
if (connector == injected && connector !== 'defiWalletConnect' || connector !== 'walletconnect')
     return (activate(connector) || activate(injected));
     else (alert('error metamask'));
if (connector == 'defiWalletConnect' && connector !== 'injected' || connector !== 'walletconnect')
     return (activate(defiWalletConnect) || activate(defiWalletConnect));
     else (alert('error defi'));
if (connector == 'walletconnect' && connector !== 'injected '|| connector !== 'defiWalletConnect')
     return (activate(walletconnect) || activate(walletconnect));
     else (alert('error metamask'));;    
}
*/

  const logout = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connector.walletconnect.close()
      connector.walletconnect.walletConnectProvider = null
    }
    window.localStorage.removeItem()
  }, [deactivate])

  return { login, logout, account };
};

export default useAuth;