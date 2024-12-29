/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {useEffect} from 'react'
import * as react from 'react';
import BadgeAvatars from './On';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useMoralisWeb3Api } from "react-moralis";
//import PROBalance from 'components/PROBalance';
import ERC20Balance from 'components/ERC20Balance';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'black',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  alignContent: 'center',
  alignItems: 'center',
}));


const Balance = async () => {
  const Web3Api = useMoralisWeb3Api();
  const fetchNativeBalance = async () => {
    // get mainnet native balance for the current user
    const balance = await Web3Api.account.getNativeBalance();
    console.log(balance);
    // get BSC native balance for a given address
    const options = {
      chain: "cro",
      address: "0x3d6c0e79a1239df0039ec16Cc80f7A343b6C530e",
      to_block: "1234",
    };
    const bscBalance = await Web3Api.account.getNativeBalance(options);
    console.log(bscBalance);
  };
};




const Id = () => {
    return (
      <Box style={{
        display: 'flex',
        alignItems: 'center',
        verticalALign: 'center'
        }}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Item>
            <div style ={{ fontSize: '30px', color:"white", textShadow: "0 0 7px aqua , 0 0 10px aqua"}} >ACCOUNT</div> 
            <div style={{height:'50px'}}></div>      
              <BadgeAvatars></BadgeAvatars>
            </Item>
          </Grid>
          <Grid item xs={12} md={12}>
            <Item>
              <ERC20Balance></ERC20Balance>
            </Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item></Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item></Item>
          </Grid>
        </Grid>
      </Box>
    );
}

export default Id;