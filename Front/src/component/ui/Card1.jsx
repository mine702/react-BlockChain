import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import images1 from '../images/house.jpg';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function Card1(props) {
    const { cards } = props;
    return (
        <Grid container spacing={4}>
            { cards.map((card) => (
                <Grid  item xs={5} sm={6} md={4} key={card._id}>
                    <Card 
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardMedia
                           
                            component="img"
                            sx={{
                                // 16:9
                                pt: '0%',
                            }}
                            src={card.files}
                            alt="random"
                        />
                        
                        <CardActions>
                            <Button size="small">보기</Button>
                            <Button size="small">저장</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>)
}

export default Card1;