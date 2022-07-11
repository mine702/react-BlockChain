//#region react
import React, { useEffect } from "react";
import io from "socket.io-client";
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

let socket;

function RoomList(props) {

    const ENDPOINT = "http://localhost:8080";

    const { value, username } = props;

    useEffect(() => {
        socket = io(ENDPOINT);
    }, []);

    async function RoomSerach(value) {
        socket.emit("Search_Room", { value });
        await socket.on('Search_Room_Result', (result) => {
            if (result.result[0].Buyername === username) {
                socket.emit("GetOutRoom_Buyername", { value, username });
                socket.on('GetOutRoom_Buyername_Result', () => {
                    socket.emit("Search_Room", { value });
                    socket.on('Search_Room_Result', (result) => {
                        if (result.result[0].Sellername === null) {
                            socket.emit("GetOutRoom", { value });
                            socket.on('GetOutRoom_Result', (result) => {
                                alert(result)
                                window.location.replace("/post-MainPage")
                            })
                        }
                        else{
                            alert("삭제완료")
                            window.location.replace("/post-MainPage")
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
                                alert(result)
                                window.location.replace("/post-MainPage")
                            })
                        }
                        else{
                            alert("삭제완료")
                            window.location.replace("/post-MainPage")
                        }
                    })
                })
            }
        })
    }
    return (
        <div>
            {value.map((value) => (
                <List key={value.toString()}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary={value} secondary="메세지내용" />
                        </ListItemButton>
                        <Chatting value={value} buyername={username}></Chatting>
                        <Button
                            onClick={() => {
                                RoomSerach(value)
                            }}
                        >OUT</Button>
                    </ListItem>
                    <Divider />
                </List>
            ))}
        </div>
    );
}

export default RoomList;