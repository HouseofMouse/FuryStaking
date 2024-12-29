/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import ModalStake from "./components/modal/ModalStake";
import HouseCard from "./components/card/HouseCard";
import HouseCardTest from "./components/card/HouseCardTest";
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import furym from '../../image/furym.png';
import ACS from '../../image/ACS.png';
import LinearProgress from '@mui/material/LinearProgress';
import PlusMus from '../../image/PlusMus.png';
import Comb from '../../image/Comb.jpeg';
import FQG from '../../image/FQG.jpg';
import { Mice, Quacks, Houses, Staking, TFU } from "components/StakeFuryNew/Contracts";
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ModalMouse from './components/modal/ModalMouse';
import { styled } from '@mui/material/styles';
import {
  Contractor
} from './IniContracts'
import ABI from './components/card/ABI/ABI.json';
import VAULTABI from './components/card/ABI/VAULTABI.json';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import './StakeStyle.css'
import ProgressBar from './ProgressBar'
import { Alert, Progress } from 'antd'
import ModalQuacks from "./components/modal/ModalQuacks";
import ABIMOUSE from './ABIMOUSE.json'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
import { simpleRpcProvider } from "utils/providers";

const NewStakeFury = () => {
  const [Mouse, getMouseStk] = useState();
  const [HNFTs, setNFTs] = useState();
  const [HSNFTs, setHSNFTs] = useState();
  const { library, account, active } = useActiveWeb3React();
  const signer = library.getSigner();
  const [stakedNfts, setStakedNfts] = useState([]);
  const [stk, setStk] = useState([]);
  const vaultcontract = new ethers.Contract('0xAEDB4674635f35F3D32cc1549DA0BfF286258A2B', VAULTABI, signer)
  const HouseContract = new ethers.Contract(Houses, ABIMOUSE, signer);
  const QuacksContract = new ethers.Contract(Quacks, ABI, signer);
  const MiceContract = new ethers.Contract(Mice, ABI, signer);
  const [malux, setMalus] = useState(0);
  const [quacks, setQuacks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [miceAppr, setMiceApprove] = useState(false)
  const [houseAppr, setHouseApprove] = useState(false)
  const [quacksAppr, setQuacksApprove] = useState(false)
  const [errDesc, getError] = useState("")

  const onClose = () => {
    setSuccess(false);
    setError(false);
    setLoading(false)
  }

    async function ApproveMice() {
      const tx = await MiceContract.setApprovalForAll(Staking, true);
      console.log(tx)
    }

    async function ApproveHouse() {
      const tx = await HouseContract.setApprovalForAll(Staking, true);
    }

    async function ApproveQuacks() {
      const tx = await QuacksContract.setApprovalForAll(Staking, true);
    }


  async function handleFetch() {
    await fetchHouseStaked();
    // qui puoi fare altre operazioni
  }

  async function fetchHouseStaked() {

    async function fetchNftIds() {
      const HouseContract = new ethers.Contract(Houses, ABIMOUSE, simpleRpcProvider);


      const balance = await HouseContract.balanceOf(account);
      const ids = [];

      for (let i = 0; i < balance.toNumber(); i++) {
        const id = await HouseContract.tokenOfOwnerByIndex(account, i);
        ids.push(id);
      }
      console.log(balance.toString())
      setNFTs(ids);
    }


    const balance = await HouseContract.balanceOf(account);
    const ids = [];

    for (let i = 0; i < balance.toNumber(); i++) {
      const id = await HouseContract.tokenOfOwnerByIndex(account, i);
      ids.push(id);
    }
    console.log(balance.toString())
    setNFTs(ids);
  }

  const fetchStk = useCallback(async () => {

    const stakedNfts = await vaultcontract.houses_tokensOfOwner(account);
    setStakedNfts(stakedNfts);

    const stk = await Promise.all(stakedNfts.map(async function (i) {

      const mstk = await vaultcontract.getMousesForHouse(Number(i)).then(function (response) {
        return response
      })

      console.log(mstk)

      const numrew = Number(i);

      async function getMalus() {
        if (mstk.length >= 1) {
          const malus = await vaultcontract.malusInfo(numrew);
          const mals = malus.toString()
          return mals
        } else {
          return 0;
        }
      }

      const malus = await getMalus()

      async function getWholeHouse() {
        if (mstk.length >= 1) {
          const rawearn = await vaultcontract.whole_house_earnings(numrew, true, true);
          return rawearn
        } else {
          return [0, 0];
        }
      }

      const rawearn = await getWholeHouse()
      const rwdArray = [];

      const earned = await Promise.all(rawearn.map(function (i) {
        const rewardsFetched = Number(i);
        const earnedRwd = String(i).split(",")[0];
        const earnedRwdFormatted = ethers.utils.formatEther(earnedRwd);
        const rewardX = Number(earnedRwdFormatted).toFixed(3);
        const numRwd = Number(rewardX);
        rwdArray.push(numRwd);
        return numRwd;
      }));

      const txq = await vaultcontract.getQuacksForHouse(i).then(function (response) {
        try {
          const data = response.length
        } catch (e) {
          console.error(e)
        }
        return response.length
      })

      const rewards = earned

      const stkid = {
        tokenId: i.toString(),
        reward: rewards,
        malus: Number(malus),
        stakefm: mstk.length,
        fmid: mstk,
        stakefq: txq
      };
      console.log("important", stkid);
      return stkid;
    }));

    setStk(stk);

  }, [account, signer]);


  useEffect(() => {
    if (account) {
      setInterval(() => {
        fetchStk()
        fetchHouseStaked()
      }, [5000])
    }
  }, [account]);

  return (
    <div>
      {active === true && (
        <div style={{
          height: '100vh',
          width: '100vw',
          maxWidth: '100%',
          backgroundImage: `url(${ACS})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          overflowY: 'scroll',
          marginTop: '-60px'
        }}>
          {loading && (
            <div style={{ fontFamily: 'Unbounded, cursive', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>
              <Alert message="Loading..." type="info" showIcon closable onClose={onClose} />
            </div>
          )}
          {success && (
            <div style={{ fontFamily: 'Unbounded, cursive', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>
              <Alert message="Tx successful" description="Transaction has been successfully processed" type="success" showIcon closable onClose={onClose} />
            </div>
          )}
          {error && (
            <div style={{ fontFamily: 'Unbounded, cursive', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>
              <Alert message="Tx failed" description={errDesc} type="error" showIcon closable onClose={onClose} />
            </div>
          )}
          <Container>
            <Box>
              <div className="card">
                <Box>
                  <Box sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 520,
                    flexGrow: 1,
                    color: 'white',
                    alignItems: 'center',
                    verticalAlign: 'center',
                    textAlign: 'center',
                  }}
                  >
                    <Typography variant="body2" color="white" gutterBottom style={{ textShadows: '3px white 6px purple 7 px acqua', fontFamily: 'Unbounded, cursive' }}>
                      « Remember to Authorise your NFTs for staking »
                    </Typography>
                    <Typography variant="body2" color="white" gutterBottom style={{ textShadows: '3px white 6px purple 7 px acqua', fontFamily: 'Unbounded, cursive' }}>
                      «Note: There are 3 separate authorisation transactions triggered by 3 separate buttons. Once authorised, you can stake your house, and then add your Mice and Quacks»
                    </Typography>
                  </Box>
                  <Box sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 520,
                    flexGrow: 1,
                    color: 'white',
                    alignItems: 'center',
                    verticalAlign: 'center',
                    textAlign: 'center',
                  }}
                  >
                    <Button style={{ fontFamily: 'Unbounded, cursive', marginTop: '5px', marginRight: '5px' }} color="secondary" variant="contained" onClick={() => ApproveHouse()}>AUTH HOUSES</Button>
                    <Button style={{ fontFamily: 'Unbounded, cursive', marginTop: '5px', marginRight: '5px' }} color="secondary" variant="contained" onClick={() => ApproveMice()}>AUTH MICE </Button>
                    <Button style={{ fontFamily: 'Unbounded, cursive', marginTop: '5px', marginRight: '5px' }} color="secondary" variant="contained" onClick={() => ApproveQuacks()}>AUTH QUACKS</Button>
                  </Box>
                </Box>
              </div>
              <div className="card">
                <Box>
                  <Box sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 520,
                    flexGrow: 1,
                    color: 'white',
                    alignItems: 'center',
                    verticalAlign: 'center',
                    textAlign: 'center',
                  }}
                  >
                    <Button style={{ marginTop: 10, fontFamily: 'Unbounded, cursive', marginTop: '-1px', marginRight: '0px' }} color="primary" variant="contained" onClick={() => fetchStk()}>REFRESH ASSETS</Button>
                  </Box>
                </Box>
              </div>
              {stk && stk?.map((item) => {
                //Verify Metadata
                //console.log("index", index)
                const house = `https://ipfs.io/ipfs/QmXRf91daszc2jbDEq9NpFhM6BfTEvtkAHwzit4PKErE97/${item.tokenId}.webp`;
                const rewardnumb = item.reward;
                const malus = item.malus
                const mstaked = item.stakefm
                const qstaked = item.stakefq
                const houses = item.tokenId

                const sum = rewardnumb[0].toFixed(2)
                const malusrew = rewardnumb[1].toFixed(2)
                const rewmenomal = sum - malusrew

                //  const plaza = ethers.BigNumber.from(tokenId)
                //  const plazadel = Number(plaza)
                async function unstakeit() {
                  setLoading(true);
                  try {
                    const tx = await vaultcontract._unstake_wholeHouse(account, item.tokenId);
                    setSuccess(true);
                  } catch (e) {
                    console.error(e);
                    setError(true);
                  } finally {
                    setLoading(false);
                  }
                }

                async function claimit() {
                  setLoading(true);
                  try {
                    const tx = await vaultcontract._claim_wholeHouse(account, item.tokenId);
                    console.log(tx)
                    setSuccess(true);
                  } catch (e) {
                    console.error(e);
                    setError(true);
                  } finally {
                    setLoading(false);
                  }
                }


                return (

                  <Box sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 520,
                    flexGrow: 1,
                    color: 'white',
                    alignItems: 'center',
                    verticalAlign: 'center',
                  }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 520,
                        flexGrow: 1,
                        background: 'linear-gradient(208deg, rgba(7,1,19,1) 41%, rgba(54,46,57,1) 100%)',
                        color: 'white',
                        border: '3px solid white',
                        borderRadius: '10px'
                      }}
                    >

                      <Grid container spacing={2} key={item.tokenId}>
                        <Grid item>
                          <ButtonBase sx={{ width: 128, height: 128 }}>
                            <Img style={{ border: '1.5px solid white', borderRadius: '3px' }} alt="House" src={house} />
                          </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                          <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                              <Typography gutterBottom variant="subtitle1" component="div" style={{ fontFamily: 'Unbounded, cursive' }}>
                                Fury House #{houses}
                              </Typography>
                              <Typography variant="body2" color="green" gutterBottom style={{ fontFamily: 'Unbounded, cursive' }}>
                                <div>$Fury Earned: {sum} <font color="white"> </font></div>
                              </Typography>
                              <Typography variant="body2" color="green" gutterBottom style={{ fontFamily: 'Unbounded, cursive' }}>
                                <div>$Fury After Malus: {rewmenomal.toFixed(2)} <font color="white"> </font></div>
                              </Typography>
                              <Typography variant="body2" color="#C80000" gutterBottom style={{ fontFamily: 'Unbounded, cursive' }}>
                                Mice Staked: <font color="white">  {mstaked} </font>
                              </Typography>
                              <Typography variant="body2" color="#C80000" gutterBottom style={{ fontFamily: 'Unbounded, cursive' }}>
                                Quacks Staked: <font color="white"> {qstaked} </font>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  padding: 1
                                }}>
                                  <Button onClick={() => claimit()} style={{ fontFamily: 'Unbounded, cursive', marginTop: '-1px', marginLeft: "0px", fontSize: '12px' }} size="small" variant="outlined" color="success">Claim</Button>
                                  <Button onClick={() => unstakeit()} style={{ fontFamily: 'Unbounded, cursive', marginTop: '-1px', marginLeft: "4px", fontSize: '12px' }} size="small" variant="outlined" color="error">Unstake & Claim</Button>
                                </div>
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <div>
                              <img style={{
                                height: 60,
                                width: 60,
                                borderRadius: '50px',
                                boxShadow: 'red',

                              }} src='https://mint-furyhouse.netlify.app/static/media/logo.2cb3c003595b5f1575ef.webp'></img>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                      {mstaked >= 1 && (
                        <div style={{ borderRadius: '10px', marginTop: '10px', textAlign: 'center', alignItems: 'center', color: 'white', fontFamily: 'Unbounded, cursive', }}>
                          Malus: {malus}%
                          <Progress
                            percent={malus}
                            status="active"
                            showInfo={false}
                            strokeColor={{
                              from: 'aqua',
                              to: 'red',
                            }}
                            trailColor='black'
                          />
                        </div>
                      )}
                      <div style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '0px', alignItems: 'center', verticalAlign: 'center', }}>
                        <div style={{
                          textAlign: 'center',
                          verticalAling: 'center',
                          marginBottom: '5px',
                          color: 'white',
                          fontFamily: 'Unbounded, cursive',

                        }}>
                          Mice
                        </div>
                      </div>
                      {mstaked > 0 && (
                        <div style={{ backgroundImage: `url(${Comb})`, backgroundAttachment: 'cover', borderRadius: 30 }}>
                          <div className="card2">
                            <div style={{
                              alignItems: 'center',
                            }}>
                              <div style={{
                                textAlign: 'center',
                                alignItems: 'center',
                                verticalAling: 'center',
                                marginTop: '20px',
                                marginBottom: '0px',
                                color: 'white',
                                fontFamily: 'Unbounded, cursive',
                                textShadow: '0 0 5px red'
                              }}>
                                LOCKED DURING STAKING
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {mstaked === 0 && (
                        <div style={{ backgroundImage: `url(${Comb})`, backgroundAttachment: 'cover', borderRadius: 30 }}>
                          <div className="card4">
                            <div style={{
                              alignItems: 'center',
                            }}>
                              <div style={{
                                textAlign: 'center',
                                alignItems: 'center',
                                verticalAling: 'center',
                                marginTop: '5px',
                                marginBottom: '5px',
                                color: 'white',
                                fontFamily: 'Unbounded, cursive',

                              }}>
                                <ModalMouse houses={item.tokenId} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {qstaked > 0 && (
                        <div style={{ backgroundImage: `url(${furym})`, backgroundAttachment: 'cover', borderRadius: 30 }}>
                          <div className="card3">
                            <div style={{
                              alignItems: 'center',
                            }}>
                              <div style={{
                                textAlign: 'center',
                                alignItems: 'center',
                                verticalAling: 'center',
                                marginTop: '20px',
                                marginBottom: '0px',
                                color: 'white',
                                fontFamily: 'Unbounded, cursive',
                                textShadow: '0 0 5px red'
                              }}>
                                LOCKED DURING STAKING
                                <p></p>

                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {qstaked === 0 && (
                        <div style={{ backgroundImage: `url(${ACS})`, backgroundAttachment: 'cover', borderRadius: 30 }}>
                          <div className="card5">
                            <div style={{
                              alignItems: 'center',
                            }}>
                              <div style={{
                                textAlign: 'center',
                                alignItems: 'center',
                                verticalAling: 'center',
                                marginTop: '0px',
                                marginBottom: '5px',
                                color: 'white',
                                fontFamily: 'Unbounded, cursive',

                              }}>
                                {mstaked === 0 && (
                                  <div style={{
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    verticalAling: 'center',
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                    color: 'white',
                                    fontFamily: 'Unbounded, cursive',
                                    textShadow: '0 0 5px red'
                                  }}>
                                    Waiting for mice...
                                  </div>
                                )}
                                {mstaked >= 1 && (
                                  <ModalQuacks houses={houses} />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Paper>
                  </Box>
                )
              })
              }
            </Box>
            {HNFTs?.map((tokenId) => {
              //Verify Metadata
              //console.log("index", index)
              const image = `https://ipfs.io/ipfs/QmXRf91daszc2jbDEq9NpFhM6BfTEvtkAHwzit4PKErE97/${tokenId}.webp`
              const imageURI = `https://ipfs.io/ipfs/QmZtWJ1WmFDWFwMsZjLYFjNxM3x6JSqxVFAqgAvs6vgaXp/${tokenId}.json`; //Metadata
              const nftName = `Fury Quack Gang ${tokenId}`;
              const token = tokenId.toString()
              console.log(token)
              async function stake() {
                setLoading(true)
                try {
                  const tx = await vaultcontract.stake_furyHouses([token])
                  console.log(tx)
                  setSuccess(true);
                } catch (e) {
                  console.error(e);
                  const errorMessage = e.message.substring(0, e.message.indexOf('data')) + '... ' + e.message.substring(e.message.indexOf('code'));
                  getError(errorMessage);
                  setError(true);
                } finally {
                  setLoading(false);
                }
              }

              return (

                <Paper
                  sx={{
                    p: 2,
                    margin: 'auto',
                    marginTop: '10px',
                    marginBottom: '50px',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundImage: `url(${furym})`,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    border: '3px solid white',
                    color: 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Grid container spacing={2} key={tokenId}>
                    <Grid item>
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img style={{ border: '1.5px solid white', borderRadius: '3px' }} alt="House" src={image} />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography style={{ marginTop: '50px' }} gutterBottom variant="subtitle1" component="div">
                            Fury House {token}
                          </Typography>
                        </Grid>
                        <Grid item>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" gutterBottom>
                          <Button style={{ marginTop: '40px' }} size="large" onClick={() => stake()} variant="contained">Stake</Button>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              )
            })
            }
            <Box style={{ marginTop: '120px' }} />
          </Container >
        </div >
      )}
      {active === false && (
        <Alert style={{ fontFamily: 'Unbounded, cursive' }} message="You Are Not Connected" description="Please connect your wallet" type="error" showIcon closable onClose={onClose} />
      )}
    </div >
  );
}

export default NewStakeFury;
