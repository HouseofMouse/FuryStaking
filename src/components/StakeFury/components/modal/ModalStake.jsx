/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Paper, Box } from '@mui/material';
import EmptyCard from '../card/EmptyCard'

const ModalStake = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Stake your Mouse!');

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Button style={{marginLeft: '8px'}} type="primary" onClick={showModal}>
        Mice
      </Button>
      <Modal
        title="Fury Mouse Vault"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
      >
          <div>
          <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,

        },
      }}
    >
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />

      <Box style={{
          margineLeft: '20px',
          height: 128,
          width: 270,
          background: 'black',
          border: "4px solid green",
          borderRadius: '10px',
          color: 'white'
      }}>
          <div style={{
              marginLeft: '15px'
          }}>
          <div>
              <div>Earned: <font color="green">  1872 </font>  $FURY</div>
          </div>
          <div>
              <div>Malus:  <font color="red"> 456 </font> MALUS</div>
          </div>
          <div>
              <div>Mouse: <font color="green"> 3 </font></div>  
          </div>
          <div>
              <div>Ducks: <font color="green"> 12 </font></div>
          </div>
          <div>
              <div>Multiplier: <font color="green"> 432 </font> $FURY</div>
          </div>
          </div>
      </Box>

    </Box>
          </div>
        <p style={{alignItems: 'center', textAlign: 'center'}}>{modalText}</p>
        <div>
        <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
    </Box>
        </div>
      </Modal>
    </>
  );
};
export default ModalStake;