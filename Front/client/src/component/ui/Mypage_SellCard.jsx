//#region react
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//#endregion

//#region mui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
//#endregion

//#region socket.io
import io from "socket.io-client";
//#endregion

//#region 전역 변수
let socket;
//#endregion

function Mypage_SellCard(props) {

    const ENDPOINT = "http://localhost:8080";

    const navigate = useNavigate();

    const { cards, user } = props;
    //#region useEffect
    useEffect(() => {
        socket = io(ENDPOINT);
    },[])
    //#endregion

    //#region 렌더링
    return (
        <Grid container spacing={4}>
            {cards.map((card) => (
                <Grid item xs={5} sm={6} md={2.9} key={card._id}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardMedia
                        component="img"
                        sx={{
                            // 16:9
                            pt: '0%',
                            maxWidth: 250,
                            minWidth:250,
                            minHeight: 150,
                            maxHeight: 150
                        }}
                        src={card.files}
                        alt="random"
                    />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            Location : {card.location}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            Price : {card.price}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            NFTID : {card.tokkenId}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button size="small" onClick={() => {
                            navigate("/post-CorrectionForm", { state: [card, user[0]] })
                        }}>정보 수정</Button>
                        <Button size="small" onClick={() => {
                            socket.emit("Delete_Data", { card });
                            socket.on("Delete_Data_Result", (Result) => {
                                alert(Result);
                                socket.off(); 
                                window.location.replace("/post-UserMyPage")                             
                            })
                        }}>삭제</Button>
                    </CardActions>
                </Card>
            </Grid> 
            ))}
        </Grid>)
    //#endregion
}

export default Mypage_SellCard;