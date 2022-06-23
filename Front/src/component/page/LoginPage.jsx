import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const theme = createTheme();

let socket;



function SignIn(props) {

    const ENDPOINT = "http://localhost:8080";

    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    

    useEffect(() => {
        socket = io(ENDPOINT);
        
        
        }, [ENDPOINT]); 

     
        
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('id'),
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
                        로그인
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="id"
                            name="id"
                            autoComplete="id"
                            autoFocus
                            onChange={(e) => setId(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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
                                await socket.on("Login_result", (result)=>{
                                    if(result =="" || undefined)
                                    {
                                        alert("아이디와 비밀번호를 확인하세요");
                                    }
                                    else
                                    {
                                        //console.log(socket_state);
                                        console.log(result);
                                        navigate("/post-MainPage", {state: result});
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
}

export default SignIn;