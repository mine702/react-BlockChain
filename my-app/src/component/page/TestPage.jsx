import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import images1 from '../images/house.jpg';

function MyPage() {
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
    <main className="container">
      <div className="preview">
        <Grid container spacing={4}>
          <Grid xs={12} sm={6} md={4}>
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
        </Grid>
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
      </div>
    </main>
  );
}
export default MyPage;