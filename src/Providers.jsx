/* eslint-disable prettier/prettier */
import { Web3ReactProvider } from "@web3-react/core";
// import { Provider } from "react-redux";
import { getLibrary } from "utils/web3React";
//import { store } from "state";

const Providers = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
    </Web3ReactProvider>
  );
};

export default Providers;
