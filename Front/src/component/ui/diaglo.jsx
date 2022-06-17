// import * as React from 'react';
// import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';
// import Badge from '@mui/material/Badge'
// import MailIcon from '@mui/icons-material/Mail';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

// function FullScreenDialog(props) {
//     const [open, setOpen] = React.useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div>
//             <IconButton onClick={handleClickOpen}>
//                 <Badge badgeContent={4} color="secondary">
//                     <MailIcon />
//                 </Badge>
//             </IconButton>
//             <Dialog
//                 fullScreen
//                 open={open}
//                 onClose={handleClose}
//                 TransitionComponent={Transition}
//             >
//                 <AppBar sx={{ position: 'relative' }}>
//                     <Toolbar>
//                         <IconButton
//                             edge="start"
//                             color="inherit"
//                             onClick={handleClose}
//                             aria-label="close"
//                         >
//                             <CloseIcon />
//                         </IconButton>
//                         <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//                             Message
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
//                 <List>
//                     <ListItem button>
//                         <ListItemText primary="민건" secondary="ㅎㅇ" />
//                     </ListItem>
//                     <Divider />
//                     <ListItem button>
//                         <ListItemText primary="망건" secondary="ㅎㅇ" />
//                     </ListItem>
//                 </List>
//             </Dialog>
//         </div>
//     );
// }

// export default FullScreenDialog;

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

    
    const [msg, setMessage] = useState("")
    const [chat, setChat] = useState([]);
    //const [messages, setMessages] = useState([]);

    
    // useEffect(() => {
    //     socket = io(ENDPOINT);
    //   }, []);

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8080");
        
        //return () => socketRef.current.disconnect()
    }, [])
    
    async function SendMessage(){ 

            socketRef.current.emit('message', {msg});
            console.log(msg);  
            await socketRef.current.on("message_return",  ({msg})  => {
              console.log(msg)
              setChat([...chat, { msg }])
          })            

    }

    // const onTextChange = (e) => {
    //   setState({ ...state, [e.target.name]: e.target.value })
    // }

  //   const onMessageSubmit = (e) => {
  //     const { msg } = state
  //     socketRef.current.emit("message", {  msg })
  //     e.preventDefault()
  //     setState({ message: ""})
  //  }


    const renderChat = () => {
      return chat.map(({ msg }, index) => (
        <div key={index}>
          <h3>
             <span>{msg}</span>
          </h3>
        </div>
      ))
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
  

export default SendMsg;