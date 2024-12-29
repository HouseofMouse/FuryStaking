/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import "../../StakeStyle.css"
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ModalMouse from '../modal/ModalMouse';
//import ModalQuacks from '../modal/ModalQuacks';
import FQG from '../../../../image/FQG.jpg';
import Comb from '../../../../image/Comb.jpeg';
import furym from '../../../../image/furym.png';
import LinearProgress from '@mui/material/LinearProgress';
import PlusMus from '../../../../image/PlusMus.png';
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";
import axios from 'axios';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { Mice, Quacks, Houses, Staking, TFU } from "components/StakeFury/Contracts";
import ABI from "./ABI/ABI";
import VAULTABI from "./ABI/VAULTABI";
import FetchStake from './Hook';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const { Meta } = Card;

const HouseCard = () => {
  const { active, account } = useWeb3React();
  const [HSNFTs, setHSNFTs] = useState();
  const { library } = useActiveWeb3React();
  const signer = library.getSigner()

  const simpleRpcProvider = new ethers.providers.JsonRpcProvider('https://rpc.vvs.finance/');
  const Web3Alc = createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/v2/vI9xj-bH51cHLlA_KxVtOye_AZownjSB");
  const vaultcontract = new ethers.Contract(Staking, VAULTABI, signer)
  const HouseContract = new ethers.Contract(Houses, ABI, signer);
  const QuacksContract = new ethers.Contract(Quacks, ABI, signer);
  const MiceContract = new ethers.Contract(Mice, ABI, signer);

  async function FetchStake() {
    //questo è la logica del fetch del contratto Cronosnauts (Non in staking)
    const options = {
      method: "GET",
      url: "https://deep-index.moralis.io/api/v2/" + account + "/nft",
      params: {
        chain: "cronos",
        format: "decimal",
        token_addresses: "0x79FCf35a146E2E61b04685988658883982Ca08Ba",
        normalizeMetadata: "false",
      },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "JC5dsf3ZKeAr5aszxVkpfnTkshpu0sU9BWzda4U3SdeyOJ6plyLyhcNVIzQjq8uy",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("response", response.data);
        const datawrap = response.data;
        setHSNFTs(datawrap.result);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async function FetchHouseCard() {
    const { HSNFTs } = FetchStake()

    console.log(HSNFTs)

    if (typeof account === 'undefined') {
      return (<Box></Box>)
    } else {

      return (
        <Box>
          <Skeleton active loading={HSNFTs && HSNFTs.result}>
            {HSNFTs?.map((item) => {
              //Verify Metadata
              //console.log("index", index)
              const meta = JSON.parse(item.metadata);
              const LOL = meta.image.substring(7, 80);
              const pref = "https://ipfs.io/ipfs/";
              const alien = pref + LOL;
              console.log("alien", alien)
              const arraynft = Array.from(HSNFTs?.map(Number));
              const Name = meta.name;
              const tokenid = arraynft.filter(Number);

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

                    <Grid container spacing={2} key={item}>
                      <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                          <Img style={{ border: '1.5px solid white', borderRadius: '3px' }} alt="House" src={alien} />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div" style={{ fontFamily: 'Unbounded, cursive' }}>
                              {Name}
                            </Typography>
                            <Typography variant="body2" color="green" gutterBottom style={{ fontFamily: 'Unbounded, cursive' }}>
                              $FURY Earned: <font color="white"> 0 </font>
                            </Typography>
                            <Typography variant="body2" color="#C80000" gutterBottom style={{ fontFamily: 'Unbounded, cursive' }}>
                              Mice Staked: <font color="white"> 0 </font>
                            </Typography>
                            <Typography variant="body2" color="#C80000" gutterBottom style={{ fontFamily: 'Unbounded, cursive' }}>
                              Quacks Staked: <font color="white"> 0 </font>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography sx={{ cursor: 'pointer' }} variant="body2">
                              <div style={{ display: 'row' }}>
                                <Button style={{ fontFamily: 'Unbounded, cursive', marginTop: '-1px', marginRight: '9px' }} size="small" variant="contained" color="secondary">Claim</Button>

                                <Button style={{ fontFamily: 'Unbounded, cursive', marginTop: '-1px', marginLeft: "1px" }} size="small" variant="outlined" color="error">Unstake All</Button>
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
                    <Box
                      sx={{
                        backgroundImage: `url(${furym})`,
                        border: '2px solid white',
                        borderRadius: '10px',
                        alignItems: 'center',
                        height: 200,
                        verticalAlign: 'center',
                        marginTop: '5px',
                        marginBottom: '5px'
                      }}
                    >
                      <div style={{
                        alignItems: 'center',
                      }}>
                        <div style={{
                          textAlign: 'center',
                          alignItems: 'center',
                          verticalAling: 'center',
                          marginTop: '25px',
                          marginBottom: '5px',
                          color: 'white',
                          fontFamily: 'Unbounded, cursive',

                        }}>
                          <ModalMouse />
                        </div>
                      </div>
                    </Box>
                    <Box style={{
                      border: '2px solid white',
                      borderRadius: '10px',
                      backgroundImage: `url(${Comb})`,
                    }}>
                      <div style={{
                        alignItems: 'center',
                      }}>
                        <div style={{
                          textAlign: 'center',
                          alignItems: 'center',
                          verticalAling: 'center',
                          marginTop: '5px',
                          marginBottom: '15px',
                          color: 'white',
                          fontFamily: 'Unbounded, cursive',

                        }}>
                          Quacks Booster
                          <p></p>
                          <img style={{ height: 150, width: 135, boxShadow: "0 0 7px #fff, 0 0 10px #ff4b1f, 0 0 15px #ff4b1f,  0 0 23px #ff9068", border: '4px solid white', borderRadius: '50px' }} src={FQG}></img>
                        </div>
                      </div>
                    </Box>
                  </Paper>
                </Box>
              )
            })
            }
          </Skeleton>
        </Box>
      );
    }
  }

  return (FetchHouseCard())
}

export default HouseCard; 