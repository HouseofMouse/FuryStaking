/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { Skeleton, Table } from "antd";
import { useMoralis } from "react-moralis";

export default function PROBalance() {
  const [data, setBalances] = useState([]);
  const Web3Api = useMoralisWeb3Api();
  const Web3 = require('web3');
  const { Moralis, chainId } = useMoralis();
  const web3 = useMoralisWeb3Api();


  const fetchTokenBalances = async () => {
    const Web3 = require('web3');
    const web3 = new Web3(Moralis.provider);
    const account = await Moralis.account;
    const options = {
      chain: "cro",
      address: { account },
      to_block: "4967280",
    };
    const balances = await Web3Api.account.getTokenBalances(options);
    setBalances(balances);
    console.table(balances);
    console.log(account)
  };

  const columns = [
    {
      title: "",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => (
        <img
          src={logo || "https://etherscan.io/images/main/empty-token.png"}
          alt="nologo"
          width="28px"
          height="28px"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name,
    },
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
    {
      title: "Address",
      dataIndex: "0x2BD7dbdbCf57c9B907c381E2F112D9682caad311",
      key: "0x2BD7dbdbCf57c9B907c381E2F112D9682caad311",
      render: (address) => getEllipsisTxt(address, 5),
    },
  ];

  return (
    <div style={{ width: "65vw", padding: "15px" }}>
      <h1>💰Token Balances</h1>
      <Skeleton loading={!data}>
        <Table
          dataSource={data}
          columns={columns}
          rowKey={(record) => {
            return record.token_address;
          }}
        />
      </Skeleton>
    </div>
  );
}
