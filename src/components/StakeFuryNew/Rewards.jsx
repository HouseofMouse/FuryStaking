/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Mice, Quacks, Houses, Staking, TFU } from "components/StakeFury/Contracts";
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { Paper, Box } from '@mui/material';
import EmptyCard from '../card/EmptyCard'
import useAuth from 'hooks/useAuth';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React'
import { ethers } from 'ethers'
import Box from '@mui/material/Box';
import ModalMouse from './components/modal/ModalMouse';
import { styled } from '@mui/material/styles';
import ABI from './components/card/ABI/ABI.json';
import VAULTABI from './components/card/ABI/VAULTABI.json';


const Rewards = () => {
  const { active } = useWeb3React();
  const { library, account } = useActiveWeb3React();
  const signer = library.getSigner();
  const [stkd, getStk] = useState([]);
  const simpleRpcProvider = new ethers.providers.JsonRpcProvider('https://rpc.vvs.finance/');
  const vaultcontract = new ethers.Contract(Staking, VAULTABI, signer)
  const HouseContract = new ethers.Contract(Houses, ABI, signer);
  const QuacksContract = new ethers.Contract(Quacks, ABI, signer);
  const MiceContract = new ethers.Contract(Mice, ABI, signer);

}