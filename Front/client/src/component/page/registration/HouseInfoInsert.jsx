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

let socket;

function HouseInfo_insert() {

  const ENDPOINT = "http://localhost:8080";

  const navigate = useNavigate();
  const location = useLocation();

  //#region 이미지 인코딩
  const [files, setFiles] = useState(images1);
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

  const [selluserId] = useState(location.state[0].id)
  const [sellusername] = useState(location.state[0].name)
  const [sellusernumber] = useState(location.state[0].number)
  const [sellerMetaAddress]=useState(location.state[0].MetaMaskAcc);
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [agree, setAgree] = useState(false);
  const [price, setPrice] = useState();
  console.log(location.state[0])
  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);


  function House_register() {

    if (agree === false) {
      alert("개인정보 동의를 하세요");
    }
    else if (area === "" || address === "") {
      alert("입력하지 않은 정보가 있습니다");
    }
    else {
      socket.emit("House_Register", { area, address, price, files, selluserId, sellusername, sellusernumber, sellerMetaAddress });
      socket.on("House_Register_Result", (CheckMsg) => {
        alert(CheckMsg);
        navigate("/post-MainPage", { state: location.state });
      })
    }
  }

  function CheckBoxBool() {
    if (agree === false) {
      setAgree(true);
    }
    else if (agree === true) {
      setAgree(false);
    }
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
                    onChange={(e) => encodeFileToBase64(e.target.files[0])}
                  />
                </Button>
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
}

export default HouseInfo_insert;