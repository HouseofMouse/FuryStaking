/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { parse, useState, useEffect } from "react";
import {Box} from '@mui/material'
import { Button, Card, Image, Tooltip, Modal, Input, Skeleton, message } from "antd";
import {
  FileSearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import AddressInput from "./AddressInput";
import { useVerifyMetadata } from "hooks/useVerifyMetadata";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import ABIAlien from './Stake/ABI/ABIAlien.json';
import { NFTCONTRACT } from './Stake/config';
import { ethers } from 'ethers';

const { Meta } = Card;

const nftcard = {
  cards: {
    border: "10px solid white", 
    borderRadius: "20px",
    fontFamily:"'Space Mono', monospace",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  name: {
    border: "10px solid white", 
    borderRadius: "15px",
    font:"'Space Mono', monospace",
    alignItems: "center",
    fontSize: "15px",
  },
  sfondo: {
     textAling: 'center',
     background: "black", 
     color: "white", 
     padding: "15px", 
     maxWidth: "1200px", 
     width: "100%", 
     alignItems: 'center',
     xl: 'auto',
     xs: 'auto',
  },
  testo: {
     fontFamily: "'Space Mono', monospace",
     font: "60px 'Space Mono', monospace",
     textAlign: "center",
     marginTop: -80,
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
};

const NFTBalance = () => {
  const [visible, setVisibility] = useState(false);
  const [receiverToSend, setReceiver] = useState(null);
  const [amountToSend, setAmount] = useState(null);
  const [nftToSend, setNftToSend] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [initData, setInitData] = useState([]);
  const [NFTs, setNFTs] = useState([]);
  const { verifyMetadata } = useVerifyMetadata();
  const [disabled, setDisabled] = useState(true);
  const { account, active } = useWeb3React() 
  const { library } = useActiveWeb3React();

  const signer = library.getSigner()
     

  const fetchNFTsForContract = async () => {
    
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
        console.log("Response datat staking", response.data, response, response.result);
        var datastak = response.data
        setNFTs(datastak.result);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  async function transfer(nft, amount, receiver) {
    console.log("Transfer", nft, amount, receiver);
    const contract = new ethers.Contract(NFTCONTRACT, ABIAlien, signer);
    const tokenId = nft?.token_id
    const to = receiver
    const from = account
    const options = {
      from: {account},
      to: receiver,
      tokenId: nft?.token_id,
    }; 

    setIsPending(true);

    async function safetransf() {
      await contract['safeTransferFrom(address,address,uint256)'](account, receiver, nft?.token_id)
    }

    try {
      var tx = safetransf()
      console.log(tx);
      setIsPending(false);
    } catch (e) {
      alert(e.message);
      console.log("E", e);
      setIsPending(false);
    }
  }

  const handleTransferClick = (nft) => {
    setNftToSend(nft);
    setVisibility(true);
  }; 

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
  
    if(account) return
    fetchNFTsForContract()
  }, [account])

  useEffect(() => {
  
    if(!account) return
    fetchNFTsForContract(); 
  }, [account])

  useEffect(() => {
  if(NFTs) return
  fetchNFTsForContract()
}, [NFTs])

  const defaultImg =
    "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=";
    return (
      <div style={nftcard.sfondo}>
        <div style={nftcard.testo}>
        <div> <font color="white"> ALIENS </font></div>
        </div>
        <div>
          <div
            style={{
            marginTop: 20,
           }}
          >
           <div style={nftcard.testo2}>
           <div style={{alignItems: 'center', textAlign: "center"}}><font color="white"><font color="red">{NFTs.length}</font>
            </font>
           </div> 
         </div >
         </div>
         </div> 
         <br></br>
         <br></br>
        <div style={styles.NFTz}>
          <Skeleton active loading={NFTs && NFTs.events}>
             {NFTs && NFTs?.map((item, index, nft) => {
                //Verify Metadata
                const meta = JSON.parse(item.metadata);
                const LOL = meta.image.substring(7, 80);
                const pref = 'https://ipfs.io/ipfs/';
                const alien = pref + LOL;
                nft = verifyMetadata(item);
                console.table(NFTs);
                console.table("item",item);
                console.table("meta",meta);
                console.table("meta",alien)

                return (
                  <Card 
                  hoverable
                  actions={[
                    <Tooltip title="View On Blockexplorer">
                      <FileSearchOutlined
                        onClick={() =>
                          window.open(
                            `https://cronos.crypto.org/explorer/address/${
                              item.token_address
                            }`,
                            "_blank",
                          )
                        }
                      />
                    </Tooltip>,
                    <Tooltip title="Transfer NFT">
                      <SendOutlined onClick={() => handleTransferClick(nft)} />
                    </Tooltip>,
                  ]}
                    style={nftcard.cards}
                    cover={
                      <Image
                        src={alien}
                        alt=""
                        style={{ height: "300px", maxHeight: "400px" }}
                        preview={false}
                      />
                    }
                    key={index}
                  >
                    <Meta 
                    title={meta.name} 
                    style={nftcard.cards}
                  />
                  </Card>
                );
              })}
          </Skeleton>
        </div>
        <Modal
        title={`Transfer ${nftToSend?.name || "NFT"}`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => transfer(nftToSend, amountToSend, receiverToSend)}
        confirmLoading={isPending}
        okText="Send"
      >
        <AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} />
        {nftToSend && nftToSend.contract_type === "erc1155" && (
          <Input
            placeholder="amount to send"
            onChange={(e) => handleChange(e)}
          />
        )}
      </Modal>
      <Box style={{
        height:50
      }}/>
      </div>
    );
  }
export default NFTBalance;