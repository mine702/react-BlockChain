/* eslint-disable react/jsx-pascal-case */
//#region react
import React from "react";
import { useNavigate } from "react-router-dom";
//#endregion

//#region mui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//#endregion

//#region 하위 컴포넌트
import Notify_Dialog from "./Notify_Dialog";
//#endregion

function Mainpage_Card(props) {

    const navigate = useNavigate();

    // const { cards, user, value } = props;
    const { cards, user} = props;

    

    return (
        <Grid container spacing={4}>
            {cards.map((card) => (
                <Grid item xs={5} sm={6} md={4} key={card._id}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                                // 16:9
                                pt: '0%',
                                minHeight:170,
                                maxHeight:170
                            }}
                            src={card.files}
                            alt="random"
                        />
                        <CardActions>
                            <Box sx={{ flexGrow: 1 }} />                           
                                <Notify_Dialog
                                warningHead={"구매 확인"} 
                                warningButton={`구매`}
                                warning={"정말 구매하시겠습니까?"}  
                                value={[card, user]}
                                ></Notify_Dialog>                           
                            <Button size="small" onClick={() => {
                                navigate("/post-HouseInfoPage", { state: [card, user] });
                            }}>보기</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>)
}

export default Mainpage_Card;