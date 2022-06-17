import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router";

function Card1(props) {
    const navigate = useNavigate();
    const { cards , imagesrc} = props;
    return (
        <Grid container spacing={4}>
            {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                                // 16:9
                                pt: '0%',
                            }}
                            image={imagesrc}
                            alt="random"
                        />
                        <CardActions>
                        <Box sx={{ flexGrow: 1 }} /> 
                            <Button size="small" onClick={()=>{
                                navigate("/")
                            }}>보기</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>)
}

export default Card1;