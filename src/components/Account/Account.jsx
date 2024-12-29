/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Metamask from "./WalletIcons/metamaskWallet.png";
import Coin98 from "./WalletIcons/Coin98.png";
import WalletConnect from "./WalletIcons/WalletConnect.png";
import cro from "./WalletIcons/cro.png";

import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { getEllipsisTxt } from "../../helpers/formatters";
import Blockie from "../../Blockie";
import { Button, Card, Modal } from "antd";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
import Text from "antd/lib/typography/Text";
// import { connectors } from "./config";
import { Web3Provider } from "@ethersproject/providers";
// import { InjectedConnector } from "@web3-react/injected-connector";
import useAuth from '../../hooks/useAuth';
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { DeFiWeb3Connector } from 'deficonnect'
import getNodeUrl from '../../utils/getRpcUrl'
import useActiveWeb3React from "hooks/useActiveWeb3React";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
    width: "100%",
    display: "inlineBlock",
    whiteSpace: "nowrap",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};
     const POLLING_INTERVAL = 12000
     const rpcUrl = getNodeUrl()

   const injected = new InjectedConnector({ supportedChainIds: [25] });

   const walletconnect = new WalletConnectConnector({
     supportedChainIds: [25],
     bridge: 'https://bridge.walletconnect.org',
     rpc: {25: 'https://evm.cronos.org/', '0x19': 'https://evm.cronos.org/'},
     qrcode: true,
     pollingInterval: POLLING_INTERVAL,
   })

   const defiWalletConnect = new DeFiWeb3Connector({
    supportedChainIds: [25],
    rpc: rpcUrl,
    pollingInterval: 15000,
   })

  // const walletConnect = new WalletConnectConnector({ rpc: { 56: "https://bsc-dataseed.binance.org", 97: "https://data-seed-prebsc-1-s1.binance.org:8545" }, bridge: "https://bridge.walletconnect.org", qrcode: true, supportedChainIds: SupportedChainIds })

const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: injected,
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: walletconnect,
    priority: 2,
  },
  {
    title: "DeFi Wallet",
    icon: cro,
    connectorId: injected,
    priority: 3,
  },
  {
    title: "DeFi Desktop",
    icon: cro,
    connectorId: defiWalletConnect,
    priority: 999,
  },
];


function Account() {
  const { active, account } = useActiveWeb3React();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const { logout, login } = useAuth();
  
    useEffect(() => {

         account

    }, [account, active])
    

     const POLLING_INTERVAL = 12000
     const chainId ='25'

   const walletconnect = new WalletConnectConnector({
     rpc: 'https://evm.cronos.org/',
     qrcode: true,
     pollingInterval: POLLING_INTERVAL,
   })

   const defiWalletConnect = new DeFiWeb3Connector({
    supportedChainIds: [25],
    rpc: 'https://evm.cronos.org/',
    pollingInterval: 15000,
   })

   console.log("account", account)

    return (
      <>
      {!account && (
        <div>
        <div onClick={() => setIsAuthModalVisible(true)}>
        <p style={styles.text}>Connect Wallet</p>
      </div>
      <Modal
        visible={isAuthModalVisible}
        footer={null}
        onCancel={() => setIsAuthModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="340px"
      >
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          Connect Wallet
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {connectors.map(({ title, icon, connectorId }, key) => (
            <div
              style={styles.connector}
              key={key}
              onClick={
              () => login(connectorId,title)
            } 
            >
              <img src={icon} alt={title} style={styles.icon} />
              <Text style={{ fontSize: "14px" }}>{title}</Text>
            </div>
          ))}
        </div>
      </Modal>
      </div>
      )}
        {account && (
          <div>
            <div style={styles.account} onClick={() => setIsModalVisible(true)}>
        <p style={{ marginTop: "15px", marginRight: "5px", ...styles.text }}>
          {getEllipsisTxt(account, 4)}
        </p>
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        <div>Account</div>
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={async () => {
            logout();
            window.localStorage.removeItem("connector");
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
          </div>
        )}
      </>
    );
  }

export default Account;
