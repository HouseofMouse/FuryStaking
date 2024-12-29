//0xb0A48BDCBb08A1817C8eDf51E940bd3e74572A14

/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { Paper, Box } from '@mui/material';
import EmptyCard from '../card/EmptyCard'
import useAuth from 'hooks/useAuth';
import axios, { Axios } from 'axios';
import { useWeb3React } from '@web3-react/core';
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React'
import { ethers } from 'ethers'
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { Card, Image, Tooltip, Input, Skeleton } from "antd";
import { CheckOutlined, ApiOutlined } from '@ant-design/icons';
import { Mice, Quacks, Houses, Staking, TFU } from "components/StakeFuryNew/Contracts";
import ABI from "components/StakeFuryNew/components/card/ABI/ABI";
import VAULTABI from "components/StakeFuryNew/components/card/ABI/VAULTABI";
import { Alert } from 'antd';
import ABIMOUSE from '../../ABIMOUSE.json'
import fmglogo from '../../../../image/FMG_emot.png'
const { Meta } = Card;

const nftcard = {
  cards: {
    marginTop: 2,
    marginBottom: 2,
    border: "10px solid black",
    borderRadius: "10px",
    fontFamily: "'Space Mono', monospace",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 7px #fff",
    width: 'auto',
  },
  card2: {
    border: "10px solid white",
    borderRadius: "20px",
    fontFamily: "'Space Mono', monospace",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 7px #fff"
  },
  cards3: {
    border: "10px solid white",
    borderRadius: "20px",
    fontFamily: "'Space Mono', monospace",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 7px #fff, 0 0 10px #ff4b1f, 0 0 15px #ff4b1f,  0 0 23px #ff9068"
  },
  name: {
    border: "10px solid white",
    borderRadius: "15px",
    font: "'Space Mono', monospace",
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

const ModalMouse = (props) => {

  const { account, active } = useWeb3React();
  const { library } = useActiveWeb3React();
  const [NFTs, setNFTs] = useState([]);
  const signer = library.getSigner()
  const simpleRpcProvider = new ethers.providers.JsonRpcProvider('https://rpc.vvs.finance/')
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [complited, setComplited] = useState(false);
  const [modalText, setModalText] = useState('Stake your Mouse!');
  const Web3Alc = createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/v2/vI9xj-bH51cHLlA_KxVtOye_AZownjSB");
  const [selectedItems, setSelectedItems] = useState([]);
  const vaultcontract = new ethers.Contract(Staking, VAULTABI, signer)
  const MiceContract = new ethers.Contract(Mice, ABIMOUSE, signer);
  const { houses } = props;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errDesc, getError] = useState("")

  console.log(houses)

  const onClose = () => {
    setSuccess(false);
    setError(false);
    setLoading(false)
  }

  const handleClick = (item) => {
    const itemId = parseInt(item);

    if (selectedItems.length >= 3 && !selectedItems.includes(itemId)) {
      alert("Max 3 items");
      return;
    }

    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((i) => i !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  /*
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} onClick={() => handleClick(item)}>
          <p>{item.name}</p>
          {selectedItems.includes(item) && <p>Selezionato</p>}
        </div>
      ))}
    </div>
  ); */

  async function fetchNFTsForContract() {
    const balance = await MiceContract.balanceOf(account);
    const ids = [];

    for (let i = 0; i < balance.toNumber(); i++) {
      const id = await MiceContract.tokenOfOwnerByIndex(account, i);
      ids.push(id);
    }

    console.log("Mice", balance.toString())
    setNFTs(ids.slice(0, 100));

    if (ids.length === 0) {
      alert("No mice found!")
    }
  }



  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    if (selectedItems.length >= 1) {
      stake();
      setOpen(false);
      setConfirmLoading(false);
      handleDeselectAll()
    }
    else {
      alert("You need to select at least one item");
    }
  };
  const handleCancel = () => {
    handleDeselectAll()
    console.log('Clicked cancel button');
    setOpen(false);
  };

  async function stake() {
    setLoading(true)
    try {
      const house = parseInt(houses);
      const stringArray = selectedItems;
      const numberArray = stringArray.map(str => parseInt(str));
      console.log(house, stringArray)
      const tx = await vaultcontract.stake_furyMice(house, numberArray, {
        from: account
      })
      console.error(tx)
      setSuccess(true);
    } catch (e) {
      console.error(e);
      const errorMessage = e.message.substring(0, e.message.indexOf('data')) + '... ';
      getError(errorMessage);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div onClick={showModal}><img style={{ height: 150, width: 135, boxShadow: "0 0 7px #fff, 0 0 10px #ff4b1f, 0 0 15px #ff4b1f,  0 0 23px #ff9068", border: '4px solid white', borderRadius: '50px' }} src='https://mint-furyhouse.netlify.app/static/media/logo.2cb3c003595b5f1575ef.webp'></img></div>
      {loading && (
        <div style={{ fontFamily: 'Unbounded, cursive', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>
          <Alert message="Loading..." type="info" showIcon closable onClose={onClose} />
        </div>
      )}
      {success && (
        <div style={{ fontFamily: 'Unbounded, cursive', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Alert message="Tx successful" description="Transaction has been successfully processed" type="success" showIcon closable onClose={onClose} />
        </div>
      )}
      {error && (
        <div style={{ fontFamily: 'Unbounded, cursive', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
          <Alert message="Tx failed" description={errDesc} type="error" showIcon closable onClose={onClose} />
        </div>
      )}
      <Modal
        title="Fury Mouse Vault"
        bodyStyle={{ backgroundColor: 'black' }}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
      >
        <div>
          <div style={{ alignItems: 'center', marginTop: 10, marginBottom: 10, display: "flex", textAlign: 'center', color: 'white' }}>
            Fetch your Mice —— <Button style={{ marginLeft: 3 }} onClick={() => fetchNFTsForContract()}>Fetch Mice</Button>
          </div>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 64,

              },
            }}
          >
            {NFTs.map((tokenId) => {
              const imageURI = `https://ipfs.io/ipfs/Qmd3NfuBRRgsTet88g97qc6eg1FQwdZfmH26VenXMX7nhi/${tokenId}.json`; //Metadata
              const nftName = `Fury Mouse Gang #${tokenId}`;
              const token = tokenId.toString();
              const image = `https://ipfs.io/ipfs/QmYKQHVhrzN87WAx5iQUvvnYCCFatMZKVFafomrYVEwxiC/${token}.webp`;

              return (
                <Card
                  hoverable
                  actions={[
                    <Tooltip title="Stake">
                      <CheckOutlined size="18px" onClick={() => handleClick(token)} />
                      {selectedItems.includes(parseInt(token)) && <p style={{ color: 'green' }} onClick={() => handleClick(token)}>Selected</p>}
                    </Tooltip>
                  ]}
                  style={nftcard.cards}
                  cover={
                    <Image
                      src={image}
                      style={{
                        height: "300px",
                        maxHeight: "400px",
                        borderRadius: "10px",
                        boxShadow:
                          "0 0 7px #fff, 0 0 10px #fff, 0 0 15px #0fa, 0 0 25px #0fa",
                      }}
                      preview={false}
                    />
                  }
                  key={tokenId}
                >
                  <Meta title={nftName} style={nftcard.card2} />
                </Card>
              );
            })}
          </Box>
        </div>
        <p style={{ alignItems: 'center', textAlign: 'center' }}>{modalText}</p>
        <div>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 64,
                height: 64,
              },
            }}
          >
          </Box>
        </div>
      </Modal>
    </>
  );
};
export default ModalMouse;