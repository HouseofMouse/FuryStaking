/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { Box, Container, Button} from '@mui/material';
import axios from 'axios';
import { Skeleton, Table, Tag } from "antd";
import Stack from '@mui/material/Stack';
import { getEllipsisTxt } from "../../helpers/formatters";
import { setMaxListeners } from 'process';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'black',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  alignContent: 'center',
  alignItems: 'center',
}));

const style = {
  mission:{
    textAlign: 'center',
    border: "0px solid white", 
    borderRadius: "10px",

    background: "black",
    marginTop: 25,
    height: '50px',
    fontSize: '15px',
    alignitems: 'center',
    verticalAlign: 'center',
  },
  mission1:{
    textAlign: 'center',
    marginTop: 25,
    height: '50px',
    fontSize: '15px',
    alignitems: 'center',
    verticalAlign: 'center',
  },
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
    t: {
        font: "15px, 'Space Mono', monospace'",
        fontFamily: "'Space Mono', monospace",
        alignItems: 'center'
    },
    box1: {
      background: '#0c0012',
      textAlign: 'center',
      borderTop: "2px solid white", 
      borderRadius: "10px",
      color: 'white',
      height: '50px',
      verticalAlign: 'center',
      alignItems: 'center'
    },
    box2: {
      background: '#0c0012',
      textAlign: 'center',
      borderTop: "2px solid white", 
      borderRadius: "10px",

      color: 'green',
      height: '50px',
      verticalAlign: 'center',
      alignItems: 'center'


    },
    box3: {
      background: '#0c0012',
      textAlign: 'center',
      borderTop: "2px solid white", 
      borderRadius: "10px",

      color: 'white',
      height: '50px',
      verticalAlign: 'center',
      alignItems: 'center'


    },
    box4: {
      textAlign: 'center',
      color: 'white'

    },

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
    }
}

