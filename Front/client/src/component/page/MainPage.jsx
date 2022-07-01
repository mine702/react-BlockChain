//#region react
import React, { useState, useEffect, useReducer } from 'react';
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
//#endregion



const theme = createTheme();

let socket;

function Mainpage(props) {

    //const { account } =props;

    const ENDPOINT = "http://localhost:8080";

    const navigate = useNavigate();
    const location = useLocation();

    const [cards, setCardsLow] = useState([]);
    const [area, setArea] = useState("");
    const [username, setUsername] = useState("");

    const [state, setState] = React.useState({
        left: false
    });

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

    useEffect(() => {
        socket = io(ENDPOINT);
        setUsername(location.state[0].name);
        //console.log(account);
    }, [location])

    useEffect(() => {
        if (area !== "") {
            socket.emit("Area_Data", { area });
            socket.on("Area_Data_Result", (Result) => {
                setCardsLow(Result);
                socket.off();
            })
        }
    }, [area])

   

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
                                        <ListItemText onClick={()=>{
                                            navigate("/post-UserMyPage", { state: [location.state] })
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
                            }}>판매 등록</Button>
                            <Button variant="outlined">매물 검색</Button>
                            <Button variant="outlined" >구매</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Mainpage_Card cards={cards} user={location.state}></Mainpage_Card>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                </Typography>
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}

export default Mainpage;