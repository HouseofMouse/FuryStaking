/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import { useMoralis, useMoralisWeb3Api, useERC20Balances } from 'react-moralis';
import { Button, ButtonGroup } from '@mui/material'
import React from 'react';
import { useEffect, useState } from 'react'
import ABI from './ABI/ABI.json';
import VAULTABI from './ABI/VAULTABI.json';
import TOKENABI from './ABI/TOKENABI.json';
import { NFTCONTRACT, STAKINGCONTRACT, nftpng } from './config';
import Web3 from 'web3';
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";
import { CheckOutlined, ApiOutlined } from '@ant-design/icons';
import { Box, Container, Grid} from '@mui/material';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { RawOff } from '@mui/icons-material';
import './Stake.css'
import Total from '../PLNT';
import LoadingButton from '@mui/lab/LoadingButton';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

const { Meta } = Card;

const style = {
  sp:{
  xl: 'auto',
  xs: 'auto',
  marginTop: 20,
  border: "3px solid white", 
  borderRadius: "25px",
  boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa,  0 0 92px #0fa,  0 0 102px #0fa,  0 0 151px #0fa",
  },
  spfluo:{
    marginTop: 16,
    border: "3px solid white", 
    borderRadius: "25px",
    background: "black",
    boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px blue",
  },
  s:{
    border: "3px solid white", 
    borderRadius: "27px",
    background: "black",
    boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 28px #0fa",
    marginTop: 20,

  },
  mission:{
    textAlign: 'center',
    border: "3px solid white", 
    borderRadius: "25px",
    background: "black",
    boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa,  0 0 92px #0fa,  0 0 102px",
    marginTop: 30,
  },
  mission2:{
    textAlign: 'center',
    border: "3px solid white", 
    borderRadius: "25px",
    background: "black",
    boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa,  0 0 92px #0fa,  0 0 102px",
    marginTop: 0,
  }
}       


const nftcard = {
  cards: {
    marginTop: 2,
    marginBottom: 2,
    border: "10px solid white", 
    borderRadius: "20px",
    fontFamily:"'Righteous', cursive",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 7px #fff, 0 0 10px #00d2ff, 0 0 15px #00d2ff,  0 0 20px #00d2ff",
  },
  card2: {
    border: "10px solid white", 
    borderRadius: "20px",
    fontFamily:"'Righteous', cursive",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 7px #fff"
  },
  cards3: {
    border: "10px solid white", 
    borderRadius: "20px",
    fontFamily:"'Righteous', cursive",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 7px #fff, 0 0 10px #ff4b1f, 0 0 15px #ff4b1f,  0 0 23px #ff9068"
  },
  name: {
    border: "10px solid white", 
    borderRadius: "15px",
    font:"font-family: 'Righteous', cursive",
    alignItems: "center",
    fontSize: "15px",
  }, 
  sfondo: {
     background: "black", 
     color: "white", 
     padding: "15px", 
     maxWidth: "1200px", 
     width: "100%", 
     border: "3px solid white", 
     borderRadius: "25px", 
     alignItems: 'center',
     xl: 'auto',
     xs: 'auto',
  },
  testo: {
     fontFamily: "'Righteous', cursive",
     font: "60px 'Righteous', cursive",
     textAlign: "center",
     backgroundColor: "rgba(66,39,147,0.2)",
     borderRadius: "25px",
     boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa,  0 0 1px #0fa",

  },
  testo2: {
    fontFamily: "'Righteous', cursive",
    font: "'Righteous', cursive",
    fontSize: 40,
    color: "white",
    textColor: "white",
  },
  lol: {
    height: "5px",
    color: "white", padding: "5px", 
    maxWidth: "1030px", width: "100%", 
    border: "3px solid white", 
    borderRadius: "25px" 

  }
}

const styles = {
  NFTz: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    width: "100%",
    gap: "10px",
    
  },
  lol: {
    marginTop: "15px",
    height: "5px",
    background: "linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)", 
    padding: "5px", 
    xl: "auto", 
    width: "100%", 
    border: "3px solid white", 
    borderRadius: "25px",
    boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa,  0 0 92px #0fa,  0 0 102px",
  },
};

