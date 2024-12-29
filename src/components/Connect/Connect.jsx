/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useMoralis } from "react-moralis";
import { Button } from '@mui/material';
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({
  supportedChainIds: [25],
});

function getLibrary(provider) {
  console.log("getting library") 
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}
function Connect() {

    const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

    useEffect(() => {
    if (active) {
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const login = () => {
        activate()
          .then(function (account) {
            console.log("logged in user:", account);
            console.log(account.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const logOut = async () => {
      await deactivate();
      console.log("logged out");
    }

  return (
    <div>
      <Button onClick={() => activate()} variant="contained" color="success">Connect Wallet</Button>
    </div>
  );
}

export default Connect;