//#region react
import React, { useEffect } from "react";
//#endregion

//#region mui
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Chatting from "./Chatting"
import ListItemButton from '@mui/material/ListItemButton';
import { Button } from "@mui/material";
//#endregion

//#region socket.io
import io from "socket.io-client";
//#endregion

//#region 전역 변수
let socket;
//#endregion

function RoomList(props) {

    const ENDPOINT = "http://localhost:8080";

    const { value, username } = props;

    //#region uesEffect
    useEffect(() => {
        socket = io(ENDPOINT);
    }, []);
    //#endregion

    //#region 채팅방 검색
    async function RoomSearach(value) {
        socket.emit("Search_Room", { value });  // 채팅방 검색
        await socket.on('Search_Room_Result', (result) => {  //채팅방 검색결과
            if (result.result[0].Buyername === username) {
                socket.emit("GetOutRoom_Buyername", { value, username });
                socket.on('GetOutRoom_Buyername_Result', () => {
                    socket.emit("Search_Room", { value });
                    socket.on('Search_Room_Result', (result) => {
                        if (result.result[0].Sellername === null) {
                            socket.emit("GetOutRoom", { value });
                            socket.on('GetOutRoom_Result', (result) => {
                                alert(result);
                                window.location.replace("/post-MainPage");
                            });
                        }
                        else{
                            alert("삭제완료");
                            window.location.replace("/post-MainPage");
                        }
                    })
                })
            }
            else if (result.result[0].Sellername === username) {
                socket.emit("GetOutRoom_Sellername", { value, username });
                socket.on('GetOutRoom_Sellername_Result', () => {
                    socket.emit("Search_Room", { value });
                    socket.on('Search_Room_Result', (result) => {
                        if (result.result[0].Buyername === null) {
                            socket.emit("GetOutRoom", { value });
                            socket.on('GetOutRoom_Result', (result) => {
                                alert(result);
                                window.location.replace("/post-MainPage");
                            });
                        }
                        else{
                            alert("삭제완료");
                            window.location.replace("/post-MainPage");
                        }
                    })
                })
            }
        })
    }
    //#endregion

    //#region 렌더링
    return (
        <div>
            {value.map((value) => (
                <List key={value.toString()}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary={value} secondary="메세지내용" />
                            <Chatting value={value} buyername={username}></Chatting>
                        </ListItemButton>
                        <Button
                            onClick={() => {
                                RoomSearach(value);
                            }}
                        >OUT</Button>
                    </ListItem>
                    <Divider />
                </List>
            ))}
        </div>
    );
    //#endregion
}

export default RoomList;