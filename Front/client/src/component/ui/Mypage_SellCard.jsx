/* eslint-disable react/jsx-pascal-case */
//#region react
import React, { useEffect } from 'react';
//#endregion

//#region mui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
//#endregion

//#region component
import io from "socket.io-client";
//#endregion

let socket;

function Mypage_SellCard(props) {

    const ENDPOINT = "http://localhost:8080";

    const navigate = useNavigate();

    const { cards, user } = props;
    
    useEffect(() => {
        socket = io(ENDPOINT);
    },[])

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
}

export default Mypage_SellCard;