import * as React from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

function ListText_1(props){
    const arr = props.value;

    const list_Item = arr.map((roomNum , idx)=>{
        <div>
            <ListItem button>
                <ListItemText primary={roomNum} secondary="메세지내용"/>
            </ListItem>
            <Divider/> 
        </div>
    });

    return (
        {list_Item}
    );
}

export default ListText_1;