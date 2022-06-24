const express = require('express');
const app = express();
const cors = require('cors');
const dbcontrol = require('./db.js');
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); //모든 cross-origin 요청에 대해 응답

server.listen(8080, function () {
  dbcontrol.db_init();
  console.log('listening on port 8080')
})

io.on('connection', socket => {

  socket.on('sign_up', ({ name, id, pw, number, MetaMaskAcc }) => {
    dbcontrol.db_insert(name, id, pw, number, MetaMaskAcc);
    socket.emit("MemberCheck", "회원 가입 완료!!!");
  })

  socket.on('idCheck', ({ id }) => {
    (async () => {
      let result = await dbcontrol.db_idCheck(id);
      console.log(result);
      socket.emit("idCheck_rusult", { result });
    })()
  })

  socket.on('Login', ({ id, pw }) => {
    (async () => {
      let result = await dbcontrol.db_Login(id, pw);
      socket.emit("Login_result", result);
    })()
  })

  socket.on('House_Register', ({ locationvalue, address, price, files, selluserId, sellusername, sellusernumber }) => {
    dbcontrol.db_House_Register(locationvalue, address, price, files, selluserId, sellusername, sellusernumber);
    socket.emit("House_Register_Result", "등록 완료!!!");
  })

  socket.on('House_Correction', ({ _id, locationvalue, address, price, files }) => {
    dbcontrol.db_House_Correction(_id, locationvalue, address, price, files);
    socket.emit("House_Correction_Result", "수정 완료!!!");
  })

  socket.on('Location_Data', ({ locationvalue }) => {
    (async () => {
      let result = await dbcontrol.db_Location_Data(locationvalue);
      socket.emit("Location_Data_Result", result);
    })()
  })

  socket.on('MyPageSell', ({ name, number }) => {
    (async () => {
      let result = await dbcontrol.db_MyPageSell(name, number);
      socket.emit("MyPageSell_Result", result);
    })()
  })

  socket.on('Delete_Data', ({ card }) => {
    dbcontrol.db_Delete_Data(card._id);
    socket.emit("Delete_Data_Result", "삭제 완료!!!");
  })

  socket.on('Room_Search', () => {
    (async () => {
      let result = await dbcontrol.db_Room_Search();
      socket.emit("Room_Search_Result", result);
    })()
  })

  socket.on('Room_Make', ({ Sname, Oname, roomnumber }) => {
    dbcontrol.db_Room_Make(Sname, Oname, roomnumber);
    socket.emit("Room_Make_Result", "Ok");
  })


  socket.on('Update_Registration', ({ S_id, roomnumber }) => {
    dbcontrol.db_Update_Registration(S_id, roomnumber);
    socket.emit("Update_Registration_Result", "Ok");
  })

  socket.on('Chatting_Join', ({ Oname, roomnumber }) => {
    console.log(Oname, roomnumber);
    socket.join(`${roomnumber}번방`);
  })

  socket.on('Message_Send', ({ Oname, sendmsg, RoomNumber }) => {
    try {
      console.log(Oname, sendmsg, RoomNumber);
      socket.join(`${RoomNumber}번방`);
      io.to(`${RoomNumber}번방`).emit('Mes_return', { Oname, sendmsg });
    } catch (error) {
      console.log(error);
    }
  })
})
