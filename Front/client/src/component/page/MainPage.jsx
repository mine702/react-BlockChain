/* eslint-disable react/jsx-pascal-case */
//#region react
import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
//#endregion

//#region mui
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
//#endregion

//#region component
import RoomList_Dialog from '../ui/RoomList_Dialog';
import Mainpage_Card from '../ui/Mainpage_Card';
import BuyLogText from '../ui/BuyLogText';
//#endregion

//#region 라이브러리
import Web3 from 'web3';
import RealEstate from '../../contracts/BuyHouse.json';
// import NFTContract from '../../contracts/NFT.json'   삭제
//#endregion

const theme = createTheme();

//#region 전역변수
let socket;
let web3;
let instance;
// let NFTinstance;   삭제
//#endregion

let options = {
    fromBlock: 0,
    toBlock: 'latest'
};

function Mainpage(props) {

    //const { account } =props;

    let Arr_BuyLogText = [];

    const ENDPOINT = "http://localhost:8080";

    const navigate = useNavigate();
    const location = useLocation();

    //#region useState 변수
    const [cards, setCardsLow] = useState([]);
    const [area, setArea] = useState("");
    const [username, setUsername] = useState("");
    const [buycards, setBuyCards] = useState([]);
    const [state, setState] = React.useState({
        left: false
    });
    //const [accounts, setAccounts] = useState("");  삭제
    const [ALL_BuyLogText, setBuyLogText] = useState([]);

    //#endregion
    //#region useEffect
    useEffect(() => {
        socket = io(ENDPOINT);
        setUsername(location.state[0].name);
        async function load() {
            web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
            const networkId = await web3.eth.net.getId();
            //setAccounts(await web3.eth.getAccounts());  삭제
            const deployedNetwork = RealEstate.networks[networkId];
            // const NFTdeployedNetwork = NFTContract.networks[networkId];   삭제
            instance = new web3.eth.Contract(RealEstate.abi, deployedNetwork.address);
            // NFTinstance = new web3.eth.Contract(NFTContract.abi, NFTdeployedNetwork.address);   삭제

            instance.getPastEvents({} , options).then((res) => {  //이번트에 있는 값 전체 검색
                for (let i = 0; i < res.length; i++) {
                    Arr_BuyLogText.push(`${res[i].returnValues.buyerName}님이 ${res[i].returnValues.sellerName}님의 ${res[i].returnValues.houseAddress}를 ${res[i].returnValues.housePrice}eth로 매입하셨습니다.`);
                }
                setBuyLogText(Arr_BuyLogText);
            }).catch((err) =>{
                throw err;
            })

            // instance.events.BuyLogText({} , options, (err, res) => {      삭제 
            //     Arr_BuyLogText.push(`${res.returnValues.buyerName}님이 ${res.returnValues.sellerName}님의 ${res.returnValues.houseAddress}를 ${res.returnValues.housePrice}eth로 매입하셨습니다.`);
            //     setBuyLogText(Arr_BuyLogText);
            // });

            setBuyCards(await instance.methods.readRealEstate().call());
        }
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    useEffect(() => {
        if (area !== "") {
            socket.emit("Area_Data", { area });
            socket.on("Area_Data_Result", (Result) => {
                setCardsLow(Result);
                console.log(area+ "지역 " + Result.length+"개 로드");
                socket.off();
            })
        }
    }, [area])
    //#endregion

    //#region 메뉴바 control
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    //#endregion    

    //#region 렌더링
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer("left", true)}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor="left"
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                        onOpen={toggleDrawer("left", true)}
                    >
                        <Box
                            sx={{ width: "left" === 'top' || "left" === 'bottom' ? 'auto' : 250 }}
                            role="presentation"
                            onClick={toggleDrawer("left", false)}
                            onKeyDown={toggleDrawer("left", false)}
                        >
                            <List>
                                <ListItem key="마이페이지" disablePadding sx={{ display: 'block' }}>
                                    <Divider />
                                    <ListItemButton>
                                        <ListItemText onClick={() => {
                                            navigate("/post-UserMyPage", { state: [location.state, buycards] })
                                        }} primary="MyPage" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemText onClick={() => {
                                            navigate("/")
                                        }} primary="LogOut" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </SwipeableDrawer>
                    <RoomList_Dialog name={username}></RoomList_Dialog>
                    <Box sx={{ flexGrow: 1 }} />
                    접속중인 사람 : {username}
                </Toolbar>

            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            부동산
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Box sx={{ minWidth: 200 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">지역</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={area}
                                        label="locationv"
                                        onChange={(e) =>
                                            setArea(e.target.value)}
                                    >
                                        <MenuItem value={"대전"}>대전</MenuItem>
                                        <MenuItem value={"서울"}>서울</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button variant="contained" onClick={() => {
                                navigate("/post-Checkout", { state: location.state })
                            }}>신규 판매 등록</Button>
                            <Button variant="outlined" onClick={() => {
                                navigate("/post-HouseInfoExistInsert", { state: location.state })
                            }}>기존 판매 등록</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    {/* <Mainpage_Card cards={cards} user={location.state} value={buycards}></Mainpage_Card>  삭제 */}
                    <Mainpage_Card cards={cards} user={location.state}></Mainpage_Card>
                </Container>
            </main>
            {/* Footer */}
            {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                </Typography>
            </Box> */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <BuyLogText LogText={ALL_BuyLogText}></BuyLogText>
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
    //#endregion
}

export default Mainpage;