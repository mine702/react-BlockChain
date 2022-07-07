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

function Mypage_BuyCard(props) {

    const ENDPOINT = "http://localhost:8080";

    const navigate = useNavigate();

    const { details } = props;
    
    useEffect(() => {
        socket = io(ENDPOINT);
        console.log(details);
    },[]) 

    return (
        <Grid container spacing={4}>
            {details.map((detail) => (
                <Grid item xs={5} sm={6} md={2.9} key={detail.address}>
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
                            src={detail.img}
                            alt="random"
                        />
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                주소 : {detail.address}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                가격 : {detail.price}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                구매자 : {detail.buyer}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                판매자 : {detail.seller}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box sx={{ flexGrow: 1 }} />
                            {/* <Button size="small" onClick={() => {
                                console.log(user);
                                console.log(card);
                                navigate("/post-HouseInfoPage", { state: [card, user] });
                            }}>보기</Button> */}
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>)
}

export default Mypage_BuyCard;