const Book = () => {

const [items, setItems] = useState([]);
const [list, setList] = useState([]);
const [date, setData] = useState([]);


useEffect(() => {
  Fetch(), Collect()
}, [])

async function Fetch(){
await axios.get("https://api.ebisusbay.com/listings?collection=0x39128237ea72040B96D3ea516619A226126ec838")
.then((res) => {
  setList(res.data.listings)
  setItems(res.data);
})
.catch((err) => {
    return(console.log("Cannot fetch", err));
})
}

async function Collect(){
  await axios.get("  https://api.ebisusbay.com/collections?collection=0x39128237ea72040B96D3ea516619A226126ec838")
  .then(({data}) => {
    setData(data.collections);
    console.log(data.collections)
  })
  .catch((err) => {
      return(console.log("Cannot fetch", err));
  })
  }

const columns = [
  {
      title: '',
      dataIndex: "nft",
      key: "nft",
      render: (nft) => <img src={nft.image} width={50} alt={'noimage'}></img>,
      width: '100px'
  },
  {
    title: 'Id',
    dataIndex: "nftId",
    key: "nftId",
    render: (nftId) => 'Alien# ' + nftId,
    width: '100px'
},
  {
      title: 'Seller',
      dataIndex: "seller",
      key: "seller",
      render: (seller) => getEllipsisTxt(seller),
      width: '200px'
  },
{
  title: 'Rank',
  dataIndex: "nft",
  key: "nft",
  width: '200px',
  render: (nft) => 
  {
    if (Number(nft.rank) > 1000 )
    return(
    
      <Tag color={'red'} key={nft.rank}>{nft.rank}</Tag>
    )
    else
    return (
      <Tag color={'green'} key={nft.rank}>{nft.rank}</Tag>
    )
  }
},
{
  title: 'Price',
  dataIndex: "price",
  key: "price",
  render: (price) => price + ' CRO',
  width: '200px'
},
];

console.table('Ebissu', items)
console.table('Ebissu', list)
console.table('Data', date)
console.table('DataFloor', date.floorPrice)


    return (
      <>
      <div style={{
        }}>
        <Box style={{
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'center'
        }}>
        <Grid container spacing={1} style={{mt: -100}}>
        <Grid item xs={12} style={{mt: -100}}>
        <Box style ={{ textAlign: 'center', verticalAlign: 'center', display: 'block', marginLeft: 'auto', marginRight: 'auto', textShadow: "0 0 7px aqua, 0 0 10px aqua, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA", fontSize: "40px"}}><font color="white">ALIENFT </font></Box>
        <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', height: 200, width: 200, border:'5px solid green', borderRadius:'70px'}} src="https://miro.medium.com/max/1400/1*k9Tzf1HK07p4A8ce7zV_zA.png"></img>
          <div style={style.mission}> 
            <Box style ={{ color:"red", textShadow: "0 0 7px red, 0 0 10px red, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA"}}>»» <font size="20px" color="white">STATS </font>««</Box>
            </div>
          </Grid>
          <Grid item xs ={12} style={{alignItems: 'center'}}>
          <Box style={styles.box4}>
              <Skeleton active loading={!date && date}>
              {date &&
                  date?.map((i) => {
                    //Verify Metadata
                    console.log(i.floorPrice)
                    if (Number(i.sales1d) < 100)
                    return (
                      <div style={{fontSize:'20px'}}>FLOOR PRICE: <font color="red" style={{textShadow: " 0 0 0.3px black   "}}>{(i.floorPrice)} CRO</font></div>
                    )
                    return (
                      <div style={{fontSize:'20px'}}>FLOOR PRICE: <font color="green" style={{textShadow: " 0 0 0.3px black   "}}>{(i.floorPrice)} CRO</font></div>
                    );
                  })}
              </Skeleton></Box>
          </Grid>
          <Grid item xs={6}>
            <Item>
            <Box style={styles.box1}>
              <Skeleton active loading={!date && date}>
              {date &&
                  date?.map((i) => {
                    //Verify Metadata
                    console.log('floor', i.floorPrice)
                    var average = i.averageSalePrice
                    var averagesale = Number(average).toFixed(2)
                    if (Number(averagesale) < (i.floorPrice))
                    return (
                      <div>Average Sale:<p></p><font color="red" style={{textShadow: "   0 0 0.3px black   "}} >{(averagesale)}</font> CRO </div>
                    )
                    return (
                      <div>Average Sale:<p></p> <font color="green" style={{textShadow: "   0 0 0.3px black   "}}>{(averagesale)}</font> CRO </div>
                    );
                  })}
              </Skeleton></Box>
            </Item>
          </Grid>
        <Grid item xs={6}>
            <Item>
            <Box style={styles.box1}>
              <Skeleton active loading={!date && date}>
              {date &&
                  date?.map((i) => {
                    //Verify Metadata
                    console.log(i.floorPrice)
                    return (
                      <div>TOT Volume: <p></p> <font color="green" style={{textShadow: "          0 0 0.3px black    "}}>{(i.totalVolume)}</font> CRO </div>
                    );
                  })}
              </Skeleton></Box>
            </Item>
          </Grid>
          <Grid item xs={12}>
          <div style={style.mission}> 
            <Box style ={{ color:"red", textShadow: "0 0 7px red, 0 0 10px red, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA"}}>»» <font size="20px" color="white">VOLUME </font>««</Box>
            </div>
          </Grid>
        <Grid item xs={4}>
            <Item>
            <Box style={styles.box1}>
              <Skeleton active loading={!date && date}>
              {date &&
                  date?.map((i) => {
                    //Verify Metadata
                    console.log(i.floorPrice)
                    if (Number(i.volume1d) < 1)
                    return (
                      <div>Volume 1d:<p></p> <font color="red" style={{textShadow: "          0 0 0.3px black    "}}>{(i.volume1d)}</font> CRO </div>
                    )
                    return (
                      <div>Volume 1d:<p></p> <font color="green" style={{textShadow: "          0 0 0.3px black    "}}>{(i.volume1d)}</font> CRO </div>
                    );
                  })}
              </Skeleton></Box>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Box style={styles.box1}><Skeleton active loading={!date && date}>
              {date &&
                  date?.map((i) => {
                    //Verify Metadata
                    console.log(i.floorPrice)
                    if (Number(i.volume7d) < (i.volume1d))
                    return (
                      <div>Volume 7d:<p></p> <font color="red" style={{textShadow: "          0 0 0.3px black     "}}>{(i.volume7d)}</font> CRO </div>
                    )
                    return (
                      <div>Volume 7d:<p></p>  <font color="green" style={{textShadow: "          0 0 0.3px black     "}}>{(i.volume7d)}</font> CRO </div>
                    );
                  })}
              </Skeleton></Box>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
            <Box style={styles.box3}> 
            <Skeleton active loading={!date && date}>
              {date &&
                  date?.map((i) => {
                    //Verify Metadata
                    console.log(i.floorPrice)
                    if (Number(i.volume30d) < (i.volume7d))
                    return (
                      <div>Volume 30d:<p></p> <font color="red" style={{textShadow: "          0 0 0.3px black    "}}>{(i.volume30d)}</font> CRO </div>
                    )
                    return (
                      <div>Volume 30d:<p></p>   <font color="green" style={{textShadow: "          0 0 0.3px black     "}}>{(i.volume30d)}</font> CRO </div>
                    );
                  })}
              </Skeleton>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12}>
          <div style={style.mission}> 
            <Box style ={{ color:"red", textShadow: "0 0 7px red, 0 0 10px red, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA"}}>»» <font size="20px" color="white">SALES </font>««</Box>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Item>
            <Box style={styles.box1}>
              <Skeleton active loading={!date && date}>
              {date &&
                  date?.map((i) => {
                    //Verify Metadata
                    console.log(i.floorPrice)
                    if (Number(i.sales1d) < 1)
                    return (
                      <div>Sales 1d:<p></p> <font color="red" style={{textShadow: "          0 0 0.3px black    "}}>{(i.sales1d)}</font></div>
                    )
                    return (
                      <div>Sales 1d:<p></p> <font color="green" style={{textShadow: "          0 0 0.3px black     "}}>{(i.sales1d)}</font></div>
                    );
                  })}
              </Skeleton></Box>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Box style={styles.box1}><Skeleton active loading={!date && date}>
              {date &&
                  date?.map((i) => {
                    //Verify Metadata
                    console.log(i.floorPrice)
                    if (Number(i.sales7d) < 7)
                    return (
                      <div>Sales 7d:<p></p> <font color="red" style={{textShadow: "          0 0 0.3px black   "}}>{(i.sales7d)}</font></div>
                    )
                    return (
                      <div>Sales 7d:<p></p>  <font color="green" style={{textShadow: "          0 0 0.3px black   "}}>{(i.sales7d)}</font></div>
                    );
                  })}
              </Skeleton></Box>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
            <Box style={styles.box3}> 
            <Skeleton active loading={!date && date}>
              {date &&
                  date?.map((i) => {
                    //Verify Metadata
                    console.log(i.floorPrice)
                    if (Number(i.sales30d) < (i.sales1d))
                    return (
                      <div>Sales 30d:<p></p> <font color="red" style={{textShadow: "          0 0 0.3px black   "}}>{(i.sales30d)}</font></div>
                    )
                    return (
                      <div>Sales 30d:<p></p>   <font color="green" style={{textShadow: "          0 0 0.3px black     "}}>{(i.sales30d)}</font></div>
                    );
                  })}
              </Skeleton>
              </Box>
            </Item>
          </Grid>
        </Grid>
        </Box>
        <div style={{height: 50}}></div>
          <div style={{background: 'white', alignItems: 'center'}}>
          <div style={style.mission1}> 
            <Box style ={{ color:"green", textShadow: "0 0 7px green, 0 0 10px aqua, 0 0 21px #E6E6FA, 0 0 42px #E6E6FA", fontSize: "40px"}}> <font color="white">LISTINGS ALIENS </font></Box>
          </div>
          <Skeleton loading={!items}>
              <Table
              columns={columns}
              dataSource={list}
              pagination={items.totalPages}
              rowKey={(record) => {
                record.price
              }}
              style={{
                fixed: 'auto',
                weidth: '600px',
                borderRadius: '5px',
                border: '2px solid white'
              }}
            />
          </Skeleton>
          </div>
          <div style={{height: 50}}></div>
          </div>
      </>
    );
};

export default Book;