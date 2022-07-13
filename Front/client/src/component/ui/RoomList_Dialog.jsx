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

//#region 하위 컴포넌트
import RoomList from "./RoomList";
//#endregion

//#region socket.io
import io from "socket.io-client";
//#endregion

//#region 전역 변수
let socket;
//#endregion

//#region 채팅방 애니메이션
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
//#endregion

function FullScreenDialog(props) {

    const {name} = props;

    const ENDPOINT = "http://localhost:8080";

    //#region useState
    const [RoomNumbers , setRoomN] = useState([]);
    const [open, setOpen] = useState(false);
    //#endregion

    //#region useEffect
    useEffect( ()=>{
        socket = io(ENDPOINT);
    });
    //#endregion

    //#region 버튼 클릭 이벤트
    const handleClickOpen = () => {
        socket.emit("RoomNumber" , {name});
        socket.on("RoomNuber_Result" ,(res)=>{
            setRoomN(res.result);
            setOpen(true);
        });
    };

    const handleClose = () => {
        setOpen(false);
    };
    //#endregion

    //#region 렌더링
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
    //#endregion
}

export default FullScreenDialog;