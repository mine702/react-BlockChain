import React from "react";
import Box from '@mui/material/Box';
import { useEffect } from "react";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    height: '8%',
    width: '35%',
    border: '1px solid #000',
    pt: 2,
    px: 4,
    pb: 3,
};

function BuyLogText(props){

    const {LogText} = props;

    useEffect(()=>{
    },[]);

    return (
                <Box sx={{ ...style }}>
                    <div>
                        {LogText}
                    </div>
                </Box>
    )
}

export default BuyLogText;