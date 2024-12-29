/* eslint-disable prettier/prettier */

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Account from '../Account/Account';
import Chip from '@mui/material/Chip';
import NativeBalance from 'components/NativeBalance';
import { Box } from "@mui/material";
import { useWeb3React } from '@web3-react/core';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const style = {
  button: {
      marginTop: 10,
      color: 'green',
      borderRadius: 10,
      marginLeft: 0,
      height: 40,
      boxShadow: "0 0.5rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
  },
  buttonafter: {
      marginTop: 3,
      color: 'green',
      background: 'black',
      borderRadius: 10,
      alignItems: 'center',
      marginLeft: 0,
  }
}

export default function BadgeAvatars() {

  const { account } = useWeb3React();

  if (!account) {
    return <Account />;
} else
  return (
    <Box
      style={{
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        style={{
          alignItems: "center",
          verticalAlign: "center",
          display: "flex",
        }}
      >
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="Alien" src="/static/images/avatar/1.jpg" />
          </StyledBadge>
          <Chip
            label="Connected"
            color="success"
            style={{ marginTop: 5, marginLeft: 0,  marginRight: 20 }}
          />
          <Account></Account>
        </Stack>
        <Stack direction="column" spacing={2}>
          <Box style={{
            height: '40px',
            width: '200px',
            background: 'white',
            border: '5px solid green',
            borderRadius: '10px'
          }}>
          <NativeBalance ></NativeBalance>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
