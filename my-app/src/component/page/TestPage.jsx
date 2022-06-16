import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        대화창 열기
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: "50%", height: "100%" } }}>
        <DialogTitle>대화창</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <TextField
              multiline={true}
              rows={24}
              fullWidth
              disabled
            ></TextField>
          </DialogContentText>
        
        <TextField
            autoFocus
            id="messagetextbox"
            label="메시지 입력"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button>보내기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
