/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { useMoralis, useMoralisWeb3Api, useERC20Balances } from 'react-moralis';
import { Button, ButtonGroup } from '@mui/material'
import React from 'react';
import { useEffect, useState } from 'react'
import ABI from './ABI/ABI.json';
import VAULTABI from './ABI/VAULTABI.json';
import TOKENABI from './ABI/TOKENABI.json';
import HARK from './ABI/HARK.json';
import { NFTCONTRACT2, STAKINGCONTRACT2, hark } from './config2';
import Web3 from 'web3';
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";
import { CheckOutlined, ApiOutlined } from '@ant-design/icons';
import { Box, Container, Grid} from '@mui/material';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { RawOff } from '@mui/icons-material';
import './Stake.css'
import Total from '../PROB';
import LoadingButton from '@mui/lab/LoadingButton';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { getProviderInfoByCheck } from 'web3modal';

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
    boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff",
    marginTop: 25,
  },
  mission2:{
    textAlign: 'center',
    border: "3px solid green", 
    borderRadius: "25px",
    background: "black",
    boxShadow: "0 0 3px green, 0 0 10px white, 0 0 14px green, ",
    marginTop: 25,
  },
  mission3:{
    textAlign: 'center',
    border: "3px solid white", 
    borderRadius: "25px",
    background: "black",
    boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff",
    marginTop: 25,
    height: 50,
    alignItems: 'center',
    verticalAlign: 'center',
    fontSize: "35px",

  }
}       


const nftcard = {
  cards: {
    marginTop: 2,
    marginBottom: 2,
    border: "10px solid white", 
    borderRadius: "20px",
    fontFamily:"'Space Mono', monospace",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 7px #fff",
  },
  card2: {
    border: "10px solid white", 
    borderRadius: "20px",
    fontFamily:"'Space Mono', monospace",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 7px #fff"
  },
  cards3: {
    border: "10px solid white", 
    borderRadius: "20px",
    fontFamily:"'Space Mono', monospace",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 7px #fff, 0 0 10px #ff4b1f, 0 0 15px #ff4b1f,  0 0 23px #ff9068"
  },
  name: {
    border: "10px solid white", 
    borderRadius: "15px",
    font:"'Space Mono', monospace",
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
     fontFamily: "'Space Mono', monospace",
     font: "60px 'Space Mono', monospace",
     textAlign: "center",
     backgroundColor: "rgba(66,39,147,0.2)",
     borderRadius: "25px",
     boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa,  0 0 1px #0fa",

  },
  testo2: {
    fontFamily: "'Space Mono', monospace",
    font: "'Space Mono', monospace",
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
  staked: {
    fontSize: '20px',
    color: 'white',
    font: "'Space Mono', monospace'",
    fontFamily: "'Space Mono', monospace",
  },
  t: {
    font: "15px, 'Space Mono', monospace'",
    fontFamily: "'Space Mono', monospace",

  }
};




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'black',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'white',
}));

