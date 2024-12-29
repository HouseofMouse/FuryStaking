/* eslint-disable prettier/prettier */
import { useWeb3React } from '@web3-react/core'
import '../../style.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Account from 'components/Account/Account';

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

export default function HeroConnect() {
    const { account } = useWeb3React()

    if (!account) {
        return <div><Account /></div>
      ;
    } else
    return (
        <div style={{alignItems: 'center', }}>
        <div>
            <div style={style.buttonafter}> »  Connected </div>
        <Box sx={{
         //background: 'white',
         alignItems: 'center',
         verticalAlign: 'center',
         xl: 'auto',
         xs: 'auto',
         marginTop: 5,
         marginLeft: 'auto',
         borderRadius: 10,
        }}><Link to="/home">
        <Button flexDirection="raw" href='./home' component="span" variant="outlined" startIcon={<SendIcon />} color="primary" size="large" sx={{
          alignItems: { xs: 'center', md: 'flex-start' },
          flexDirection: 'raw',
          xl: 'auto',
          xs: 'auto',
          mt: 0,
          ml: 0,
          width: 220,
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, ",
      }}><div>Home</div></Button>
      </Link>
      <Link to="/mousestake">
        <Button flexDirection="raw" href='./home' component="span" variant="outlined" startIcon={<SendIcon />} color="primary" size="large" sx={{
          alignItems: { xs: 'center', md: 'flex-start' },
          flexDirection: 'raw',
          xl: 'auto',
          xs: 'auto',
          mt: 0,
          ml: 0,
          width: 220,
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, ",
      }}><div>Staking</div></Button>
      </Link>
      </Box>
      <div style={{
          height:100,
      }}>
      </div>
      </div>
      </div>
    );
}