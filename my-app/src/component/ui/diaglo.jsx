import React, { useEffect, useRef, useState } from "react"
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

function FullScreenDialog(props) {
    // 메시지
    const [state, setState] = useState({ message: "", name: "망건" })
    const [chat, setChat] = useState([])

    const socketRef = useRef()

    useEffect(
        () => {
            console.log("안녕하세요");
            socketRef.current = io.connect("http://localhost:4000")
            socketRef.current.on("message", ({ name, message }) => {
                setChat([...chat, { name, message }])
            })
            return () => socketRef.current.disconnect()
        },
        [chat]
    )

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onMessageSubmit = () => {
        const { name, message } = state
        socketRef.current.emit("message", { name, message })
        setState({ message: "", name })
    }

    const renderChat = () => {
        return chat.map(({ name, message }, index) => (
            console.log({ message })

        ))
    }

    // 메시지창 오픈

    const [open, setOpen] = React.useState(false);

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
                    <ListItem button>
                        <ListItemText primary="민건" secondary="ㅎㅇ" onClick={handleClickOpen1} />
                        <Dialog open={open1} onClose={handleClose1} PaperProps={{ sx: { width: "50%", height: "100%" } }}>
                            <DialogTitle>대화창</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <TextField
                                        multiline={true}
                                        rows={24}
                                        fullWidth
                                        disabled
                                        value={renderChat()}
                                    ></TextField>
                                </DialogContentText>
                                <TextField
                                    name="message"
                                    onChange={(e) => onTextChange(e)}
                                    value={state.message}
                                    id="outlined-multiline-static"
                                    variant="outlined"
                                    label="Message"
                                >
                                </TextField>
                                <DialogActions>
                                    <Button onClick={onMessageSubmit}>보내기</Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="망건" secondary="ㅎㅇ" />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

export default FullScreenDialog;