import React, { useState } from 'react';
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

function PrimarySearchAppBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username] = useState(location.state)
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
                            <Typography>
                                This is a media card. You can use this section to describe the
                                content.
                            </Typography>
                        </CardContent>
                    </Card>
                    <br/>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >                        
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                            구매내역
                            </Typography>
                            <Typography>
                                This is a media card. You can use this section to describe the
                                content.
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
}

export default PrimarySearchAppBar;
