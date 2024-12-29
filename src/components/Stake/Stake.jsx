/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { ethers } from 'ethers'
import { Button, ButtonGroup } from '@mui/material'
import React from 'react';
import { useEffect, useState } from 'react'
import ABI from './ABI/ABI.json';
import VAULTABI from './ABI/VAULTABI.json';
import TOKENABI from './ABI/TOKENABI.json';
import { NFTCONTRACT, STAKINGCONTRACT, nftpng } from './config';
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";
import { CheckOutlined, ApiOutlined } from '@ant-design/icons';
import { Box, Container, Grid} from '@mui/material';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { RawOff } from '@mui/icons-material';
import './Stake.css'
//import Total from '../PROB';
import LoadingButton from '@mui/lab/LoadingButton';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { getProviderInfoByCheck } from 'web3modal';
import useAuth from 'hooks/useAuth';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
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
    border: "3px solid white", 
    borderRadius: "25px",
    background: "black",
    boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff",
    marginTop: 25,
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

const Stake = () => {
  const [visible, setVisibility] = useState(false);
  //const { Moralis, chainId } = useMoralis();
  const [receiverToSend, setReceiver] = useState(null);
  const [amountToSend, setAmount] = useState(null);
  const [nftToSend, setNftToSend] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [initData, setInitData] = useState([]);
  const [NFTs, setNFTs] = useState([]);
  const [NFTStaked, setNFTStaked] = useState([]);
  const [Balance, setBalance] = useState([]);
  const [Rewards, setRewards] = useState([]);
  const [Ids, setIds] = useState([]);
  const [rawnfts, setRawnfts] = useState([]);
  const [accounts, setAccount] = useState([]);
  const [tokenid, setToken] = useState([]);
  const [nftstk, getStk] = useState([])
  const [NTS, getNTS] = useState([]);
  const [Planet, setPlanet] = useState([])
  const [loading, setLoading] = useState(true);
  var [Pbalance, getBalancePLNT] = useState([]);
  var [PROBE, getPROBE] = useState([]);
  var [RealR, getReal] = useState([]);
  const [token, setTokenPLNT] = useState();
  const { account , active } = useWeb3React();
  const { library } = useActiveWeb3React();

  const signer = library.getSigner()
  const simpleRpcProvider = new ethers.providers.JsonRpcProvider('https://rpc.vvs.finance/')
  const contract = new ethers.Contract(NFTCONTRACT, ABI, signer);
  const vaultcontract = new ethers.Contract( STAKINGCONTRACT, VAULTABI, signer);
 
  const Web3Alc = createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/v2/vI9xj-bH51cHLlA_KxVtOye_AZownjSB");
  //const Web3Api = useMoralisWeb3Api();

  const Ini = async () => {
    const vaultcontract = ethers.Contract(VAULTABI, STAKINGCONTRACT, signer);
    const contract = ethers.Contract(ABI, NFTCONTRACT, signer);
    
    async function Stakeit(item, index, account) {
      console.log("Transfer", item, index);
      
        vaultcontract.stake([item.token_id]).send({ from: account });
  
      setIsPending(true);
   
      try {
        const tx = await Stakeit();
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
         const tx = await Unstakeit();
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
      method: 'GET',
      url: 'https://deep-index.moralis.io/api/v2/erc20/metadata',
      params: {chain: 'cronos', addresses: '0x2BD7dbdbCf57c9B907c381E2F112D9682caad311'},
      headers: {accept: 'application/json', 'X-API-Key': 'test'}
    };
    
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        getBalancePLNT(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
   }

  const fetchNFTsForContract = async () => {
    const accurl = JSON.stringify(account)
    //questo è la logica del fetch del contratto Cronosnauts (Non in staking)
    const options = {
      method: 'GET',
      url: 'https://deep-index.moralis.io/api/v2/' + account + '/nft',
      params: {
        chain: 'cronos',
        format: 'decimal',
        token_addresses: '0x39128237ea72040B96D3ea516619A226126ec838',
        normalizeMetadata: 'false'
      },
      headers: {accept: 'application/json', 'X-API-Key': 'JC5dsf3ZKeAr5aszxVkpfnTkshpu0sU9BWzda4U3SdeyOJ6plyLyhcNVIzQjq8uy'}
    };
    
    axios
      .request(options)
      .then(function (response) {
        console.log("response", response.data);
        const datawrap = response.data
        setNFTs(datawrap.result);
      })
      .catch(function (error) {
        console.error(error);
      });
    //console.log(, JSON.parse(events.result[0].metadata))

    const fetchStaking = async () => {
      //questo è la logica del fetch del contratto Staking 
      const options = {
        method: 'GET',
        url: 'https://deep-index.moralis.io/api/v2/' + account + '/nft',
        params: {
          chain: 'cronos',
          format: 'decimal',
          token_addresses: '0xf9262154977affc3a0176208e140dacae1736c5a',
          normalizeMetadata: 'false'
        },
        headers: {accept: 'application/json', 'X-API-Key': 'JC5dsf3ZKeAr5aszxVkpfnTkshpu0sU9BWzda4U3SdeyOJ6plyLyhcNVIzQjq8uy'}
      };
      
      axios
        .request(options)
        .then(function (response) {
          console.log("Response datat staking", response.data, response, response.result);
          var datastak = response.data
          setNFTStaked(datastak.result);
        })
        .catch(function (error) {
          console.error(error);
        });
      //console.log(, JSON.parse(events.result[0].metadata))
    }};

    async function fetchStaked() {

      const options = {
        method: 'GET',
        url: 'https://deep-index.moralis.io/api/v2/' + account + '/nft',
        params: {
          chain: 'cronos',
          format: 'decimal',
          token_addresses: '0xf9262154977affc3a0176208e140dacae1736c5a',
          normalizeMetadata: 'false'
        },
        headers: {accept: 'application/json', 'X-API-Key': 'JC5dsf3ZKeAr5aszxVkpfnTkshpu0sU9BWzda4U3SdeyOJ6plyLyhcNVIzQjq8uy'}
      };
      
      axios
        .request(options)
        .then(function (response) {
          console.log("Response datat staking", response.data, response, response.result);
          var datastak = response.data
          setNFTStaked(datastak.result);
        })
        .catch(function (error) {
          console.error(error);
        });
      
    }

  async function enable() {
    contract.setApprovalForAll(STAKINGCONTRACT, true).send({ from: account });
  }

  async function rewardinfo() {
    var rawnfts = await vaultcontract.tokensOfOwner(account);
    const arraynft = Array.from(rawnfts.map(Number));
    const tokenid = arraynft.filter(Number);
    var rwdArray = [];
    tokenid.forEach(async (id) => {
      var rawearn = await vaultcontract.earningInfo(account, [id]);
      var array = Array.from(rawearn.map(Number));
      array.forEach(async (item) => {
        var earned = String(item).split(",")[0];
        var earnedrwd = ethers.utils.formatEther(earned);
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
    var getstakednfts = await vaultcontract.tokensOfOwner(account);
    setBalance(getbalance);
    var getbalance = Number(await vaultcontract.balanceOf(account));
    setIds(getstakednfts);
    console.log('STAKED', getstakednfts)

  }
  console.log("BB",Balance)
  console.log("ww", NFTStaked)



  const Speriamo = async () => {

      const vaultcontract = ethers.Contract(VAULTABI, STAKINGCONTRACT);
      setVault(vaultcontract)
      const { account } = useAuth();
      setAccount(account)
            var rawnfts = await vaultcontract.tokensOfOwner(account);
      setRawnfts(rawnfts);
      const arraynft = Array.from(rawnfts.map(Number));
      const tokenid = arraynft.filter(Number);
      setToken(tokenid)
  }
  async function claimit() {
  var rawnfts = await vaultcontract.tokensOfOwner(account);
  const arraynft = Array.from(rawnfts.map(Number));
  const tokenid = arraynft.filter(Number);
  await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
    Web3Alc.eth.getBlock('pending').then((block) => {
      var baseFee = Number(block.baseFeePerGas);
      var maxPriority = Number(tip);
      var maxFee = (maxPriority + baseFee) * 1000;
      vaultcontract.claim(tokenid)
      })
    });
  console.log("token", tokenid)
}
async function unstakeall() {
  var rawnfts = await vaultcontract.tokensOfOwner(account);
  const arraynft = Array.from(rawnfts.map(Number));
  const tokenid = arraynft.filter(Number);
  await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
    Web3Alc.eth.getBlock('pending').then((block) => {
      var baseFee = Number(block.baseFeePerGas);
      var maxPriority = Number(tip);
      var maxFee = (maxPriority + baseFee) * 420;
      vaultcontract.unstake(tokenid)
    });
  })
}

  const Stak = async () => {
    const stakednfts = await vaultcontract.tokensOfOwner(account)
    //const arraynft = Array.from(rawnfts.map(Number))
    //const tokenid = arraynft.filter(Number)
    .then(id => {
      return(id)
    })
    const stk = await Promise.all(stakednfts.map(async i => {
      var ids = i.toString()
      let stkid = {
        tokenId: ids,
      }
      return(stkid);
    }))
    console.log("stk", stk)
      getStk(stk)
  }

  

  const Total = () => {

    const [token, setTokenPLNT] = useState();
    
    useEffect(() => {
      if(account) {
        console.log("NFTs", NFTs)
          return {NFTs}
      }
  }, [NFTs])

  useEffect(() => {
    if(account) {
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
      var tk = ethers.utils.formatEther(token)
        return ( 
            <p>{parseFloat([tk])} PROBE</p>
        )

    } else {
        return (
            <p>-</p>
        )
    }
}
  
  console.log('planet', Planet);
  console.table("NFT", NFTs)
  // console.log('STAKED', tokenid)
   console.log('REWARDS', Rewards)
  // console.log('account', account)
  console.log("NFTstak", nftstk);
  console.log("REAL", RealR);
  
  useEffect(() => {
    if(!Rewards)return;
    Rewards
    console.log("Pbalance",Rewards)
  }, [Rewards])

  useEffect(() => {
    if (account) return
    setRewards()
    console.log("Pbalance",Rewards)
  }, [account])

  useEffect(() => {
    if(!account) 
    return
     signer
  }, [account, signer])

  useEffect(() => {
    if (account || !account)
    return fetchStaked();
  }, [account])

  useEffect(() => {
    if (account) 
    return fetchNFTsForContract(); console.log(NFTs)
  }, [account]) 

  useEffect(() => {
    if (account) 
    return Stak(); 
  }, [account]) 

  useEffect(() => {
    if (account) 
    return rewardinfo(); 
  }, [account]) 

  useEffect(() => {
    if (NFTs) 
    return fetchNFTsForContract(); 
  }, [account]) 

  const ifConnected = () => {
    if (!account)
       return  <div style={{textAlign: 'center', verticalAlign: 'center', fontSize: "15px",color:"red", textShadow: "0 0 7px white, 0 0 10px green, 0 0 21px aqua"}}><font size="40px" color="white">You are not connected!</font></div>
    else 
      return  <div style={{textAlign: 'center', verticalAlign: 'center', fontSize: "15px",color:"red", textShadow: "0 0 7px white, 0 0 10px green, 0 0 21px aqua"}}><font size="40px" color="white">Connected!</font></div>
  } 

  return(
  <Box style={{mt:-50}} sx={{ flexGrow: 1 }}>
    <div style={{textAlign: 'center', verticalAlign: 'center', fontSize: "40px",color:"red", textShadow: "0 0 7px white, 0 0 10px green, 0 0 21px aqua"}}><font size="40px" color="white">STAKING VAULT</font></div>

    <div style={{height:40}}><p></p></div>
    <div style={{textAlign: 'center', verticalAlign: 'center'}}>
    <div>{ifConnected()}</div>
    <div style={{height:10}}><p></p></div>
    <div style={styles.t}>Remember to AUTH STAKING for your Aliens</div>
    <div style={{height:20}}><p></p></div>
    <Button variant="outlined" onClick={enable}>AUTH STAKING</Button>
    <div style={{height:30}}><p></p></div>
    </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <div>
            <div style={styles.staked}>Staked: </div><div style={{color: "red", fontSize: 25}}>{nftstk.length}</div>
            <div style={styles.staked}>In Wallet: </div><div style={{color: "red", fontSize: 25}}>{NFTs.length}</div>
            <div/>
            <div style={{height:20}}><p></p></div>
            <Button variant="outlined" style={{color: 'red', fontSize: 20}} onClick={() => unstakeall()}>UNSTAKE ALL</Button>
            <Button variant="outlined" style={{ fontSize: 20}} onClick={() => Stak}>SHOW STAKED</Button>
            </div>

          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <div>
            <div style={{fontFamily: "'Space Mono', monospace",fontSize: 25, color: 'white', textShadow: "0 0 7px white, 0 0 10px green, 0 0 21px aqua"}}>BALANCE</div>
            <div style={{height:30}}><p></p></div>
            <div id="earned" style={styles.staked}>$PROBE: **** </div><div style={{color: "green", fontSize: 25}}>{Rewards}</div>
            <div style={{height:10}}><p></p></div>
            <div/>
            <div style={{height:45}}><p></p></div>
            <Button variant="outlined" style={{color: 'red', fontSize: 20}} onClick={()=> claimit()}>claim</Button>
            <Button variant="outlined" style={{ fontSize: 20}} onClick={() => rewardinfo()} >SHOW BALANCE</Button>
            </div>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
          <Box style={{ borderRadius: 10, marginBottom:20 }}>
            <div style={style.mission}> 
            <Button style ={{ color:"red", textShadow: "0 0 7px red, 0 0 10px red, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA, 0 0 82px #E6E6FA,  0 0 92px #E6E6FA,  0 0 102px #0fa,  0 0 151px #0fa",}} onClick={() => Stak()}>»» <font size="20px" color="white">ALIENS IN STAKING </font>««</Button>
            </div>
            <p></p>
            <div style={{marginTop:10, marginBottom:20}}>
            <div style={styles.NFTz}>
              <Skeleton active loading={nftstk && nftstk.result}>
              {nftstk?.map((i, tokenId) => {
                      const pref = 'https://ipfs.io/ipfs/QmcxB3HNgZ1y1dcj4jE8BRYW3v3RXTRHdSYxgWMGGUtv8y/';
                      const alien = pref;
                      const idStaked = i.tokenId
                    //  const plaza = ethers.BigNumber.from(tokenId)
                    //  const plazadel = Number(plaza)
                      console.log(nftstk, tokenId, idStaked, tokenId.tokenId)
                      async function unstakeit() {
                        vaultcontract.unstake([idStaked])
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
                            src={alien + idStaked + '.webp'}
                            alt=""
                            style={{ height: "300px", maxHeight: "400px", borderRadius: "10px", boxShadow: "0 0 7px #fff, 0 0 10px #ff4b1f, 0 0 13px #ff4b1f, 0 0 17px #ff4b1f, 0 0 20px #ff4b1f" }}
                            preview={false}
                          />
                        }
                        key={i}
                      >
                        <Meta title={tokenId.token_id} style={tokenId.card2} /> <BatteryChargingFullIcon />
                      </Card>
                    );
                  })}
              </Skeleton>
            </div>
            </div>
          </Box>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item> 
          <Box style={{}}>
          <div style={style.mission2}> 
          <Button onClick={() => fetch } style={{ color:"green", textShadow: "0 0 7px green, 0 0 10px green"}}><font size="20px" color="white"> MY ALIENS </font></Button>
          </div>
          <div style={{marginTop:20}}>
            <div style={styles.NFTz}>
              <Skeleton active loading={NFTs && NFTs.result}>
                {NFTs &&
                  NFTs?.map((item) => {
                    //Verify Metadata
                    //console.log("index", index)
                    const meta = JSON.parse(item.metadata);
                    const LOL = meta.image.substring(7, 80);
                    const pref = "https://ipfs.io/ipfs/";
                    const alien = pref + LOL;
                    console.log("alien", alien)
                    const arraynft = Array.from(NFTs?.map(Number));
                    const tokenid = arraynft.filter(Number);
                    async function Stakeit() { 
                      vaultcontract.stake([item.token_id])
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
                            src={alien}
                            alt=""
                            style={{ height: "300px", maxHeight: "400px", borderRadius: "10px",   boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 15px #0fa,  0 0 25px #0fa"}}
                            preview={false}
                          />
                        }
                        key={item}
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
          </Item>
        </Grid>
      </Grid>
      <Box style={{
        height:50
      }}/>
    </Box>
  );
}

export default Stake;