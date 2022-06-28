import React, { useEffect } from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Chatting1 from "./Chatting1"
import ListItemButton from '@mui/material/ListItemButton';
import { Button } from "@mui/material";
import io from "socket.io-client";

let socket;

function ListText1(props) {
    const { value, username } = props;
    const ENDPOINT = "http://localhost:8080";

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
                        <Chatting1 value={value} Oname={username}></Chatting1>
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

export default ListText1;