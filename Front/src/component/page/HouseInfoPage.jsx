import React, { useState, useEffect } from "react";
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import WarningDialog from "../ui/WarningDialog"
import io from "socket.io-client";

let socket;

const ENDPOINT = "http://localhost:8080";

function HouseInfoPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [roomn, setRoomN] = useState([]);
    const [Sname] = useState(location.state[0].name);
    const [Oname] = useState(location.state[1][0].name);

    useEffect(() => {
        socket = io(ENDPOINT);
    })

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
        navigate("/post-MainPage", { state: location.state[1] });
    }

    async function MakeRoom() {

        socket.emit("Room_Search");
        await socket.on("Room_Search_Result", (Result) => {
            if (Result.length === 0) {
                socket.emit("No_Room_Make", { Sname, Oname });
                socket.on("No_Room_Make_Result", (Result) => {
                    console.log(Result)
                })
            }
            else {
                for (let i = 0; i < Result.length; i++) {
                    // eslint-disable-next-line eqeqeq
                    if (Result[i].Oname == Oname && Result[i].Sname == Sname) {
                        console.log("join Room")
                    }
                    // eslint-disable-next-line eqeqeq
                    else if (Result[i].Oname != Oname && Result[i].Sname != Sname) {
                        setRoomN([Result[i].RoomN])
                        for (let i = 0; i < roomn.length; i++) {
                            for (let j = 1; j < 10; j++) {
                                // eslint-disable-next-line eqeqeq
                                if (roomn[i] != j) {
                                    socket.emit("Room_Make", { Sname, Oname, j });
                                    socket.on("Room_Make_Result", (Result) => {
                                        console.log(Result)
                                    })
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        })
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
                                Seller information
                            </Typography>
                            <Typography gutterBottom variant="h6">
                                &nbsp;&nbsp;name: {location.state[0].name}<br />
                                &nbsp;&nbsp;number : {location.state[0].number}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Price
                            </Typography>
                            <Typography gutterBottom variant="h6">
                                &nbsp;&nbsp;{location.state[0].price} (ETH)
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Picture
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
                                Address
                            </Typography>
                            <Typography>
                                &nbsp;&nbsp;{location.state[0].address}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box sx={{ flexGrow: 1 }} />
                            <WarningDialog warningHead={"구매 확인"} warningButton={"BUY"} warning={"정말 구매하시겠습니까?"}></WarningDialog>

                            <Button size="small" onClick={MakeRoom}>Chatting</Button>
                        </CardActions>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
}

export default HouseInfoPage;
