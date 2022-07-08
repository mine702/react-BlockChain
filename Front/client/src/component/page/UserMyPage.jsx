/* eslint-disable react/jsx-pascal-case */
//#region react
import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
//#endregion

//#region mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from "react-router";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//#endregion

//#region component
import Mypage_SellCard from '../ui/Mypage_SellCard';
import Mypage_BuyCard from '../ui/Mypage_BuyCard';
//#endregion

let socket;

function PrimarySearchAppBar() {

    const ENDPOINT = "http://localhost:8080";

    const navigate = useNavigate()
    const location = useLocation()
    const [cards, setCardsLow] = useState([]);
    let number = 0;
    let name = 0;
    const [username] = useState(location.state[0][0].name);
    const [buycard] = useState(location.state[1])
    console.log(location.state)
    useEffect(() => {
        async function load() {
            socket = io(ENDPOINT);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            number = location.state[0][0].number
            // eslint-disable-next-line react-hooks/exhaustive-deps
            name = location.state[0][0].name            
        }
        load();
    }, [location]);

    useEffect(() => {
        socket.emit("MyPageSell", { name, number });
        socket.on("MyPageSell_Result", (Result) => {
            setCardsLow(Result);
        })
    }, [name, number])

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
    function SendMessage() {
        navigate("/post-MainPage", { state: location.state[0] });
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
                                        <ListItemText onClick={SendMessage} primary="MainPage" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemText onClick={() => {
                                            navigate("/post-UserUpdatePage", { state: location.state })
                                        }} primary="Profile Update" />
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
                        MyPage
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    접속중인 사람 : {username}
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
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        MyPage
                    </Typography>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                판매내역
                            </Typography>
                            <Mypage_SellCard cards={cards} user={location.state}></Mypage_SellCard>
                        </CardContent>
                    </Card>
                    <br />
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                구매내역
                            </Typography>
                            <Mypage_BuyCard cards = {buycard} username={username}></Mypage_BuyCard>
                        </CardContent>
                    </Card>
                </Container>
            </Box>

        </Box>
    );
}

export default PrimarySearchAppBar;
