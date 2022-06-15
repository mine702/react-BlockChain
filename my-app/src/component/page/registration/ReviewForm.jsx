import * as React from 'react';
import Typography from '@mui/material/Typography';
import image from '../../images/다운로드.jpg';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

function Review() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        판매 등록 완료
      </Typography>
      <Grid item xs={12}>
          <Card
            sx={{ height: '10%', display: 'flex', flexDirection: 'column' }}
          >
            <CardMedia
              component="img"
              sx={{
                // 16:9
                pt: '5%',
              }}
              image={image}
              alt="random"
            />
          </Card>
        </Grid> 
    </React.Fragment>
  );
}

export default Review;