import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail';
import io from "socket.io-client";
import ListText_1 from "./ListText_1";

let socket;

const ENDPOINT = "http://localhost:8080";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog(props) {
    let test = [];
    const [rn,setRN] = React.useState("")
    const [RoomNumbers , setRoomN] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const {UserName} = props;

    useEffect( ()=>{
        socket = io(ENDPOINT)
    });

    const handleClickOpen = () => {
        setOpen(true);
        socket.emit("RoomNumber" , {UserName});
        socket.on("RoomNuber_Result" ,(res)=>{
            setRoomN([...RoomNumbers,res]);
            console.log(res);
            setRN(res.result[0]);
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Message
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListText_1 value ={RoomNumbers}></ListText_1>
                </List>
            </Dialog>
        </div>
    );
}

export default FullScreenDialog;