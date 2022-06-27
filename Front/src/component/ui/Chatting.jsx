import React, { useState, useEffect } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import LogText from "./LogText"

let socket;

function Chatting(props) {
    const { Sname, Oname } = props;
    const ENDPOINT = "http://localhost:8080";
    const [modalIsOpen, setIsOpen] = useState(false);
    const [roommax] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [sendmsg, setSendMsg] = useState("");
    const [chatlog, setChatlog] = useState([{}]);
    const [RoomNumber, setRoomNumber] = useState();

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

    const roomn = []
    let makeroom = []
    let roomnumber = 0;

    function MakeRoom() {        
        socket.emit("Room_Search");
        socket.on("Room_Search_Result", (Result) => {
            for (let i = 0; i < Result.length; i++) {
                roomn.push(Result[i].RoomN)
            }
            console.log(Result)
            makeroom = roommax.filter(x => !roomn.includes(x))
            if (makeroom.length === 10) {
                roomnumber = makeroom[0]
                setRoomNumber(makeroom[0])
                socket.emit("Room_Make", { Sname, Oname, roomnumber });
                // eslint-disable-next-line no-loop-func
                socket.on("Room_Make_Result", () => {
                    socket.emit("Chatting_Join", { Oname, roomnumber });
                })
            }

            else {
                for (let i = 0; i < Result.length; i++) {
                    if (Result[i].Sname === Sname && Result[i].Oname === Oname) {
                        roomnumber = Result[i].RoomN
                        console.log(roomnumber);
                        setRoomNumber(roomnumber)
                        socket.emit("Chatting_Join", { Oname, roomnumber });
                        break
                    }
                    else if (i === Result.length - 1) {
                        console.log("방이없다")
                        roomnumber = makeroom[0]
                        setRoomNumber(makeroom[0])
                        socket.emit("Room_Make", { Sname, Oname, roomnumber });
                        // eslint-disable-next-line no-loop-func
                        socket.on("Room_Make_Result", () => {
                            socket.emit("Chatting_Join", { Oname, roomnumber });
                        })
                       
                    }
                }
            }
        })
    }

    function SendMessage() {        
        socket.emit("Message_Send", { Oname, sendmsg , RoomNumber});
        socket.on("Mes_return", ({ Oname, sendmsg }) => {
            console.log(sendmsg);
            setChatlog([...chatlog, { name: Oname, msg: sendmsg }]);
            console.log(chatlog);
        })
    }

    return (
        <div>
            <Button  onClick={() => {
                openModal()
                MakeRoom()
            }}>CHATTING</Button>
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
                    onChange={(e) => setSendMsg(e.target.value)}
                />
                <ButtonGroup disableElevation variant="contained">
                    <Button variant="contained" onClick={() => { closeModal() }}>CLOSE</Button>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={() => { SendMessage() }} >SEND</Button>
                </ButtonGroup>
            </Modal>
        </div>
    );
}

export default Chatting;