import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import images1 from '../images/house.jpg';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chat from "../ui/Chat";


function Card1(props) {
    const { cards } = props;
    const name = props.name;
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
                            image={images1}
                            alt="random"
                        />
                        <CardActions>
                            <Button size="small">보기</Button>
                            <IconButton><Chat name = {name}></Chat></IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>)
}

export default Card1;