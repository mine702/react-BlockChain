//#region react
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router";
import io from "socket.io-client";
//#endregion

//#region mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import images1 from '../../images/house.jpg'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
//#endregion

//#region 라이브러리
import Web3 from 'web3';
import NFT from "../../../contracts/NFT.json";
//#endregion

//#region 전역 변수
let socket;
let web3;
let NFT_instance;
//#endregion

function HouseInfoExistInsert() {

  const ENDPOINT = "http://localhost:8080";

  const navigate = useNavigate();
  const location = useLocation();

  let number = 0;
  let name = 0;

  //#region uesState 변수
  const [selluserId] = useState(location.state[0].id);
  const [sellusername] = useState(location.state[0].name);
  const [sellusernumber] = useState(location.state[0].number);
  const [sellerMetaAddress] = useState(location.state[0].MetaMaskAcc);

  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [agree, setAgree] = useState(false);
  const [price, setPrice] = useState("");
  const [PinataImage, setPinataImage] = useState(images1);

  const [res, setRes] = useState()
  const [tokenvalues, setTokenValues] = useState([])
  //#endregion

  //#region useEffect
  useEffect(() => {
    socket = io(ENDPOINT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    number = location.state[0].number;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    name = location.state[0].name;
  }, [ENDPOINT]);

  useEffect(() => {
    async function load() {
      web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      const networkId = await web3.eth.net.getId();
      const NFTNetwork = NFT.networks[networkId];
      NFT_instance = new web3.eth.Contract(NFT.abi, NFTNetwork.address);
    }
    load();
  }, []);

  useEffect(() => {
    socket.emit("MyToken", { name, number });
    socket.on("MyToken_Result", (Result) => {
      setTokenValues(Result)
    })
  }, [number, name]);
  //#endregion

  //#region 매물등록
  async function House_register() {
    if (agree === false) {
      alert("개인정보 동의를 하세요");
    }
    else if (area === "" || address === "") {
      alert("입력하지 않은 정보가 있습니다");
    }
    else {
      try {
        socket.emit("House_Register", { area, address, price, PinataImage, selluserId, sellusername, sellusernumber, sellerMetaAddress, res });
        socket.on("House_Register_Result", () => {
          alert("등록 완료!");
          navigate("/post-MainPage", { state: location.state });
        })
      }
      catch (e) {
        alert(e.message)
        navigate("/post-MainPage", { state: location.state });
      }
    }
  }
  //#endregion

  //#region 동의여부
  function CheckBoxBool() {
    if (agree === false) {
      setAgree(true);
    }
    else if (agree === true) {
      setAgree(false);
    }
  }
  //#endregion
  let json;
  async function TokenInfo(value) {
    const Result = await NFT_instance.methods.tokenURI(value.tokenId).call()
    let temp = Result.split('ipfs://');    
    const data = await fetch(`http://ipfs.io/ipfs/${temp[1]}`)
    json = await data.json()
    console.log(json)
    setArea(json.keyvalues.Area)
    setAddress(json.keyvalues.Address)
    setPrice(json.keyvalues.Price)
    let imgpro = json.img.split('ipfs://');
    setPinataImage(`https://gateway.pinata.cloud/ipfs/${imgpro[1]}`)
    setRes(value.tokenId)
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          판매 등록
        </Typography>
        <br />
        <React.Fragment>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              보유 토큰
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup>
                    <Grid>
                      {tokenvalues.map((value) => (
                        <Grid item key={value._id}>
                          <FormControlLabel value={value.tokenId} control={<Radio onClick=
                            {() => {
                              TokenInfo(value)
                            }}
                          />} label={"TokenId: " + value.tokenId} />
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">지역</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="locationv"
                      value={area}
                    >
                      <MenuItem value={"대전"}>대전</MenuItem>
                      <MenuItem value={"서울"}>서울</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="houseAddress"
                  label="집주소"
                  fullWidth
                  variant="standard"
                  value={address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="houseprice"
                  fullWidth
                  label="가격"
                  variant="standard"
                  value={price}
                />
              </Grid>
              <Grid item xs={12}>
                <Card
                  sx={{ height: '100%', display: 'flex' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '5%',
                    }}
                    image={PinataImage}
                    alt="random"
                  />
                </Card>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" onClick={CheckBoxBool} />}
                  label="판매 게시글에 올리시겠습니까?"
                />
              </Grid>
            </Grid>
          </React.Fragment>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={House_register}
            >등록
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={()=>{
                navigate("/post-MainPage", { state: location.state });
              }}
            >취소
            </Button>
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
  //#endregion
}

export default HouseInfoExistInsert;