//#region 상위 컴포넌트
import React, {useState, useEffect} from "react";
//#endregion

//#region mui
import Box from '@mui/material/Box';
//#endregion

//#region CSS Style
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
//#endregion

function BuyLogText(props){

    const {LogText} = props;

    //#region React Hook
    const [ALL_BuyLogText,set_BuyLogText] = useState([]);

    useEffect(()=>{
        set_BuyLogText(LogText);
    },[LogText]);
    //#endregion

    //#region 렌더링
    return (
                <Box sx={{ ...style }}>
                    <div>
                    {LogText.map((ALL_BuyLogText, index) => (
                        <p key={index}>{ALL_BuyLogText}<br></br></p>
                     ))}
                    </div>
                </Box>
    )
    //#endregion
}

export default BuyLogText;