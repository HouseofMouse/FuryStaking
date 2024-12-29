/* eslint-disable prettier/prettier */
import { useMoralis, useERC20Balances } from "react-moralis";
import { Skeleton, Table } from "antd";
import { Container, Box } from "@mui/material";
import { useEffect } from "react";

function ERC20Balance(props) {
  const { data: assets } = useERC20Balances(props);
  const { Moralis } = useMoralis();

  useEffect(() => {
    return () => {
      !assets
    };
  }, [ERC20Balance])

  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => symbol,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value, item) =>
        parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
    },
  ];

  const styles = {
    lol: {
      marginTop: -15,
      fontSize: 20,
      color: "white",
      textAlign: "center",
      textShadow: "0 0 7px #007577, 0 0 10px #007577",
      padding: 10,
    },
  };


  console.log("A", assets)
  
  return (
    <Container
      style={{
        alignItems: "center",
        verticalAlign: 'center'
    }}>
      <Box style={{
        alignItems: "center",
      }}>
      <div style={{ width: "auto", padding: "15px" }}>
        <div style={styles.lol}>TOKEN BALANCES:</div>
        <div></div>
        <p></p>
        <Skeleton loading={!assets}>
          <Table
            dataSource={assets}
            columns={columns}
            rowKey={(record) => {
              return record.token_address;
            }}
          />
        </Skeleton>
      </div>
      </Box>
    </Container>
  );
}
export default ERC20Balance;
