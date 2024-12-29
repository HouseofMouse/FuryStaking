/* eslint-disable prettier/prettier */
import { useMoralis, useNativeBalance } from "react-moralis";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);
  const { account, isAuthenticated } = useMoralis();

  if (!account || !isAuthenticated) return null;

  return (
    <div style={{color:'black', textAlign: "center", whiteSpace: "nowrap", size: "12px", marginTop: "5px", marginRight: "-10px"}}>
      {balance.formatted}
    </div>
  );
}

export default NativeBalance;
