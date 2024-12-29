/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Metamask from "./WalletIcons/metamaskWallet.png";
import Coin98 from "./WalletIcons/Coin98.png";
import WalletConnect from "./WalletIcons/WalletConnect.png";
import cro from "./WalletIcons/cro.png";

import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { DeFiWeb3Connector } from 'deficonnect'
import getNodeUrl from '../../utils/getRpcUrl'
import { setupNetwork } from '../../utils/wallet'
import { ethers } from 'ethers'

const POLLING_INTERVAL = 12000
const rpcUrl = getNodeUrl()
const chainId = '0x19'

const injected = new InjectedConnector({ supportedChainIds: [12] });

const walletconnect = new WalletConnectConnector({
  rpc: 'https://evm.cronos.org/',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const defiWalletConnect = new DeFiWeb3Connector({
  supportedChainIds: [chainId],
  rpc: 'https://evm.cronos.org/',
  pollingInterval: 15000,
})

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connector: 'injected',
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connector: 'walletconnect',
    priority: 2,
  },
  {
    title: "DeFi-Wallet",
    icon: cro,
    connector: 'injected',
    priority: 3,
  },
  {
    title: "Coin98",
    icon: Coin98,
    connector: 'injected',
    priority: 999,
  },
];


export var getLibrary = function (provider) {
    var library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
};

