import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import images1 from '../../images/house.jpg';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

function OrderForm() {
  const [imageSrc, setImageSrc] = useState(images1);
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
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
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardMedia
              component="img"
              sx={{
                // 16:9
                pt: '0%',
              }}
              image={imageSrc}
              alt="random"
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
          >
            사진 올리기
            <input
              type="file"
              hidden
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
            />
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default OrderForm;