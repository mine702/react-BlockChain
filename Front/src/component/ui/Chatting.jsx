import React, { useState, useEffect } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import LogText from "./LogText"

let socket;


function Chatting(props){
    
    const ENDPOINT = "http://localhost:8080";

    const {username} =props;
    const [modalIsOpen, setIsOpen] = useState(false);


    const [sendmsg, setSendMsg] = useState("");
    const [chatlog, setChatlog] = useState([{ }]);




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

    
      


    function SendMessage() {
        const socket_id = socket.id;
        socket.emit("id_send", {socket_id});
        socket.emit("Message_Send", { username, sendmsg});
        socket.on("Message_Receive", ({name, msg})=>{
            console.log(sendmsg);
            setChatlog([...chatlog, {name: name, msg : msg} ]);
            console.log(chatlog);
            //socket.off();
        })
      }

      

    
    return(
        <div>
            <Button variant='contained' onClick={openModal}>채팅</Button>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
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
                    onChange={(e)=>setSendMsg(e.target.value)}
                />
                <ButtonGroup disableElevation variant="contained">
                    <Button  variant="contained" onClick={()=>{closeModal()}}>CLOSE</Button>
                    <Button  variant="contained" endIcon={<SendIcon />} onClick={()=>{SendMessage()}} >SEND</Button>
                </ButtonGroup>
            </Modal>
        </div>
    );
}


export default Chatting;