/* eslint-disable prettier/prettier */

import { useERC20Balances } from 'react-moralis';
import React, { useState, useEffect } from 'react';
import Moralis from 'moralis';

const Total = () => {

    const {fetchERC20Balances, data} = useERC20Balances();

    const [token, setToken] = useState();
    
    useEffect(() => {
      const oof = async () => {
        await fetchERC20Balances({
          params: {
            chain: 'cronos',
            address: "0x755067ed1F08Ce95ff9533C973C17c09C4Fd7F23"
          }
        })
      }
      oof();
    }, []);
  
    useEffect(() => {
        if(!token) {
            setToken(data && data[1].balance)
        }
    }, [data])


    if(token) {
        
        return ( 
            <p>{parseFloat(Moralis.Units.FromWei(token)).toFixed(2)} PLNT</p>
        )

    } else {
        return (
            <p>-</p>
        )
    }
}
 
export default Total;