/* eslint-disable prettier/prettier */
import React from 'react'
import ReactDOM from 'react-dom'
import { Web3ReactProvider } from '@web3-react/core'
import {getLibrary} from "./components/Account/config";
import App from './App'


ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App/>
    </Web3ReactProvider>
  </React.StrictMode>,

  document.getElementById('root'),
)


// <Providers/> al posto di landing page