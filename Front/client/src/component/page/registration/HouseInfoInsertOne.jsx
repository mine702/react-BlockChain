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
//#endregion

//#region 라이브러리
import axios from 'axios';
import FormData from 'form-data';
import Web3 from 'web3';
//#endregion

import NFT from "../../../contracts/NFT.json";

//#region 전역 변수
let socket;
let NFT_Hash;
let web3;
let NFT_instance;
let PinataImage;
//#endregion

function HouseInfoInsertOne() {

  const ENDPOINT = "http://localhost:8080";

  const navigate = useNavigate();
  const location = useLocation();

  //#region uesState 변수
  const [selluserId] = useState(location.state[0].id);
  const [sellusername] = useState(location.state[0].name);
  const [sellusernumber] = useState(location.state[0].number);
  const [sellerMetaAddress] = useState(location.state[0].MetaMaskAcc);

  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [agree, setAgree] = useState(false);
  const [price, setPrice] = useState();
  const [files, setFiles] = useState(images1);

  const [file, setFile] = useState();
  const [accounts, setAccounts] = useState("");
  const [AddrCheck, setAddrCheck] = useState(false);
  const PinataAPIKey = "a1d2edb7b927ab31fb99";
  const PinataAPISecret = "46ccb00b675745ec0cb7e87e77e3e32e9a7264de2796fad077cf3e527bb3c116";
  //#endregion

  //#region useEffect
  useEffect(() => {
    async function load() {
      web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      setAccounts(await web3.eth.getAccounts());

      const networkId = await web3.eth.net.getId();
      const NFTNetwork = NFT.networks[networkId];

      NFT_instance = new web3.eth.Contract(NFT.abi, NFTNetwork.address);
      console.log(NFT_instance);
    }

    load();
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);
  //#endregion

  //#region 이미지 업로드
  const handleFile = async (fileToHandle) => {
    if (AddrCheck === true) {

      console.log('starting');

      const formData = new FormData();
      formData.append("file", fileToHandle);

      const filename = fileToHandle.name;      //파일 이름.확장자
      const filenameStr = filename.split('.'); //파일이름

      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS` //파일 올리는 URL

      const response = await axios.post(
        url,
        formData,
        {
          maxContentLength: "Infinity",
          headers: {
            'Content-Type': `multipart/form-data;boundary=${formData._boundary}`,
            'pinata_api_key': PinataAPIKey,
            'pinata_secret_api_key': PinataAPISecret,
          }
        }

      );
      console.log(response);
      Make_Json(filenameStr[0], response.data.IpfsHash); //response.data.IpfsHash : 매물 해시값
      PinataImage = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
    }
  }
  //#endregion

  //#region 제이슨 파일 업로드
  const Make_Json = async (filenameStr, img_cid) => {

    //#region JSON 변환
    var data = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1
      },
      "pinataMetadata": {
        "name": `${filenameStr}.json`,
        "Address": "우송대학교",
        "Price": "1",
        "keyvalues": {
          "customKey": "customValue",
          "customKey2": "customValue2"
        }
      },
      "pinataContent": {
        "img": `ipfs://${img_cid}`,
        "description": filenameStr,
      }
    });
    //#endregion

    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',  //JSON 올리는 URL
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': PinataAPIKey,
        'pinata_secret_api_key': PinataAPISecret,
      },
      data: data
    };

    const res = await axios(config);

    console.log(res.data);
    NFT_Hash = res.data.IpfsHash;  //JSON 해쉬 값
  }
  //#endregion

  //#region 이미지 인코딩
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setFiles(reader.result);
        resolve();
      };
    });
  };
  //#endregion

  //#region 매물등록
  async function House_register() {

    if (agree === false) {
      alert("개인정보 동의를 하세요");
    }
    else if (area === "" || address === "") {
      alert("입력하지 않은 정보가 있습니다");
    }
    else if (NFT_Hash === undefined || NFT_Hash === null || NFT_Hash === "") {
      alert("잠시만 기다려주세요")
    }
    else {
      try {
        const resl = await NFT_instance.methods.mintNFT(accounts[0], `ipfs://${NFT_Hash}`).send({
          from: accounts[0],
          gas: 900000
        });
        const res = resl.events.Transfer.returnValues.tokenId
        socket.emit("House_Register", { area, address, price, PinataImage, selluserId, sellusername, sellusernumber, sellerMetaAddress, res });
        socket.on("House_Register_Result", () => {
          socket.emit("Token_Add", { sellusername, sellusernumber, res });
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

  function CheckAddress() {
    socket.emit('CheckAddr', { address });
    socket.on('AddrCheck_result', (res) => {
      if (res.result === true) {
        alert("중복된 주소입니다.");
        setAddrCheck(false);
      }
      else {
        alert("사용 가능한 주소입니다.");
        setAddrCheck(true);
      }
    })

  }

  //#region 렌더링
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
              집 정보 등록
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">지역</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="locationv"
                      value={area}
                      onChange={(e) =>
                        setArea(e.target.value)
                      }
                    >
                      <MenuItem value={"대전"}>대전</MenuItem>
                      <MenuItem value={"서울"}>서울</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="houseAddress"
                  label="집주소"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={CheckAddress}>중복체크</Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="houseprice"
                  label="가격 (ETH)"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
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
                    image={files}
                    alt="random"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  component="label"
                >
                  사진올리기
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      encodeFileToBase64(e.target.files[0])
                      setFile(e.target.files[0])
                    }}
                  />
                </Button>&nbsp;
                {/* <input type="file" onChange={(event)=>setFile(event.target.files[0])}/> */}
                <Button variant="contained" onClick={() => handleFile(file)}>IPFS등록</Button>
                {/* {
                  //  render the hash
                  myipfsHash.length > 0 && <img height='200' src={`https://gateway.pinata.cloud/ipfs/${myipfsHash}`} alt='not loading'/>
                } */}
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
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
  //#endregion
}

export default HouseInfoInsertOne;