/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { Paper, Box } from '@mui/material';
import EmptyCard from '../card/EmptyCard'
import axios from 'axios';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';

const ModalStake = () => {
const [HNFTs, setNFTs] = useState();
const { active } = useWeb3React();
const { library, account } = useActiveWeb3React();
const signer = library.getSigner()
const simpleRpcProvider = new ethers.providers.JsonRpcProvider('https://rpc.vvs.finance/')
const Web3Alc = createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/v2/vI9xj-bH51cHLlA_KxVtOye_AZownjSB");



  const fetchNFTsForContract = async () => {
    const accurl = JSON.stringify(account)
    //questo è la logica del fetch del contratto Cronosnauts (Non in staking)
    const options = {
      method: 'GET',
      url: 'https://deep-index.moralis.io/api/v2/' + account + '/nft',
      params: {
        chain: 'cronos',
        format: 'decimal',
        token_addresses: '0x79FCf35a146E2E61b04685988658883982Ca08Ba',
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
    }
    useEffect(() => {
        fetchNFTsForContract()
      }, [account])

};
export default ModalStake;