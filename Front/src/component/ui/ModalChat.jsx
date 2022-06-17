import React, {useState, useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import io from 'socket.io-client';

let socket;

const ENDPOINT = "https://localhost:8080";

function SendMsg() {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const [message, setMessage] = useState("");
    //const [messages, setMessages] = useState([]);

    
    // useEffect(() => {
    //     socket = io(ENDPOINT);
    //   }, []);

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8080");
        socketRef.current.on("message", ({ message }) => {
            setMessage([...message, { message }])
        })
        return () => socketRef.current.disconnect()
    })
    
    function SendMessage(){ 
        try {
            socketRef.current.emit('Message', {message});
            console.log(message);              
        } catch (error) {
            console.log(error);
        }

    }
  
    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
      setScroll(scrollType);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);
  
    return (
      <div>
        <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
        <Button onClick={handleClickOpen('body')}>scroll=body</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">채팅창</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
            sx={{
                        marginTop: 50,
                        marginRight: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <TextField
              id='standard-basic'
              variant="standard"
              onChange={(e) => setMessage(e.target.value)}
          />
            <Button onClick={SendMessage}>전송하기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  

export default SendMsg;