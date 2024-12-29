/* eslint-disable prettier/prettier */

import sample from "lodash/sample";

// Array of available nodes to connect to
export const nodes = [
  "https://evm.cronos.org/",
  "https://rpc.vvs.finance/",
  // process.env.REACT_APP_NODE_3,
  // process.env.REACT_APP_NODE_4,
];

const getNodeUrl = () => {
  return sample(nodes);
};

export default getNodeUrl;