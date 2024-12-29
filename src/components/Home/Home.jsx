/* eslint-disable prettier/prettier */

import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import alien from './Assets/Green_alien_for_banner.png';
import alien2 from './Assets/black_alien_heart_eyes.png';
import "./styles.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'black',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'white',
}));

const style = {
  titlefinal:{
    color: "green",
    fontFamily: "'Space Mono', monospace",
    font: "100px 'Space Mono', monospace;",
    fontSize: "60px",
    textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa,  0 0 92px #0fa,  0 0 102px",
    textAlign: 'center',
  },
  title:{
    color: "white",
    fontFamily: "'Space Mono', monospace",
    font: "100px 'Space Mono', monospace;",
    fontSize: "60px",
    textAlign: 'center',

  },
  titlefinal2:{
    color: "aqua",
    fontFamily: "'Space Mono', monospace",
    font: "100px 'Space Mono', monospace;",
    fontSize: "30px",
    textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa,  0 0 92px #0fa,  0 0 102px",
    textAlign: 'center',

  },
  title2:{
    color: "white",
    fontFamily: "'Space Mono', monospace",
    font: "100px 'Space Mono', monospace;",
    fontSize: "30px",
    textAlign: 'center',

  },
  body1: {

    color: "white",
    fontFamily: "'Space Mono', monospace",
    font: "16px 'Space Mono', monospace;",
    fontSize: "16px",
    textAlign: 'center',
  },
  bodyred: {

    color: "red",
    fontFamily: "'Space Mono', monospace",
    font: "16px 'Space Mono', monospace;",
    fontSize: "16px",


  },
  bodyred23: {

    color: "red",
    fontFamily: "'Space Mono', monospace",
    font: "12px 'Space Mono', monospace;",
    fontSize: "12px",


  }
}

const Home = () => {
    return (
      <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Box>
                <div>
                  <div style={{ textAlign: 'center',alignItems: 'center' , height: "auto" }}>
                  <div style={style.title}>
                    ALIE<font style={style.titlefinal}>NFT</font>
                  </div>
                  </div>
                  <div style={{margin: 20, textAlign: 'center',alignItems: 'center' , height: "auto" }}>
                    <div style={{ height: 40 }}></div>
                    <div style={style.body1}>
                      We have a high focus on community and collaborations
                      within the Cronos Ecosystem, looking to make new
                      partnerships with any and all projects within our chain!
                    </div>
                    <div style={style.body1}>
                      We aim to provide value to our holders by focusing on
                      utilities<p></p> such as NFT staking that will be done on
                      our own platform (60% of gen 2 minted)
                    </div>
                    <div style={style.body1}>
                      Our goal is to build a community with like minded
                      individuals <p></p> who want to stream forms of passive
                      income, while also having established high quality art for
                      PFPs.
                      <p></p>Holding just one Gen 1 alien will give holders
                      exclusive access<p></p> to the ALIENDAO, along with
                      holding 5 or more ALIENFTs <p></p>will have holders listed
                      for airdrops and posters of holders ALIENFT after mint!
                      (More to come)
                    </div>
                  </div>
                </div>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <div>
                <img src={alien} height={'150px'} width={'150px'}></img>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
            <div style={{ textAlign: 'center',alignItems: 'center' , height: "auto" }}>
                <div style={style.title2}>
                  TOKEN<font style={style.titlefinal2}>OMICS</font>
                </div>
                <div>
                  <div style={{ height: 40 }}></div>
                  <div style={style.body1}>
                    We plan to launch a utility token with our 2nd gen of
                    ALIENFT called $PROBE, Probe will be used for raffles and
                    future mint events within our ecosystem, lottery style games
                    and much more! Using our community treasury we will be
                    expanding on ways to grow our funds passively for the
                    community, and these choices will be decided upon in the
                  </div>
                  <div style={style.body1}>
                    ALIENDAO{" "}
                    <div style={style.bodyred23}>
                      0x9aBcCba317D15902F4f64fA54189C4aeF9998067
                    </div>
                    </div>
                  </div>
                </div>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
            <div style={{ textAlign: 'center',alignItems: 'center' , height: "auto" }}>
                <div style={style.title2}>
                  INFO &<font style={style.titlefinal2}> FAQ</font>
                </div>
                <div>
                  <div style={{ height: 40 }}></div>
                  <div style={style.bodyred}>
                    How many ALIENFTS will be minted?
                  </div>
                  <div style={style.body1}>
                    2500 ALIENFT in gen 1 and 432 in our lovely lifeforms
                    collection.
                    <div style={style.bodyred}>
                      Where can I mint my own aliens?
                    </div>
                    <div style={style.body1}>
                      <Button
                        href="https://app.ebisusbay.com/collection/alie-nft"
                        variant="outlined"
                        color="success"
                      >
                        Ebisus Bay
                      </Button>
                    </div>
                    <div style={style.bodyred}>
                      Does ALIENFT have any partners?
                    </div>
                    <div style={style.body1}>
                      Partnership with Crypto.com, Ebisus Bay, Minted, and many
                      NFT projects on Cronos.
                    </div>
                  </div>
                  <div>
                    <div style={{ height: 40 }}></div>
                    <div style={{ textAlign: 'center',alignItems: 'center' , height: "auto" }}>
                    <div style={style.title2}>
                      CONTR<font style={style.titlefinal2}>ACTS</font>
                    </div>
                    </div>
                    <div style={{ textAlign: 'center',alignItems: 'center' , height: "auto" }}>
                    <div style={{ height: 40 }}></div>
                    <div style={style.body1}>$PROB</div>
                    <div style={style.bodyred23}>
                      0x2bd7dbdbcf57c9b907c381e2f112d9682caad311
                    </div>
                    <div style={style.body1}>STAKING</div>
                    <div style={style.bodyred23}>
                      0x83e948b4b2af4b634427ce9b988164b14ef9a282
                    </div>
                    <div style={style.body1}>ALIENFT</div>
                    <div style={style.bodyred23}>
                      0x39128237ea72040B96D3ea516619A226126ec838
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <div>
                <img src={alien2} height={'150px'} width={'150px'}></img>
              </div>
            </Item>
          </Grid>
        </Grid>
        <Box
          style={{
            height: 100,
          }}
        ></Box>
      </Box>
      </Container>
    );
}

export default Home;