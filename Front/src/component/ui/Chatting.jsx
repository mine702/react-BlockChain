import React, { useState, useEffect } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";

let socket;
const ENDPOINT = "http://localhost:8080";

function Chatting(props){
    
    const [modalIsOpen, setIsOpen] = useState(false);

    const [msg, setMsg] = useState("");

    // 함수가 실행될때 modal의 상태를 true로 바꿔준다.
    function openModal() {
        setIsOpen(true);
     }

    // 함수가 실행될때 modal의 상태를 false로 바꿔준다.
    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        socket = io(ENDPOINT);
      }, []);
    

    


    return(
        <div>
            <Button variant='contained' onClick={openModal}>채팅</Button>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <TextField
                    id="outlined-multiline-static"
                    label="Log"
                    multiline
                    fullWidth
                    disabled
                    rows={10}
                    />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id="Message"
                    label="Message"
                    name="Message"
                    autoComplete="Message"
                    autoFocus
                    onChange={(e)=>setMsg(e.target.value)}
                />
                <ButtonGroup disableElevation variant="contained">
                    <Button  variant="contained" onClick={()=>{closeModal()}}>CLOSE</Button>
                    <Button  variant="contained" endIcon={<SendIcon />} >SEND</Button>
                </ButtonGroup>
            </Modal>
        </div>
    );
}

export default Chatting;