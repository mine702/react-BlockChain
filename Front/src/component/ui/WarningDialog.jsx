import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function WarningDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>Buy</Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {"구매 확인"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말 구매 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>아니요</Button>
          <Button onClick={handleClose} autoFocus>
            네
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default WarningDialog;