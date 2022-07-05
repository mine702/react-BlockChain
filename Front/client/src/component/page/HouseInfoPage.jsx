/* eslint-disable react/jsx-pascal-case */
//#region react
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Web3 from 'web3';
//#endregion

//#region mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
//#endregion

//#region component
import Notify_Dialog from "../ui/Notify_Dialog"
import Make_Chatting from "../ui/Make_Chatting";
import BuyHouseContract from "../../contracts/BuyHouse.json"
//#endregion

function HouseInfoPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const [sellername] = useState(location.state[0].name);
    const [sellerAddress] = useState(location.state[0].MetaMaskAcc)
    const [sellerPrice] = useState(location.state[0].price)
    const [buyername] = useState(location.state[1][0].name);
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const [state, setState] = React.useState({
        left: false
    });
    const [accounts, setAccounts] = useState()
    const [instance, setInstance] = useState()
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')

    useEffect(() => {
        async function load() {            
            setAccounts(await web3.eth.getAccounts());
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = BuyHouseContract.networks[networkId];
            setInstance(new web3.eth.Contract(
                BuyHouseContract.abi,      // abi 값을 넣어준거임
                deployedNetwork && deployedNetwork.address,     // 위에 주소값을 넣는다.
            ))
        }
        load();
    });

    function BuyHouse() {
        instance.methods.buyRealEstate(sellerAddress).send({ from: accounts[0],value:web3.toWei(sellerPrice,"ether")});
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
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
                                            navigate("/")
                                        }} primary="LogOut" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemText onClick={() => {
                                            navigate("/post-MainPage", { state: location.state[1] });
                                        }} primary="MainPage" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </SwipeableDrawer>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Buy
                    </Typography>&nbsp;
                    <ShoppingCartIcon />
                    <Box sx={{ flexGrow: 1 }} />
                    접속중인 사람 : {location.state[1][0].name}
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                판매자 정보
                            </Typography>
                            <Typography gutterBottom variant="h6">
                                &nbsp;&nbsp;이름 : {location.state[0].name}<br />
                                &nbsp;&nbsp;전화번호 : {location.state[0].number}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                가격
                            </Typography>
                            <Typography gutterBottom variant="h6">
                                &nbsp;&nbsp;{location.state[0].price} (ETH)
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                사진
                            </Typography>
                        </CardContent>
                        <Container><Container><Container><Container><Container><Container><Container><Container><Container>
                            <Card>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        pt: '0%',
                                    }}
                                    src={location.state[0].files}
                                    alt="random"
                                />
                            </Card>
                        </Container></Container></Container></Container></Container></Container></Container></Container></Container>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                주소
                            </Typography>
                            <Typography>
                                &nbsp;&nbsp;{location.state[0].address}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box sx={{ flexGrow: 1 }} />
                            <Notify_Dialog warningHead={"구매 확인"} warningButton={"BUY"} warning={"정말 구매하시겠습니까?"} OkButtonClick={BuyHouse}></Notify_Dialog>
                            <Make_Chatting sellername={sellername} buyername={buyername} ></Make_Chatting>
                        </CardActions>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
}

export default HouseInfoPage;