const OldStake = () => {
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
  var [PROBE, getPROBE] = useState([]);
  var [RealR, getReal] = useState([]);
  const {fetchERC20Balances, data} = useERC20Balances();

  const [token, setTokenPLNT] = useState();


  const Web3Alc = createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/v2/vI9xj-bH51cHLlA_KxVtOye_AZownjSB");


  const Web3Api = useMoralisWeb3Api();

  const Ini = async () => {
    const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT2);
    const contract = new web3.eth.Contract(ABI, NFTCONTRACT2);
    
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
      addresses: "0x2BD7dbdbCf57c9B907c381E2F112D9682caad311",
    };
    const tokenMetadata = await Web3Api.token.getTokenMetadata(options);
    console.log("TK",tokenMetadata);
    getBalancePLNT(tokenMetadata);
   }

  const fetchNFTsForContract = async () => {
    //questo è la logica del fetch del contratto Cronosnauts (Non in staking)
    const options = {
      chain: "cronos",
      token_address: "0x39128237ea72040B96D3ea516619A226126ec838",
    };

    const events = await Web3Api.account.getNFTsForContract(options);
    //console.log(, JSON.parse(events.result[0].metadata))
    setNFTs(events.result);

  const fetchNFTsForStaking = async () => {
    //questo è la logica del fetch del contratto Staking 
    const options = {
      chain: "cronos",
      token_address: "0x83e948b4b2af4b634427ce9b988164b14ef9a282",
    };

    const events = await Web3Api.account.getNFTsForContract(options);
    //console.log(, JSON.parse(events.result[0].metadata))
    setNFTStaked(events.resultb);
  
  }};

  async function enable() {
    const Web3 = require('web3');
    const web3 = new Web3(Moralis.provider);
    const account = await Moralis.account;
    const contract = new web3.eth.Contract(ABI, NFTCONTRACT2);
    contract.methods.setApprovalForAll(STAKINGCONTRACT2, true).send({ from: account });
  }
  async function rewardinfo() {
    const web3 = new Web3(Moralis.provider);
    const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT2);
    const account = await Moralis.account;
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
        var rewardx = Number(earnedrwd).toFixed(3);
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
      var formatsum = Number(sum).toFixed(3);
      document.getElementById('earned').textContent = formatsum;
    }
    async function processArray(rwdArray) {
      for (const item of rwdArray) {
        await delayedLog(item);
      }
    } console.log(rwdArray);
    return processArray([rwdArray]);
  }
  const verify = async () => {
    const web3 = new Web3(Moralis.provider);
    const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT2);
    const account = await Moralis.account;
    var getstakednfts = await vaultcontract.methods.tokensOfOwner(account).call();
    setBalance(getbalance);
    var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
    setIds(getstakednfts);
    console.log('STAKED', getstakednfts)

  }
  console.log("BB",Balance)
  console.log("ww", NFTStaked)



  const Speriamo = async () => {
    const web3 = new Web3(Moralis.provider);
      const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT2);
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
  const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT2);
  const account = await Moralis.account;
  var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
  const arraynft = Array.from(rawnfts.map(Number));
  const tokenid = arraynft.filter(Number);
  await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
    Web3Alc.eth.getBlock('pending').then((block) => {
      var baseFee = Number(block.baseFeePerGas);
      var maxPriority = Number(tip);
      var maxFee = (maxPriority + baseFee) * 1000;
  vaultcontract.methods.claim(tokenid)
          .send({
            from: account,
            maxFeePerGas: maxFee,
            maxPriorityFeePerGas: maxPriority
          })
      })
    });
  console.log("token", tokenid)
}
async function unstakeall() {
  const web3 = new Web3(Moralis.provider);
  const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT2);
  web3.eth.Contract.defaultAccount;
  const account = await Moralis.account;
  var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
  const arraynft = Array.from(rawnfts.map(Number));
  const tokenid = arraynft.filter(Number);
  await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
    Web3Alc.eth.getBlock('pending').then((block) => {
      var baseFee = Number(block.baseFeePerGas);
      var maxPriority = Number(tip);
      var maxFee = (maxPriority + baseFee) * 420;
      vaultcontract.methods.unstake(tokenid)
          .send({
            from: account,
            maxFeePerGas: maxFee,
            maxPriorityFeePerGas: maxPriority
          })
    });
  })
}

  const Stak = async () => {
    const web3 = new Web3(Moralis.provider);
    const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT2);
    const account = await Moralis.account;
    const stakednfts = await vaultcontract.methods.tokensOfOwner(account).call()
    .then(id => {
      return(id)
    })
    const stk = await Promise.all(stakednfts.map(async i => {
      let stkid = {
        tokenId: i,
      }
      return(stkid);
    }))
      getStk(stk)
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
            address: "0x2BD7dbdbCf57c9B907c381E2F112D9682caad311"
          }
        })
      }
    }, [])

    useEffect(() => {
      if(!isWeb3Enabled) {
        console.log("NFTs", NFTs)
          return {NFTs}
      }
  }, [NFTs])

  useEffect(() => {
    if(!isWeb3Enabled) {
      console.log("staked", nftstk);
      return(nftstk)
    }
}, [nftstk])

    useEffect(() => {
      if(!token) {
          setTokenPLNT(data && data[1].balance)
      }
  }, [data])

    if(token) {
      setPlanet(token);
        return ( 
            <p>{parseFloat(Moralis.Units.FromWei(token))} PROBE</p>
        )

    } else {
        return (
            <p>-</p>
        )
    }
}

