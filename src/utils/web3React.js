/* eslint-disable no-undef */
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { DeFiWeb3Connector } from "deficonnect";
import { ethers } from "ethers";

const POLLING_INTERVAL = 12000;
const RPC_URL = "https://evm.cronos.org/";
const chainId = 25;
const rpcUrl = RPC_URL;

const injected = new InjectedConnector({ supportedChainIds: [chainId] });

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

const defiWalletConnect = new DeFiWeb3Connector({
  supportedChainIds: [chainId],
  rpc: { [chainId]: rpcUrl },
  pollingInterval: 15000,
});

// eslint-disable-next-line no-unused-vars

const ConnectorNames = {
  Injected: null,
  TrustWallet: null,
  WalletConnect: null,
  BSC: null,
  CDCDefiWallet: null,
};

export const connectorsByName = () => {
  if (ConnectorNames.Injected) return injected;
  else if (ConnectorNames.Metamask) return injected;
  else if (ConnectorNames.TrustWallet) return injected;
  else if (ConnectorNames.WalletConnect) return walletconnect;
  else if (ConnectorNames.BSC) return walletconnect;
  else if (ConnectorNames.CDCDefiWallet) return defiWalletConnect;
};

export const getLibrary = (provider) => {
  const MyProv = ethers.providers.Web3Provider(provider);
  const library = new MyProv();
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (provider, account, message) => {
  if (window.BinanceChain) {
    const { signature } = await window.BinanceChain.bnbSign(account, message);
    return signature;
  }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message));
    const signature = await provider.provider?.wc.signPersonalMessage([
      wcMessage,
      account,
    ]);
    return signature;
  }

  return provider.getSigner(account).signMessage(message);
};
