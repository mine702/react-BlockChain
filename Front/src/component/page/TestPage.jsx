import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MessageIcon from '@mui/icons-material/Message';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import SendIcon from '@mui/icons-material/Send';

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MessageIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Message
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '60%'
          },
        }}
        justifyContent="center"
      >
        <Paper elevation={3} >dksdug
        <TextField
                    margin='normal'
                    required
                    fullWidth
                    id="Message"
                    label="Message"
                    name="Message"
                    autoComplete="Message"
                    autoFocus
                />
                <ButtonGroup disableElevation variant="contained">
                    <Button variant="contained" >CLOSE</Button>
                    <Button variant="contained" endIcon={<SendIcon />}  >SEND</Button>
                </ButtonGroup>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}