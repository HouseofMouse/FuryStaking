/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from "react";
import { useWeb3React } from '@web3-react/core'
import { Container, Box } from '@mui/material';
import Hero from './Start/Hero';
import HeroConnect from './Start/HeroConnect';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
//import Box from '@mui/material/Box';
import ETHCODE from '../image/ETHER.jpg'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "black",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const contentStyle = {
  height: "160px",
  color: "#FFF",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  button: {
    display: 'flex',
    verticalAligment: 'center',
  }
};

export default function QuickStart() {
  const { account } = useWeb3React();


  return (
    <Grid style={{ marginTop: -100, }} container spacing={2}>
      <Grid item xs={12}>
        <Item><Hero></Hero></Item>
      </Grid>
      <Grid style={{ alignItems: 'center' }} item xs={12}>
        <Item><HeroConnect></HeroConnect></Item>
      </Grid>
      <Grid style={{ alignItems: 'center', marginTop: -25 }} item xs={12}>
        <Item style={{color: 'white'}}><img src={ETHCODE} alt="ETHERCODE" height={70} width={70} style={{borderRadius: 10, marginLeft: -20, marginTop: -5}} />Provided by ETHERCODE</Item>
      </Grid>
      <Box style={{
        height: 110
      }}>

      </Box>
    </Grid>
  );
};