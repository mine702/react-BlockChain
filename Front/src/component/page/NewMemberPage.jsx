import React, { useState, useEffect }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

let socket;

const theme = createTheme();

const Chat = ({ location }) => {

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [number, setNumber] = useState("");
    const [MetaMaskAcc, setMetaMaskAcc] = useState("");

    const ENDPOINT = "http://localhost:8080";
    const navigate = useNavigate();

    useEffect(() => {
        socket = io(ENDPOINT);
       
      }, []);

    function SendMessage(){
        socket.emit("Message", { name, id, pw, number, MetaMaskAcc });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        회원가입
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="이름"
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="id"
                                    label="id"
                                    type="id"
                                    id="id"
                                    autoComplete="new-id"
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setPw(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="number"
                                    label="전화번호"
                                    name="number"
                                    autoComplete="number"
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="MetaMaskAcc"
                                    label="MetaMaskAcc"
                                    name="MetaMaskAcc"
                                    autoComplete="MetaMaskAcc"
                                    onChange={(e) => setMetaMaskAcc(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">년도</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="locationv"
                                    >
                                        <MenuItem value={"1999"}>1999</MenuItem>
                                        <MenuItem value={"2000"}>2000</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">월</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="locationv"
                                    >
                                        <MenuItem value={"07"}>07</MenuItem>
                                        <MenuItem value={"08"}>08</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">일</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="locationv"
                                    >
                                        <MenuItem value={"01"}>01</MenuItem>
                                        <MenuItem value={"02"}>02</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="개인정보 확인에 동의 하십니까?"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                SendMessage();
                            }}
                        >
                            회원가입
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => {
                                    navigate("/")
                                }} variant="body2">
                                    이미 아이디가 있는 경우
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Chat;