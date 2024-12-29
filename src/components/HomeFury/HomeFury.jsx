/* eslint-disable prettier/prettier */
import React from "react";
import { Col, Row, Card, Button } from 'antd';
import Banner from '../../image/mousenft_feu.png'
import Staking from '../../image/mousenft_nuit.png'
import Website from '../../image/mousenft_saut.png'
import Quacks from '../../image/Duck_incubator.png'
import Git from '../../image/Duck_gang.png'
import { Link } from "react-router-dom";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import HomeConnect from "components/Start/HomeConnect";

export const HomeFury = () => {
    const {account} = useActiveWeb3React()
    return (
        <div style={{ maxWidth: "100%" }}>
            <Row>
                <Col span={24}>
                    <div style={{ marginTop: '-70px', position: "relative" }}>
                        <img style={{ borderRadius: 5, width: '100%', height: 'auto', objectFit: 'cover' }} src={Banner} alt="banner" />
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                                color: "white",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                textShadow: "10px 10px 20px black",
                                fontFamily: 'Unbounded, cursive',
                            }}
                        >
                            FURY MOUSE GANG
                            <HomeConnect/>
                        </div>
                    </div>
                </Col>
            </Row>
            <div style={{ height: 25 }}></div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card bodyStyle={{ color: 'white' }} style={{ border: '2px solid white', background: 'white', fontFamily: 'Unbounded, cursive', color: 'black', textAlign: 'center', borderRadius: '40px' }} cover={<img alt="Staking" src={Staking} style={{ borderRadius: '40px' }} />}
                        title="$FURY Staking" bordered={false}>
                        <div style={{ color: 'black', marginBottom: 30 }}>Put your mice in their houses and start earning $FURY token</div>
                        {account && (
                            <Link to="/mousestake">
                                <Button type="primary">Feel the $FURY</Button>
                            </Link>
                        )}
                        {!account && (
                            <Button type="primary">Not Connected</Button>
                        )}
                    </Card>

                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card bodyStyle={{ color: 'white' }} style={{ border: '2px solid white', background: 'white', fontFamily: 'Unbounded, cursive', color: 'black', textAlign: 'center', borderRadius: '40px' }} cover={<img alt="web" src={Website} style={{ borderRadius: '40px' }} />}
                        title="FMG Homepage" bordered={false}>
                        <div style={{ color: 'black', marginBottom: 30 }}>To the FMG main homepage and royalties staking</div>
                        <div style={{ backgroundImage: `url(${Website})`, backgroundSize: 'cover', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '0px' }}>
                            <Button href="https://royalties.furymousegang.com/" type="primary">LFG FMG</Button>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card bodyStyle={{ color: 'white' }} style={{ border: '2px solid white', background: 'white', fontFamily: 'Unbounded, cursive', color: 'black', textAlign: 'center', borderRadius: '40px' }} cover={<img alt="git" src={Git} style={{ borderRadius: '40px' }} />}
                        title="Gitbook & Medium" bordered={false}>
                        <div style={{ marginBottom: 25, marginTop: 20 }}>
                            <Button href="https://fury-mouse-gang.gitbook.io/" type="primary">Go to Gitbook</Button>
                        </div>
                        <Button href="https://medium.com/@furymousegang" type="primary">Go to Medium</Button>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card bodyStyle={{ color: 'white' }} style={{ border: '2px solid white', background: 'white', fontFamily: 'Unbounded, cursive', color: 'black', textAlign: 'center', borderRadius: '40px' }} cover={<img alt="quacks" src={Quacks} style={{ borderRadius: '40px' }} />}
                        title="Quacks Mint" bordered={false}>
                        <div style={{ color: 'black', marginBottom: 10 }}>Live mint for the Gen2, staking yield booster NFT, Fury Quack Gang</div>
                        <Button href="https://furyquackgang.com/" type="primary">Mint Quacks</Button>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <div style={{ textAlign: 'center', marginTop: 70 }}>
                        <h2></h2>
                        <p></p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
