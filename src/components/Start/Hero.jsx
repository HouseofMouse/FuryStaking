/* eslint-disable prettier/prettier */
import React from 'react';
import './Start.css';
//import HeroConnect from './HeroConnect'
import Logo from '../../image/FMG_emot.png'

export default function Hero() {
    return (
        <div style={{ alignItems: 'center', verticalAlign:'center', position: 'relative', marginTop: 100}}>
            <img
                style={{
                    height: 400,
                    width: 400,
                    maxWidth: 380,
                    maxHeight: 380,
                    borderRadius: "0px",
                }}
                src={Logo}
            ></img>
        </div>
    )
}

