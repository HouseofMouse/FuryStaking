/* eslint-disable prettier/prettier */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        marginTop: '10px',
        maxWidth: 500,
        flexGrow: 1,
        background: 'linear-gradient(208deg, rgba(7,1,19,1) 41%, rgba(54,46,57,1) 100%)',
        border: '3px solid white',
        color: 'white'
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img  style={{border: '1.5px solid white', borderRadius: '3px'}} alt="House" src="https://pbs.twimg.com/media/FigldqhX0AMyQoK?format=jpg&name=small" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Fury House #542
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Button style={{marginTop: '20px'}} size="large" variant="outlined">Approve</Button>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            <div style={{display: 'row'}}>
                    <Button size="small" variant="outlined">Stake</Button>
                </div>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
