/* eslint-disable prettier/prettier */
import { useWeb3React } from '@web3-react/core'
import '../../style.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Account from 'components/Account/Account';

export default function HomeConnect() {
    const { account } = useWeb3React()

    if (!account) {
        return <div style={{backgroundColor: 'black', borderRadius: 10}}><Account /></div>
      ;
    } else
    return (
        <div style={{alignItems: 'center', }}>
        <div>
        <Box sx={{
         //background: 'white',
         alignItems: 'center',
         verticalAlign: 'center',
         xl: 'auto',
         xs: 'auto',
         marginTop: 5,
         marginLeft: 'auto',
         borderRadius: 10,
        }}>
      <Link to="/mousestake">
        <Button flexDirection="raw" href='./home' component="span" variant="contained" startIcon={<SendIcon />} color="secondary" size="large" sx={{
          alignItems: { xs: 'center', md: 'flex-start' },
          flexDirection: 'raw',
          xl: 'auto',
          xs: 'auto',
          mt: 0,
          ml: 0,
          width: 220,
          background: "black",
          borderRadius: "20px",
          boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, ",
      }}><div>Staking</div></Button>
      </Link>
      </Box>
      </div>
      </div>
    );
}