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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from "react-router";
import io from "socket.io-client";

let socket;


const theme = createTheme();

const Chat = ({ location }) => {
    const { stateusername } = useLocation();
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [number, setNumber] = useState("");
    const [MetaMaskAcc, setMetaMaskAcc] = useState("");

    const [idcheck, setIdCheck] = useState(false);
    const [checked, setCheckedButtons] = useState(false);

    const ENDPOINT = "http://localhost:8080";
    const navigate = useNavigate();

    useEffect(() => {
        socket = io(ENDPOINT);
      }, []);
    
    function SendMessage(){
        if(checked === false){
            alert("개인정보 동의를 하세요");
        }
        else if(name === "" || id === "" || pw ==="" || number==="" || MetaMaskAcc===""){
            alert("입력하지 않은 정보가 있습니다");
        }
        else if(idcheck === false){
            alert("ID 중복 체크 하세요!");
        }
        else{
            socket.emit("sign_up", { name, id, pw, number, MetaMaskAcc });
            socket.on("MemberCheck" , (CheckMsg)=>{
                alert(CheckMsg);
            })
            navigate('/');
        }
    }

    function CheckBoxBool(){
        if(checked === false){
            setCheckedButtons(true);
        }
        else if(checked ===true){
            setCheckedButtons(false);
        }
    }

    function idCheck() {

        if (id !== "") 
        {
            socket.emit("idCheck", { id });
            socket.on( "idCheck_rusult", (result)=>{
                if(result.result === true)
                {
                    alert("중복된 ID 입니다.")
                    setIdCheck(false);
                }
                else if(result.result === false)
                {
                    setIdCheck(true);
                    alert("사용가능한 ID 입니다.")
                }
            });
        }
        else
        {
            alert("ID를 입력하세요");
        }
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
                            <Grid item xs={12} sm={8}>
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
                            <Grid item xs={12} sm={4}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mt: 1, mb: 2 }}
                                    onClick={() => {
                                        idCheck();
                                    }}
                                >
                                    id 중복체크
                                </Button>
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
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" onClick={CheckBoxBool} />}
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