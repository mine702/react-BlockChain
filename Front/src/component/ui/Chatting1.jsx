import React, { useState, useEffect } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import LogText from "./LogText"
import Box from '@mui/material/Box';

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

let socket;

function Chatting1(props) {
    const { value , Oname } = props
    const ENDPOINT = "http://localhost:8080";
    const [modalIsOpen, setIsOpen] = useState(false);
    const [chatlog, setChatlog] = useState([{}]);
    const [sendmsg, setSendMsg] = useState("");
    const [RoomNumber] = useState(value); 

    // 함수가 실행될때 modal의 상태를 true로 바꿔준다.
    function openModal() {
        socket.emit("Chatting_Join",{RoomNumber});
        socket.on('Join_return',({RoomNumber})=>{
            console.log("성공");
        })
        socket.emit("Load_Msg",{RoomNumber});
        socket.on('Return_Load_Msg',({result})=> {
            setChatlog(result);
        //setChatlog([...chatlog, { name: Oname, msg: sendmsg }]);
        })
        setIsOpen(true);
    }

    // 함수가 실행될때 modal의 상태를 false로 바꿔준다.
    function closeModal() {
        socket.emit("Save_Msg",({chatlog,RoomNumber}));
        setIsOpen(false);
    }

    useEffect(() => {
        socket = io(ENDPOINT);        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ENDPOINT]);

    useEffect(()=>{
        socket.on("Mes_return", ({ Oname, sendmsg }) => {
            console.log('on확인');
            console.log(sendmsg);
            setChatlog([...chatlog, { name: Oname, msg: sendmsg }]);
            socket.off();
        })
    },[chatlog]);

    function SendMessage() {
        socket.emit("Message_Send", { Oname, sendmsg, RoomNumber });        
    }

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
                    <LogText log={chatlog} ></LogText>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id="Message"
                        label="Message"
                        name="Message"
                        autoComplete="Message"
                        autoFocus
                        onChange={(e) => setSendMsg(e.target.value)}
                    />
                    <ButtonGroup disableElevation variant="contained">
                        <Button variant="contained" onClick={() => { closeModal() }}>CLOSE</Button>
                        <Button variant="contained" endIcon={<SendIcon />} onClick={() => { SendMessage() }} >SEND</Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default Chatting1;