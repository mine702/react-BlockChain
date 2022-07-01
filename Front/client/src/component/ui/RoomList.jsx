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
                                socket.emit("GetOutRoom", { value });
                                socket.on('GetOutRoom_Result', (result) => {
                                    alert(result)
                                    window.location.replace("/post-MainPage")   
                                })
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