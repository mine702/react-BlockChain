//#region react
import React from 'react';
//#endregion

//#region mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//#endregion

function Notify_Dialog(props) {
  const { warningHead, warning, warningButton, OkButtonClick } = props
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>{warningButton}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {warningHead}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {warning}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>아니요</Button>
          <Button onClick={()=>{
            OkButtonClick()
            handleClose()
          }} autoFocus>
            네
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Notify_Dialog;