//#region react
import React, { useState, useEffect } from 'react';
//#endregion

//#region mui
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import LogText from "./LogText"
import Box from '@mui/material/Box';
//#endregion

//#region CSS Style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    height: '80%',
    width: '40%',
    border: '2px solid #000',
    pt: 2,
    px: 4,
    pb: 3,
};
//#endregion

//#region 전역 변수
let socket;
//#endregion


function Chatting(props) {

    const ENDPOINT = "http://localhost:8080";

    const { value , buyer_name } = props;

    //#region useState
    const [modalIsOpen, setIsOpen] = useState(false);
    const [chat_log, set_Chatlog] = useState([{}]);
    const [send_msg, set_SendMsg] = useState("");
    const [Room_Number] = useState(value); 
    //#endregion
   
    let room_number = 0;
    
    //#region 함수가 실행될때 modal의 상태를 true로 바꿔준다.
    function openModal() {
        room_number=Room_Number;
        socket.emit("Chatting_Join",{room_number});
        socket.on('Join_return',({room_number})=>{
            console.log("성공");
        })
        socket.emit("Load_Msg_Chat",{Room_Number});
        socket.on('Return_Load_Msg_Chat',({result})=> {
            set_Chatlog(result);
        })
        setIsOpen(true);
        
    }
    //#endregion

    //#region 함수가 실행될때 modal의 상태를 false로 바꿔준다. 
    function closeModal() {
        setIsOpen(false);
    }
    //#endregion

    //#region useEffect
    useEffect(() => {
        socket = io(ENDPOINT);        
    }, [ENDPOINT]);

    useEffect(()=>{
        
        socket.on("Msg_return", ({ buyer_name, send_msg }) => {
            console.log("신호");
            set_Chatlog([...chat_log, { name: buyer_name, msg: send_msg }]);
        })
        if(chat_log.length !== 0 && chat_log.length !== 1) {
            socket.emit("Save_Msg",({chat_log, Room_Number}));
        }
    },[chat_log]);
    //#endregion

    //#region 메세지 전달 함수
    function SendMessage() {
        
        socket.emit("Message_Send", { buyer_name, send_msg, Room_Number });        
    }
    //#endregion

    //#region 렌더링
    return (
        <React.Fragment>
            <Button onClick={openModal}>Chatting</Button>
            <Modal
                hideBackdrop
                open={modalIsOpen}
                onClose={closeModal}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <LogText log={chat_log} ></LogText>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id="Message"
                        label="Message"
                        name="Message"
                        autoComplete="Message"
                        autoFocus
                        onChange={(e) => set_SendMsg(e.target.value)}
                    />
                    <ButtonGroup disableElevation variant="contained">
                        <Button variant="contained" onClick={() => { closeModal() }}>CLOSE</Button>
                        <Button variant="contained" endIcon={<SendIcon />} onClick={() => { SendMessage() }} >SEND</Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        </React.Fragment>
    );
    //#endregion
}

export default Chatting;