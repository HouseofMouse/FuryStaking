/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";

const {Meta} = Card;
<Card
  hoverable
  actions={
    [
      /*
   <Tooltip title="Unstake">
    <ApiOutlined onClick={unstakeit} />
   </Tooltip>,
   */
    ]
  }
  style={{
    border: "10px solid white",
    borderRadius: "20px",
    fontFamily: "'Space Mono', monospace",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow:
      "0 0 7px #fff, 0 0 10px #ff4b1f, 0 0 15px #ff4b1f,  0 0 23px #ff9068",
  }}
  cover={
    <Image
      src={PlusMus}
      alt=""
      style={{
        height: "128px",
        maxHeight: "128px",
        borderRadius: "10px",
        boxShadow:
          "0 0 7px #fff, 0 0 10px #ff4b1f, 0 0 13px #ff4b1f, 0 0 17px #ff4b1f, 0 0 20px #ff4b1f",
      }}
      preview={false}
    />
  }
  key={0}
>
  <Meta title="Stake Your Mouse" subtitle="Malus:" />{" "}
</Card>;
