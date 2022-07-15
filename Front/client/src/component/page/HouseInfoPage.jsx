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
import Make_Chatting from "../ui/Make_Chatting";
import Transaction_log from "../ui/TransactionText"
import BuyHouseContract from "../../contracts/BuyHouse.json"
//#endregion

//#region 전역변수
let web3;
let instance;
let All_record= [];
//#endregion

function HouseInfoPage() {

    const navigate = useNavigate();
    const location = useLocation();

    //#region useState 변수
    const [seller_name] = useState(location.state[0].name);
    const [houseAddress] = useState(location.state[0].address)
    const [buyer_name] = useState(location.state[1][0].name);

    const [state, setState] = React.useState({
        left: false
    });
    
    const [transaction_record, setTransaction_record] = useState([]);
    const [transaction_textlog, setTransaction_textlog] = useState([]);
    //#endregion

    //#region 메뉴바 control
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift') ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    //#endregion

    //#region useEffect
    //총 거래기록
    useEffect(()=>{        
        for(let i=0; i<transaction_record.length; i++){
            if(transaction_record[i].houseAddress === houseAddress){
                All_record.push({sellerName : transaction_record[i].sellerName, buyerName: transaction_record[i].buyerName, housePrice : transaction_record[i].housePrice});
                setTransaction_textlog(All_record); 
            }   
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[transaction_record]);

    //로딩
    useEffect(() => {
        async function load() {          
            web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = await BuyHouseContract.networks[networkId];      
            instance = new web3.eth.Contract(BuyHouseContract.abi, deployedNetwork.address);
            setTransaction_record(await instance.methods.readRealEstate().call());
        }
        
        load();
    }, [location]);   
    //#endregion

    //#region 렌더링
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
                            <br/>
                            <Typography gutterBottom variant="h5" component="h2">
                                거래 기록
                            </Typography>
                            <Transaction_log log={transaction_textlog}></Transaction_log>
                        </CardContent>
                        <CardActions>
                            <Box sx={{ flexGrow: 1 }} />
                            <Make_Chatting sellername={seller_name} buyername={buyer_name} ></Make_Chatting>
                        </CardActions>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
    //#endregion
}

export default HouseInfoPage;