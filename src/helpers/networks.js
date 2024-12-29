export const networkConfigs = {
  "0x19": {
    chainName: "Cronos",
    currencyName: "CRO",
    currencySymbol: "CRO",
    rpcUrl: "https://rpc.vvs.finance/",
    blockExplorerUrl: "https://cronoscan.com/",
    wrapped: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
  },
};

export const getNativeByChain = (chain) =>
  networkConfigs[chain]?.currencySymbol || "NATIVE";

export const getChainById = (chain) => networkConfigs[chain]?.chainId || null;

export const getExplorer = (chain) => networkConfigs[chain]?.blockExplorerUrl;

export const getWrappedNative = (chain) =>
  networkConfigs[chain]?.wrapped || null;
