//#region react
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
//#endregion

//#region mui
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
//#endregion

const theme = createTheme();

let socket;

function Login(props) {

    const ENDPOINT = "http://localhost:8080";

    const navigate = useNavigate();

    //#region useState 변수
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    //#endregion

    //#region useEffect
    useEffect(() => {
        socket = io(ENDPOINT);
    }, []);    
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
                        로그인
                    </Typography>
                    <Box component="form" onSubmit={(e)=>{
                        e.preventDefault();
                    }} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="ID"
                            autoFocus
                            onChange={(e) => setId(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete="on"
                            onChange={(e) => setPw(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="아이디 저장"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={async () => {
                                socket.emit("Login", { id, pw });
                                await socket.on("Login_result", (result) => {
                                    // eslint-disable-next-line eqeqeq
                                    if (result == "" || undefined) {
                                        alert("아이디와 비밀번호를 확인하세요");
                                        window.location.replace("/post-LoginPage")
                                        setId("");
                                    }
                                    else { 
                                        navigate("/post-MainPage", { state: result });
                                    }
                                })
                            }}
                        >
                            로그인
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    패스워드 찾기
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link onClick={() => {
                                    navigate("/post-NewMemberPage")
                                }} variant="body2">
                                    {"회원가입"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
    //#endregion
}

export default Login;