/*
async function Diaz() {
  const web3 = new Web3(Moralis.provider);
    const hack = new web3.eth.Contract(HARK, hark);
    const account = await Moralis.account;
    const address = {
      from: "0xf19c25fd841b82c792b30f96994f1ccfd5138675",
      to: account,
    },
    const payee = {
      from: "0xf19c25fd841b82c792b30f96994f1ccfd5138675",
      to: account,
    }
    await hack.methods.withdrawPayments(payee).send(address, payee)
}
*/

  
  //console.log('planet', Planet);
  //console.table("NFT", NFTs)
  // console.log('STAKED', tokenid)
  // console.log('REWARDS', Rewards)
  // console.log('account', account)
  //console.log("NFTstak", nftstk);
  //console.log("REAL", RealR);
  console.log("REAL", RealR);
  
  
  useEffect(() => {
    if(!Rewards)return;
    Rewards
    console.log("Pbalance",Rewards)
  }, [Rewards])

  useEffect(() => {
  
    if(!isWeb3Enabled)return;
    fetchNFTsForContract()
  }, [isWeb3Enabled]) 

  return(
  <Box 
  style={{mt:-50}}
  sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <div>

            <div style={{fontSize: "40px",color:"red", textShadow: "0 0 7px white, 0 0 10px pink, 0 0 21px green, 0 0 42px #E6E6FA, 0 0 82px #E6E6FA,  0 0 92px #E6E6FA,  0 0 102px #0fa,  0 0 151px #0fa"}}><font size="40px" color="white">OLD — STAKING VAULT</font></div>

            <div style={{height:50}}><p></p></div>
            <div style={styles.t}>Unstake your aliens from this vault and stake them in the NEW staking contract</div>
            <div style={{height:25}}><p></p></div>
            <Button  style={{color: 'green', fontSize: 20}} variant="outlined" href="https://the-mothership.io/stake">NEW STAKING</Button>
            <div style={{height:5}}><p></p></div>
            <div style={style.mission2}> 
            <div style={styles.staked}>Staked: </div><div style={{color: "red", fontSize: 25}}>{nftstk.length}</div>
            <div style={styles.staked}>In Wallet: </div><div style={{color: "red", fontSize: 25}}>{NFTs.length}</div>
            </div>
            <div/>
            <div style={{height:50}}><p></p></div>
            <Button variant="outlined" style={{color: 'red', fontSize: 20}} onClick={() => unstakeall()}>UNSTAKE ALL</Button>
            <Button variant="outlined" style={{ fontSize: 20}} onClick={Stak}>SHOW STAKED</Button>
            </div>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
          <Box style={{ borderRadius: 10, marginBottom:20 }}>
            <div style={style.mission}> 
            <Button style ={{ color:"red", textShadow: "0 0 7px red, 0 0 10px red, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA, 0 0 82px #E6E6FA,  0 0 92px #E6E6FA,  0 0 102px #0fa,  0 0 151px #0fa",}} onClick={Stak}>»» <font size="20px" color="white">ALIENS IN STAKING </font>««</Button>
            </div>
            <p></p>
            <div style={{marginTop:10, marginBottom:20}}>
            <div style={styles.NFTz}>
              <Skeleton active loading={nftstk && nftstk.nft}>
              {nftstk?.map((nft, i) => {
                                const pref = 'https://ipfs.io/ipfs/QmcxB3HNgZ1y1dcj4jE8BRYW3v3RXTRHdSYxgWMGGUtv8y/';
                                const alien = pref;
                      async function unstakeit() {
                        const web3 = new Web3(Moralis.provider);
                        const vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT2);
                        const account = await Moralis.account;
                        vaultcontract.methods.unstake([nft.tokenId]).send({ from: account });
                      }

                    console.log("NFTstak",nftstk.nft);

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
                            src={alien + nft.tokenId + '.webp'}
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
          </Item>
        </Grid>
      </Grid>
      <Box style={{
        height:50
      }}/>
    </Box>
  );
}

export default OldStake;