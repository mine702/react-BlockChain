//#region react
import React from 'react';
//#endregion

//#region mui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
//#endregion

function Mypage_BuyCard(props) {
    const { cards, username } = props;

    function UserNameCard(card) {
        if (card.buyerName === username) {
            return (
                <Grid item xs={5} sm={6} md={2.9} key={card.houseAddress}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                                // 16:9
                                pt: '0%',
                                maxWidth: 250,
                                minWidth: 250,
                                minHeight: 150,
                                maxHeight: 150
                            }}
                            src={card.sellerImg}
                            alt="random"
                        />
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                주소 : {card.houseAddress}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                가격 : {card.housePrice}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                구매자 : {card.buyerName}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                판매자 : {card.sellerName}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                NFTID : {card.tokenId}
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
            )
        }
    }
    //#region 렌더링
    return (
        <Grid container spacing={4}>
            {cards.map((card) => (
                UserNameCard(card)
            ))}
        </Grid>)
    //#endregion
}

export default Mypage_BuyCard;