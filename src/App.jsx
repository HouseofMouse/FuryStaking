/* eslint-disable prettier/prettier */
//import { ResetCSS } from '@pancakeswap/uikit'
//import GlobalStyle  from './style/Global'
//import { useEffect } from "react";
//import { useMoralis } from "react-moralis";
import Logos from "./image/crope.png";
import ETHCODE from "./image/ETHER.jpg";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
//import Chains from "components/Chains";
//import TokenPrice from "components/TokenPrice";
//import ERC20Balance from "components/ERC20Balance";
//import ERC20Transfers from "components/ERC20Transfers";
//import DEX from "components/DEX";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
//import NativeBalance from "./components/NativeBalance";

//import Lottery from "components/Raffle/Lottery";
import "./style.css";
//import Home from "components/Home/Home";
//import Launch from 'components/Launchpad/Launch';
import Text from "antd/lib/typography/Text";
//import HRoadmap from "components/Roadmap/HRoadmap";
import MenuItems from "./components/MenuItems";
//import AboutUs from 'components/AboutUs/AboutUs'
import TwitterIcon from "@mui/icons-material/Twitter";
import Button from "@mui/material/Button";

import StakeFury from "./components/StakeFury/StakeFury";
//import NativeBalance from "components/NativeBalance";
import { HomeFury } from "components/HomeFury/HomeFury";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import QuickStart from "components/QuickStart";
import NewStakeFury from "components/StakeFuryNew/NewStakeFury";
//import { connectors } from './components/Account/config'

//import as from "./components/Image/as.png";

const { Header, Footer } = Layout;

const back = {
  img: {
    background: "black",
    height: "100vh",
    overflow: "auto",
    maxWidth: "auto",
  },
};

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Righteous', cursive",
    color: "white",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Space Mono', monospace",
    padding: "0 10px",
    boxShadow: "0 1px 10px #00FF00",
    color: "#FFF",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
    color: "#FFF",
  },
  footer: {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    height: "7%",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    maxwidth: "100%",
  },
  foo: {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    height: "8%",
    backgroundColor: "black",
    color: "white",
    alignItems: "right",
    maxwidth: "100%",
  },
};
const App = () => {
  const { library } = useActiveWeb3React();
  const signer = library.getSigner()


  return (
    <Layout style={back.img}>
      <div style={back.img}>
        <Router>
          {(signer.isSigner)}
          <Header style={styles.header}>
            <Logo />
            <MenuItems />
            <div style={styles.headerRight}>
              <Account />
            </div>
          </Header>

          <div style={styles.content}>
            <Switch>
              <Route path="/home">
                <HomeFury />
              </Route>
              <Route path="/mousestake">
                <StakeFury />
              </Route>
              <Route path="/quickstart">
                <QuickStart />
              </Route>
              <Route path="/newstaking">
                <NewStakeFury />
              </Route>
              <Route path="/">
                <Redirect to="/quickstart" />
              </Route>
              <Route path="/mousestake">
                <Redirect to="/mousestake" />
              </Route>
              <Route path="/newstaking">
                <Redirect to="/newstaking" />
              </Route>
              <Route path="/home">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </div>
          <Footer style={styles.footer}>
            <Text style={{ marginTop: -10, color: "white", display: "block" }}>
              <img
                src={ETHCODE}
                alt="ETHERCODE"
                height={30}
                width={30}
                style={{ borderRadius: 10, marginLeft: 15, marginRight: 5 }}
              />
              © ETHERCODE x FMG — 2022
              <Button
                variant="text"
                href="https://twitter.com/FuryMouseGang"
                startIcon={<TwitterIcon />}
              >
                <a href="https://twitter.com/FuryMouseGang">
                  <font color="green"></font>
                </a>
              </Button>
            </Text>
          </Footer>
        </Router>
      </div>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex", flexFlow: "row nowrap" }}>
    <Link to="/">
      <img
        style={{
          height: 50,
          borderRadius: "0px",
          maxWidth: 130,
        }}
        src={Logos}
        alt="Logo"
      />
    </Link>
  </div>
);

console.log("Hope", MenuItems);

export default App;
