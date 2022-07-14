//#region react
import React, { useState, useEffect } from 'react';
//#endregion

//#region mui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//#endregion

//#region 라이브러리
import Web3 from 'web3';
import NFTContract from '../../contracts/NFT.json'
//#endregion

//#region 전역변수
let web3;
let NFTinstance;
//#endregion

function Mypage_BuyCard(props) {
    const { cards, username } = props;
    const [accounts, setAccounts] = useState("");

    useEffect(() => {
        async function load() {
            web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
            setAccounts(await web3.eth.getAccounts());
            const networkId = await web3.eth.net.getId();
            const NFTdeployedNetwork = NFTContract.networks[networkId];
            NFTinstance = new web3.eth.Contract(NFTContract.abi, NFTdeployedNetwork.address);
        }
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    async function Tran(card)
    {
        await NFTinstance.methods.safeTransferFrom(accounts[0], card.buyerAddress, card.tokkenId).send({
            from: accounts[0],
            gas: 5000000
        })
        alert("거래 승인 성공")
        window.location.replace("/post-UserMyPage")
    }

    function UserNameCard(card) {
        if (card.sellerName === username) {
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
                                NFTID : {card.tokkenId}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button size="small" onClick={()=>{
                                Tran(card)
                            }}>거래 승인</Button>
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