import React, { useState, useEffect } from "react";

import Box from '@mui/material/Box';

const style = {
    position: 'relative',
    whiteSpace: 'normal',
    overflowY: 'scroll',
    my: 4,
    p: 1,
    maxHeight: '15vh',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    height: '8%',
    width: '40%',
    border: '1px solid #000',
    pt: 2,
    px: 4,
    pb: 3,
};

function BuyLogText(props){

    const {LogText} = props;
    const [ALL_BuyLogText,setBuyLogText] = useState([]);

    useEffect(()=>{
        setBuyLogText(LogText);
    },[LogText]);

    return (
                <Box sx={{ ...style }}>
                    <div>
                    {ALL_BuyLogText.map((ALL_BuyLogText, index) => (
                        <p key={index}>{ALL_BuyLogText}<br></br></p>
                     ))}
                    </div>
                </Box>
    )
}

export default BuyLogText;