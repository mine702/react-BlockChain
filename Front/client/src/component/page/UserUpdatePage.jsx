//#region react
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router";
import io from "socket.io-client";
//#endregion

//#region mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//#endregion

let socket;

const theme = createTheme();

const NewMember = () => {

    const ENDPOINT = "http://localhost:8080";

    const navigate = useNavigate();
    const location = useLocation();

    //#region useState 변수
    const [name, setName] = useState(location.state[0][0].name);
    const [id] = useState(location.state[0][0].id);
    const [pw, setPw] = useState(location.state[0][0].pw);
    const [phoneNum, setPhoneNum] = useState(location.state[0][0].number);
    const [MetaMaskAcc, setMetaMaskAcc] = useState(location.state[0][0].MetaMaskAcc);
    //#endregion

    //#region useEffect
    useEffect(() => {
        socket = io(ENDPOINT);
    }, []);
    //#endregion

    //#region 정보수정 버튼(이벤트)
    function Sign_up() {
        if (name === "" || id === "" || pw === "" || phoneNum === "" || MetaMaskAcc === "") {
            alert("입력하지 않은 정보가 있습니다");
        }
        else {
            console.log(phoneNum);
            socket.emit("UserUpdate", { name, id, pw, phoneNum, MetaMaskAcc });
            socket.on("UserUpdate_Result", (CheckMsg) => {
                alert(CheckMsg);
            });
            navigate('/');
        }
    }
    //#endregion

    //#region 렌더링
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
                        회원 정보 수정
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    label="name"                                    
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="id"
                                    label="id"
                                    defaultValue={id}
                                    type="id"
                                    id="id"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    value={pw}
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
                                    value={phoneNum}
                                    name="number"
                                    autoComplete="number"
                                    onChange={(e) => setPhoneNum(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="MetaMaskAcc"
                                    label="MetaMaskAcc"
                                    value={MetaMaskAcc}
                                    name="MetaMaskAcc"
                                    autoComplete="MetaMaskAcc"
                                    onChange={(e) => setMetaMaskAcc(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                Sign_up();
                            }}
                        >
                            정보 수정
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
    //#endregion
}

export default NewMember;