const Stake = () => {
  const [visible, setVisibility] = useState(false);
  const { Moralis, chainId } = useMoralis();
  const [receiverToSend, setReceiver] = useState(null);
  const [amountToSend, setAmount] = useState(null);
  const [nftToSend, setNftToSend] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const {isWeb3Enabled, enableWeb3, initialize, isInitialized} = useMoralis();
  const [initData, setInitData] = useState([]);
  const [NFTs, setNFTs] = useState([]);
  const [NFTStaked, setNFTStaked] = useState([]);
  const [Balance, setBalance] = useState([]);
  const [Rewards, setRewards] = useState([]);
  const [Ids, setIds] = useState([]);
  const web3 = useMoralisWeb3Api();
  const [rawnfts, setRawnfts] = useState([]);
  const [account, setAccount] = useState([]);
  const [vaultcontract, setVault] = useState([]);
  const [tokenid, setToken] = useState([]);
  const [nftstk, getStk] = useState([])
  const [Planet, setPlanet] = useState([])
  const [loading, setLoading] = useState(true);
  var [Pbalance, getBalancePLNT] = useState([]);


  const {fetchERC20Balances, data} = useERC20Balances();

  const [token, setTokenPLNT] = useState();


  const Web3Alc = createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/v2/vI9xj-bH51cHLlA_KxVtOye_AZownjSB");


  const Web3Api = useMoralisWeb3Api();

  const Ini = async () => {
    const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
    const contract = new web3.eth.Contract(ABI, NFTCONTRACT);
    
    async function Stakeit(item, index, account) {
      console.log("Transfer", item, index);
      
        vaultcontract.methods.stake([item.token_id]).send({ from: account });
  
      setIsPending(true);
   
      try {
        const tx = await Moralis.Stakeit();
        console.log(tx);
        setIsPending(false);
      } catch (e) {
        alert(e.message);
        console.log("E", e);
        setIsPending(false);
      }
     }
   
     async function Unstakeit(item, index, account) {
    
       setIsPending(true);
    
       try {
         const tx = await Moralis.Unstakeit();
         console.log(tx);
         setIsPending(false);
       } catch (e) {
         alert(e.message);
         console.log("E", e);
         setIsPending(false);
       }
      }
   };
 
   const fetchTokenMetadata = async () => {
    //Get metadata for one token. Ex: USDT token on ETH
    const options = {
      chain: "cro",
      addresses: "0x755067ed1F08Ce95ff9533C973C17c09C4Fd7F23",
    };
    const tokenMetadata = await Web3Api.token.getTokenMetadata(options);
    console.log("TK",tokenMetadata);
    getBalancePLNT(tokenMetadata);
   }

  const fetchNFTsForContract = async () => {
    //questo è la logica del fetch del contratto Cronosnauts (Non in staking)
    const options = {
      chain: "cronos",
      token_address: "0x478B463eAE733Cf9903c0C2C37EE4c2c503b075A",
    };

    const events = await Web3Api.account.getNFTsForContract(options);
    //console.log(, JSON.parse(events.result[0].metadata))
    setNFTs(events.result);

  const fetchNFTsForStaking = async () => {
    //questo è la logica del fetch del contratto Staking 
    const options = {
      chain: "cronos",
      token_address: "0x932B49F640c5DD46b1704280d67CA4ef682f94F2",
    };

    const events = await Web3Api.account.getNFTsForContract(options);
    //console.log(, JSON.parse(events.result[0].metadata))
    setNFTStaked(events.resultb);
  
  }};

  async function enable() {
    const Web3 = require('web3');
    const web3 = new Web3(Moralis.provider);
    const account = await Moralis.account;
    const contract = new web3.eth.Contract(ABI, NFTCONTRACT);
    contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({ from: account });
  }
  async function rewardinfo() {
    const account = await Moralis.account;
    const web3 = new Web3(Moralis.provider);
    const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
    var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
    const arraynft = Array.from(rawnfts.map(Number));
    const tokenid = arraynft.filter(Number);
    var rwdArray = [];
    tokenid.forEach(async (id) => {
      var rawearn = await vaultcontract.methods.earningInfo(account, [id]).call();
      var array = Array.from(rawearn.map(Number));
      array.forEach(async (item) => {
        var earned = String(item).split(",")[0];
        var earnedrwd = Web3.utils.fromWei(earned);
        var rewardx = Number(earnedrwd).toFixed(2);
        var numrwd = Number(rewardx);
        rwdArray.push(numrwd)
      });
    });
    function delay() {
      return new Promise(resolve => setTimeout(resolve, 300));
    }
    async function delayedLog(item) {
      await delay();
      var sum = item.reduce((a, b) => a + b, 0);
      var formatsum = Number(sum).toFixed(2);
      setRewards(formatsum);
    }
    async function processArray(rwdArray) {
      for (const item of rwdArray) {
        await delayedLog(item);
      }
    }
    return processArray([rwdArray]);
  }
  async function verify() {
    const web3 = new Web3(Moralis.provider);
    const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
    const account = await Moralis.account;    
    var getstakednfts = await vaultcontract.methods.tokensOfOwner(account).call();
    setBalance(getbalance);
    var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
    setIds(getstakednfts.length);
    console.log('STAKED', getstakednfts)

  }

  const Speriamo = async () => {
    const web3 = new Web3(Moralis.provider);
      const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
      setVault(vaultcontract)
      const account = await Moralis.account;
      setAccount(account)
            var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
      setRawnfts(rawnfts);
      const arraynft = Array.from(rawnfts.map(Number));
      const tokenid = arraynft.filter(Number);
      setToken(tokenid)
  }
  async function claimit() {
    const web3 = new Web3(Moralis.provider);
    const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
    const account = await Moralis.account;
    var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
    const arraynft = Array.from(rawnfts.map(Number));
    const tokenid = arraynft.filter(Number);
    await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
      Web3Alc.eth.getBlock('pending').then((block) => {
        var baseFee = Number(block.baseFeePerGas);
        var maxPriority = Number(tip);
        var maxFee = (maxPriority + baseFee) * 1000;
        tokenid.forEach(async (id) => {
          await vaultcontract.methods.claim([id])
            .send({
              from: account,
              maxFeePerGas: maxFee,
              maxPriorityFeePerGas: maxPriority
            })
        })
      });
    })
  }
  async function unstakeall() {
    const web3 = new Web3(Moralis.provider);
    const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
    web3.eth.Contract.defaultAccount;
    const account = await Moralis.account;
    var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
    const arraynft = Array.from(rawnfts.map(Number));
    const tokenid = arraynft.filter(Number);
    await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
      Web3Alc.eth.getBlock('pending').then((block) => {
        var baseFee = Number(block.baseFeePerGas);
        var maxPriority = Number(tip);
        var maxFee = (maxPriority + baseFee) * 800;
        tokenid.forEach(async (id) => {
          await vaultcontract.methods.unstake([id])
            .send({
              from: account,
              maxFeePerGas: maxFee,
              maxPriorityFeePerGas: maxPriority
            })
        })
      });
    })
  }

  async function Stak() {
    const web3 = new Web3(Moralis.provider);
    const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
    const account = await Moralis.account;
    const stakednfts = await vaultcontract.methods.tokensOfOwner(account).call()
    .then(id => {
      return(id)
    })
    const nftstk = await Promise.all(stakednfts.map(async i => {
      let stkid = {
        tokenId: i,
      }
      return(stkid);
    }))
      getStk(nftstk)
  }
  const Total = () => {

    const {fetchERC20Balances, data} = useERC20Balances();

    const [token, setTokenPLNT] = useState();
    
    useEffect(() => {
      const DeN = Balances();

      async function Balances() {
        await fetchERC20Balances({
          params: {
            chain: 'cronos',
            address: "0x755067ed1F08Ce95ff9533C973C17c09C4Fd7F23"
          }
        })
      }
    }, []);
  
    useEffect(() => {
        if(!token) {
            setTokenPLNT(data && data[1].balance)
        }
    }, [data])

    if(token) {
      setPlanet(token);
        return ( 
            <p>{parseFloat(Moralis.Units.FromWei(token))} PLNT</p>
        )

    } else {
        return (
            <p>-</p>
        )
    }
}

  
  console.log('planet', Planet);

  // console.log(Balance);
  // console.log('STAKED', tokenid)
  // console.log('REWARDS', Rewards)
  // console.log('account', account)
  console.log("NFTstak", nftstk);

  useEffect(() => {
    if(!isWeb3Enabled)return;
    fetchTokenMetadata();
    Pbalance;
    console.log("Pbalance",Pbalance)
  }, [isWeb3Enabled])

  useEffect(() => {
  
    if(!isWeb3Enabled)return;
    fetchNFTsForContract()
  }, [isWeb3Enabled]) 

  return (
    <Container style={{}}>
      <Box  container
            spacing={2}
            style={{
              textAlign: "center",
              verticalAlign: "center",
              marginTop: -40,
              height: 85,
              borderRadius: 10,
            }}>
      <h3><font color="white">Remember to AUTH your CNs for Missions</font></h3>
      </Box>
      <Grid container spacing={6}>
      <Grid item xs={4}>
      <Box
            container
            spacing={2}
            style={{
              textAlign: "center",
              verticalAlign: "center",
              marginTop: 2,
              height: 200,
              width: 'auto',
              borderRadius: 100,

            }}
          >
      <Box 
            container
            spacing={2}
            style={{
              textAlign: "center",
              verticalAlign: "center",
              marginTop: 2,
              height: 85,
              borderRadius: 10,
            }}
          >
            <div style={style.sp}>
            <h2 color="white"><font color="white">$PLNT:</font><p></p><font size="20px" color="green">{Rewards}</font></h2> 
            <Button style={{color:"white", textShadow: "0 0 7px white, 0 0 10px white, 0 0 21px white, 0 0 42px #E6E6FA, 0 0 82px #E6E6FA,  0 0 92px #E6E6FA,  0 0 102px #0fa,  0 0 151px #0fa",}} loading={true} onClick={rewardinfo}>Rewards</Button>
            <div>Balance: {Pbalance}</div>
            </div>
            <div style={style.spfluo}>
            <Button style={{color:"red", textShadow: "0 0 7px red, 0 0 10px red, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA, 0 0 82px #E6E6FA,  0 0 92px #E6E6FA,  0 0 102px #0fa,  0 0 151px #0fa"}}
             onClick={unstakeall}>Unstake All</Button>
            <Button style ={{color:"white", textShadow: "0 0 7px #E6E6FA, 0 0 10px #E6E6FA, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA, 0 0 82px #E6E6FA,  0 0 92px #E6E6FA,  0 0 102px #0fa,  0 0 151px #0fa",}} onClick={claimit}>Claim</Button>
            </div>
          </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box
            container
            spacing={4}
            style={{
              textAlign: "center",
              verticalAlign: "center",
              marginTop: 2,
              height: 40,
              borderRadius: 10,
              xs: "auto", 

            }}
          >
            <div style={style.s}>
            <h2><font size="20px" color="white">Your Cronosnauts in <font size="20px" color="RED">Mission:</font></font> <font size="20px" color="green">{Ids} </font></h2>
            </div>
          </Box>
          <Box
            container
            spacing={2}
            style={{
              textAlign: "center",
              verticalAlign: "center",
              marginTop: 40,
              height: 60,
              borderRadius: 10,
            }}
          >
            <div style={style.s}>
            <h2><font size="20px" color="white">Your Cronosnauts in Spaceship:</font><font size="20px" color="green"> {NFTs.length}</font></h2>
            </div>
          </Box>
          <Box
            container
            spacing={2}
            style={{
              textAlign: "center",
              verticalAlign: "center",
              marginTop: 2,
              height: 40,
              borderRadius: 10,
            }}
          >
            <div style={style.s}>
            <Button style ={{color:"red", textShadow: "0 0 7px red, 0 0 10px red, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA, 0 0 82px #E6E6FA,  0 0 92px #E6E6FA,  0 0 102px #0fa,  0 0 151px #0fa",}} onClick={enable}><font size="20px" color="white">AUTH YOUR CNs FOR MISSION</font></Button>
            <Button style ={{color:"green", textShadow: "0 0 7px green, 0 0 10px green, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA, 0 0 82px #E6E6FA,  0 0 92px #E6E6FA,  0 0 102px #0fa,  0 0 151px #0fa",}} onClick={verify}><font size="20px" color="white">TERMINAL (SHOW DATA)</font></Button>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box style={{ borderRadius: 10, marginBottom:20 }}>
            <div style={style.mission}> 
            <Button style ={{ color:"red", textShadow: "0 0 7px red, 0 0 10px red, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA, 0 0 82px #E6E6FA,  0 0 92px #E6E6FA,  0 0 102px #0fa,  0 0 151px #0fa",}} onClick={Stak}>»» <font size="20px" color="white">CHECK CRONOSNAUTS  IN MISSION </font>««</Button>
            </div>
            <p></p>
            <div style={{marginTop:10, marginBottom:20}}>
            <div style={styles.NFTz}>
              <Skeleton active loading={nftstk && nftstk.nft}>
              {nftstk?.map((nft, i) => {
                      async function unstakeit() {
                        const web3 = new Web3(Moralis.provider);
                        const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
                        const account = await Moralis.account;
                        vaultcontract.methods.unstake([nft.tokenId]).send({ from: account });
                      }

                    console.log("NFTstak", nftstk);

                    return (
                      <Card
                        hoverable
                        actions={[
                          <Tooltip title="Finish mission">
                            <ApiOutlined onClick={unstakeit} />
                          </Tooltip>,
                        ]}
                        style={nftcard.cards3}
                        cover={
                          <Image
                            src={nftpng + nft.tokenId + '.png'}
                            alt=""
                            style={{ height: "300px", maxHeight: "400px", borderRadius: "10px", boxShadow: "0 0 7px #fff, 0 0 10px #ff4b1f, 0 0 13px #ff4b1f, 0 0 17px #ff4b1f, 0 0 20px #ff4b1f" }}
                            preview={false}
                          />
                        }
                        key={i}
                      >
                        <Meta title={nft.tokenId} style={nft.card2} /> <BatteryChargingFullIcon />
                      </Card>
                    );
                  })}
              </Skeleton>
            </div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box style={{
             borderRadius: 20 ,
             border: "3px solid white", 
             background: "rgba(51, 170, 51, .3)",
             boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa,  0 0 92px #0fa,  0 0 102px",
             }}>
          <div style={style.mission2}> 
          <Button style={{ color:"green", textShadow: "0 0 7px green, 0 0 10px green, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA, 0 0 82px #E6E6FA,  0 0 92px #E6E6FA,  0 0 102px #0fa,  0 0 151px #0fa",}}>»» <font size="20px" color="white"> CRONOSNAUTS IN SPACESCHIP </font>««</Button>
          </div>
          <div style={{marginTop:20}}>
            <div style={styles.NFTz}>
              <Skeleton active loading={NFTs && NFTs.events}>
                {NFTs &&
                  NFTs?.map((item, index, nft, account) => {
                    //Verify Metadata
                    const web3 = new Web3(Moralis.provider);
                    const vaultcontract = new web3.eth.Contract(
                      VAULTABI,
                      STAKINGCONTRACT,
                    );
                    web3.eth.Contract.defaultAccount;
                    const meta = JSON.parse(item.metadata);
                    const arraynft = Array.from(NFTs?.map(Number));
                    const tokenid = arraynft.filter(Number);
                    async function Stakeit() {
                      const account = await Moralis.account;
                      const options = {
                        from: account,
                      };
                      vaultcontract.methods
                        .stake([item.token_id])
                        .send({ from: account });
                    }

                    return (
                      <Card
                        hoverable
                        actions={[
                          <Tooltip title="Send in mission">
                            <CheckOutlined onClick={Stakeit} />
                          </Tooltip>,
                        ]}
                        style={nftcard.cards}
                        cover={
                          <Image
                            src={meta?.image ? meta.image : null}
                            alt=""
                            style={{ height: "300px", maxHeight: "400px", borderRadius: "10px",   boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 15px #0fa,  0 0 25px #0fa"}}
                            preview={false}
                          />
                        }
                        key={index}
                      >
                        <Meta title={meta.name} style={nftcard.card2} />
                      </Card>
                    );
                  })}
              </Skeleton>
            </div>
            </div>
          </Box>
          <Box style={{height:50}}></Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Stake;