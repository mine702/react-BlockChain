import * as React from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Chatting1 from "./Chatting1"
import ListItemButton from '@mui/material/ListItemButton';

function ListText1(props) {
    const { value, username } = props;
    return (
        <div>
            {value.map((value) => (
                <List key={value.toString()}>
                    <ListItem disablePadding>
                        <ListItemButton>                        
                            <ListItemText primary={value} secondary="메세지내용" />
                        </ListItemButton>
                        <Chatting1 value={value} Oname={username}></Chatting1>
                    </ListItem>
                    <Divider />
                </List>
            ))}
        </div>
    );

}

export default ListText1;