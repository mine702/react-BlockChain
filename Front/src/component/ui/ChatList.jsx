
import * as React from "react"
import Chat from '../ui/Chat';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import io from "socket.io-client"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ChatList(props) {
    // 메시지
    const [ state, setState ] = React.useState({ message: "", name: "" })
   const [ chat, setChat ] = React.useState([])

   const [msg, setMessage] = React.useState("");
   const socketRef = React.useRef()

    React.useEffect(
      () => {
         socketRef.current = io.connect("http://localhost:8080")
         socketRef.current.on("message", ({ name, message }) => {
            setChat([ ...chat, { name, message } ])
         })
         return () => socketRef.current.disconnect()
      },
      [ chat ]                                                     
   )

    const onTextChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value })
   }

   const onMessageSubmit = (e) => {
      const { name, message } = state
      socketRef.current.emit("message", { name, message })
      e.preventDefault()
      setState({ message: "", name })
   }

    const renderChat = () => {
      return chat.map(({ name, message }, index) => (
         <div key={index}>
            <h3>
               <span>{message}</span>
            </h3>
         </div>
      ))
   }

    const [open, setOpen] = React.useState(false);

    // 메시지창 오픈
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // 두번째 메시지창 오픈

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
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
                <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Message
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                        <Chat></Chat>
                        <ListItemText primary="민건" secondary="ㅎㅇ" onClick={handleClickOpen1}></ListItemText>
                        <Dialog open={open1} onClose={handleClose1} PaperProps={{ sx: { width: "50%", height: "100%" } }}>
                        </Dialog>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="망건" secondary="ㅎㅇ" />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

export default ChatList;