import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CheckOutForm() {
  return (    
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            판매 등록
          </Typography>
          <br/>          
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
                    <Grid item xs={12} md={6}>
                      <input type="file" />
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
                    onClick={()=>{

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