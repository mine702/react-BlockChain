//#region react
import React, { useEffect, useState } from 'react';
//#endregion

//#region mui
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail';
//#endregion

//#region component
import io from "socket.io-client";
import RoomList from "./RoomList";
//#endregion

let socket;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog(props) {

    const ENDPOINT = "http://localhost:8080";

    const [RoomNumbers , setRoomN] = useState([]);
    const [open, setOpen] = useState(false);

    const {name} = props;

    useEffect( ()=>{
        socket = io(ENDPOINT)
    });

    const handleClickOpen = () => {
        socket.emit("RoomNumber" , {name});
        socket.on("RoomNuber_Result" ,(res)=>{
            console.log(res.result);
            setRoomN(res.result);
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >
            <IconButton onClick={handleClickOpen}>
                <Badge badgeContent={RoomNumbers.length} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <Dialog                
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                children={RoomList}
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
                <RoomList value ={RoomNumbers} username={name}></RoomList>                 
            </Dialog>
        </div>
    );
}

export default FullScreenDialog;