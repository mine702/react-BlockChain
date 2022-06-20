import React, {useState, useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ChatIcon from '@mui/icons-material/Chat';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge'
import { TextField } from '@mui/material';
import io from 'socket.io-client';

let socket;

const ENDPOINT = "https://localhost:8080";

function Chat(props) {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const f_name = props.name;
    const t_name = "0번째판매자"
    const [msg, setMessage] = useState("")
    const [chat, setChat] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8080");
    }, [])
    
    async function SendMessage(){ 
            socketRef.current.emit('message', {msg,f_name,t_name});
            console.log(msg);  
            await socketRef.current.on("message_return",  ({msg})  => {
              console.log(msg)
              setChat([...chat, { msg }])
              setMessage({msg : ""})
          })            

    }


    const renderChat = () => {
      return chat.map(({ msg }, index) => (
        <div key={index}>
          <p>
             <span>{f_name} : {msg}</span>
          </p>
        </div>
      ))
  }
  
    const handleClickOpen = () => {
      setOpen(true);
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
        <IconButton onClick={handleClickOpen}>
                <Badge badgeContent={0} color="secondary">
                    <ChatIcon />
                </Badge>
        </IconButton>
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
            <div
          
           >{renderChat()}</div>     
            {/* <TextField
              name='message'
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message">
            </TextField>      */}
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
  

export default Chat;