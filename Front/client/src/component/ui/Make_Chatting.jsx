//#region react
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import io from "socket.io-client";
import LogText from "./LogText"
//#endregion 

//#region mui
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
//#endregion 

let socket;

function MakeChatting(props) {

    const ENDPOINT = "http://localhost:8080";

    const { sellername, buyername } = props;

    const [modalIsOpen, setIsOpen] = useState(false);
    const [roommax] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [sendmsg, setSendMsg] = useState("");
    const [chatlog, setChatlog] = useState([{}]);
    const [RoomNumber, setRoomNumber] = useState();

    // 함수가 실행될때 modal의 상태를 true로 바꿔준다.
    function openModal() {
        if (sellername === buyername) {
            alert("본인의 매물을 구매할 수 없습니다.")
        }
        else {
            setIsOpen(true);
            MakeRoom()
        }
    }

    // 함수가 실행될때 modal의 상태를 false로 바꿔준다.
    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        socket = io(ENDPOINT);
    }, []);

    useEffect(() => {
        socket.on("Msg_return", ({ buyername, sendmsg }) => {
            setChatlog([...chatlog, { name: buyername, msg: sendmsg }]);
        })
        if(chatlog.length !== 0 && chatlog.length !== 1)
        {
            socket.emit("Save_Msg",({chatlog, RoomNumber}));
        }
    }, [chatlog])

    const roomn = []
    let makeroom = []
    let roomnumber = 0;

    function MakeRoom() {
        socket.emit("Room_Search");
        socket.on("Room_Search_Result", (result) => {

            for (let i = 0; i < result.length; i++) {
                roomn.push(result[i].RoomN)
            }
            console.log(`res: ${result}`);
            makeroom = roommax.filter(x => !roomn.includes(x))
            if (makeroom.length === 10) {  //방이 없을때
                roomnumber = makeroom[0]
                setRoomNumber(makeroom[0])
                console.log(RoomNumber);
                socket.emit("Room_Make", { sellername, buyername, roomnumber });
                // eslint-disable-next-line no-loop-func
                socket.on("Room_Make_Result", () => {
                    socket.emit("Chatting_Join", { roomnumber });
                })
            }
            else {  //방이 있을때                
                for (let i = 0; i < result.length; i++) {
                    if (result[i].Sellername === sellername && result[i].Buyername === buyername) {
                        roomnumber = result[i].RoomN   
                        console.log(result[i].Msg)                     
                        console.log(roomnumber);
                        setRoomNumber(roomnumber)                        
                        socket.emit("Chatting_Join", { roomnumber });
                        setChatlog(result[i].Msg)
                        socket.emit("Load_Msg_Makechat", { roomnumber });
                        socket.on('Return_Load_Msg_Makechat', ({ result }) => {
                            setChatlog(result);
                            //console.log(result)
                            //setChatlog([...chatlog, { name: Oname, msg: sendmsg }]);
                        })
                        break
                    }
                    else if (i === result.length - 1) {
                        console.log("방이없다")
                        roomnumber = makeroom[0]
                        setRoomNumber(makeroom[0])
                        socket.emit("Room_Make", { sellername, buyername, roomnumber });
                        // eslint-disable-next-line no-loop-func
                        socket.on("Room_Make_Result", () => {
                            socket.emit("Chatting_Join", { roomnumber });
                        })
                    }
                }
            }
        })
    }

    function SendMessage() {
        socket.emit("Message_Send", { buyername, sendmsg, RoomNumber });
    }

    return (
        <div>
            <Button onClick={() => {
                openModal()
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

export default MakeChatting;