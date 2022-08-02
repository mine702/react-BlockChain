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
    overflow:'scroll',
};

let socket;

function Chatting(props) {

    const ENDPOINT = "http://localhost:8080";

    const { value, buyername } = props

    const [modalIsOpen, setIsOpen] = useState(false);
    const [chatlog, setChatlog] = useState([{}]);
    const [sendmsg, setSendMsg] = useState("");
    const [RoomNumber] = useState(value);

    let roomnumber = 0;

    // 함수가 실행될때 modal의 상태를 true로 바꿔준다.
    function openModal() {
        roomnumber = RoomNumber;
        socket.emit("Chatting_Join", { roomnumber });
        socket.on('Join_return', ({ roomnumber }) => {
            console.log(`${roomnumber}번에 참가하였습니다.`);
        });
        socket.emit("Load_Msg_Chat", { RoomNumber });
        socket.on('Return_Load_Msg_Chat', ({ result }) => {
            setChatlog(result);
        })
        setIsOpen(true);
    }

    // 함수가 실행될때 modal의 상태를 false로 바꿔준다.
    function closeModal() {
        setIsOpen(false);
        // setChatlog([...chatlog] , {});
    }


    useEffect(() => {
        socket = io(ENDPOINT);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on("Msg_return", ({ buyername, sendmsg }) => {
            console.log("채팅 전송 완료");
            setChatlog([...chatlog, { name: buyername, msg: sendmsg }]);
        })
        if (chatlog.length !== 0 && chatlog.length !== 1) {
            socket.emit("Save_Msg", ({ chatlog, RoomNumber }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatlog]);

    function SendMessage() {
        socket.emit("Message_Send", { buyername, sendmsg, RoomNumber });
        setSendMsg(" ");
    }

    function OnkeyPress (e){
        if(e.key === 'Enter'){
            SendMessage();
        }
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
                        value={sendmsg}
                        onChange={(e) => setSendMsg(e.target.value)}
                        onKeyUp={OnkeyPress}
                    />
                    <ButtonGroup disableElevation variant="contained">
                        <Button variant="contained" onClick={() => { closeModal() }}>CLOSE</Button>
                        <Button variant="contained" endIcon={<SendIcon />} onClick={SendMessage} >SEND</Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default Chatting;