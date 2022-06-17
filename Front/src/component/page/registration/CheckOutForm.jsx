import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, useLocation } from "react-router";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import images1 from '../../images/house.jpg'

function CheckOutForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [files,setFiles]=useState(images1);
  
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
                <TextField
                  required
                  id="houseAddress"
                  label="집주소"
                  fullWidth
                  variant="standard"
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
                    onChange={(e)=>encodeFileToBase64(e.target.files[0])}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="판매 게시글에 올리시겠습니까?"
                />
              </Grid>
            </Grid>
          </React.Fragment>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={() => {
                alert("등록 완료!!");
                navigate("/post-MainPage", { state: location.state })
              }}
            >등록
            </Button>
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
}

export default CheckOutForm;