/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import axios from "axios";
import { useState } from "react";
import React from "react";
import useActiveWeb3React from 'hooks/useActiveWeb3React';

async function FetchStake() {
  const [HSNFTs, setHSNFTs] = useState([]);
  const { account } = useActiveWeb3React();
  //questo è la logica del fetch del contratto Cronosnauts (Non in staking)
  const options = {
    method: "GET",
    url: "https://deep-index.moralis.io/api/v2/" + account + "/nft",
    params: {
      chain: "cronos",
      format: "decimal",
      token_addresses: "0x79FCf35a146E2E61b04685988658883982Ca08Ba",
      normalizeMetadata: "false",
    },
    headers: {
      accept: "application/json",
      "X-API-Key":
        "JC5dsf3ZKeAr5aszxVkpfnTkshpu0sU9BWzda4U3SdeyOJ6plyLyhcNVIzQjq8uy",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log("response", response.data);
      const datawrap = response.data;
      setHSNFTs(datawrap.result);
    })
    .catch(function (error) {
      console.error(error);
    });

  if (account === undefined) return { null: null, HSNFTs: null }
  else

    return { HSNFTs: HSNFTs || 'undefined'};
}

export default FetchStake;