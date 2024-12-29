/* eslint-disable prettier/prettier */
import React from "react";
import './index.css';
import logo from './image/FMG_emot.png'
export const LandingPage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                marginTop: 10,
                fontSize: 60,
                color: "white",
                textAlign: "center",
                textShadow: "0 0 7px #007577, 0 0 10px #007577, 0 0 21px #2B255D, 0 0 25px #00FF00",
                padding: 10,
                fontFamily: "'Space Mono', monospace",

            }}>
                FURY STAKING
            </div>
            <div style={{
                marginTop: 20,
                fontSize: 60,
                color: "white",
                textAlign: "center",
                textShadow: "0 0 7px #007577, 0 0 10px #007577, 0 0 21px #2B255D, 0 0 25px #00FF00",
                padding: 10,
                fontFamily: "'Space Mono', monospace",
            }}>
                BETA VERSION : START 5th MARCH
            </div>
            <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 10,
                }}>
                    <img src={logo} width={500} height={500} alt="logo"></img>
                </div>
        </div>
    );
};
