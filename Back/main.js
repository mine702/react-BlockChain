const express = require('express');
const app = express();
const cors = require('cors');
const dbcontrol = require('./db.js');
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
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

  socket.on('UserUpdate', ({ name, id, pw, phoneNum, MetaMaskAcc }) => {
    dbcontrol.db_UserUpdate(name, id, pw, phoneNum, MetaMaskAcc);
    socket.emit("UserUpdate_Result", "회원 정보 수정 완료!!!");
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

  socket.on('House_Register', ({ area, address, price, files, selluserId, sellusername, sellusernumber, sellerMetaAddress }) => {
    dbcontrol.db_House_Register( area, address, price, files, selluserId, sellusername, sellusernumber, sellerMetaAddress);
    socket.emit("House_Register_Result", "등록 완료!!!");
  })

  socket.on('House_Correction', ({ _id, area, address, price, files }) => {
    dbcontrol.db_House_Correction(_id, area, address, price, files);
    socket.emit("House_Correction_Result", "수정 완료!!!");
  })

  socket.on('Area_Data', ({ area }) => {
    (async () => {
      let result = await dbcontrol.db_Location_Data(area);
      socket.emit("Area_Data_Result", result);
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
    (async () => {  //합격
      let result = await dbcontrol.db_Room_Search();
      console.log(result);
      socket.emit("Room_Search_Result", result);
    })()
  })

  socket.on('Room_Make', ({ sellername, buyername, roomnumber }) => {
    
    dbcontrol.db_Room_Make(sellername, buyername, roomnumber);
    socket.emit("Room_Make_Result", "Ok");
  })

  socket.on('Chatting_Join', ({ roomnumber }) => {
    socket.join(`${roomnumber}번방`);
    io.to(`${roomnumber}번방`).emit('Join_return', {roomnumber} );
  })

  socket.on('Message_Send', ({ buyername, sendmsg, RoomNumber }) => {
    try {
      console.log(buyername, sendmsg, RoomNumber);
      //socket.join(`${RoomNumber}번방`);
      io.to(`${RoomNumber}번방`).emit('Msg_return', { buyername, sendmsg });
    }
    catch (error) {
      console.log(error);
    }
  })


  socket.on('RoomNumber' , ({name})=>{    
    (async() =>{
      let result = await dbcontrol.db_GetRoomNum(name);
      socket.emit('RoomNuber_Result' , ({result}) );
    })()
  })

  socket.on("Load_Msg_Makechat",({roomnumber})=> {
    (async() =>{
      console.log(roomnumber)
      let result = await dbcontrol.db_LoadMsg(roomnumber);
      socket.emit("Return_Load_Msg_Makechat", ({result}));
    })()
  })

  socket.on("Load_Msg_Chat",({RoomNumber})=> {
    (async() =>{
      console.log(RoomNumber)
      let result = await dbcontrol.db_LoadMsg(RoomNumber);
      socket.emit("Return_Load_Msg_Chat", ({result}));
    })()
  })

  socket.on('Save_Msg',({chatlog,RoomNumber}) => {
    (async() =>{
      await dbcontrol.db_SaveMsg(chatlog,RoomNumber);
      //socket.emit('RoomNuber_Result' , ({result}) );
    })()
  })

  socket.on('GetOutRoom',({value})=>{
    dbcontrol.db_GetOutRoom(value);
    socket.emit("GetOutRoom_Result", "삭제 완료!!!");
  })

  socket.on('Search_Room' , ({value})=>{    
    (async() =>{
      let result = await dbcontrol.db_Search_Room(value);
      socket.emit('Search_Room_Result' , ({result}) );
    })()
  })

  socket.on('GetOutRoom_Buyername',({value, username})=>{
    dbcontrol.db_GetOutRoom_Buyername(value, username);
    socket.emit('GetOutRoom_Buyername_Result' , "삭제 완료!!!" );
  })

  socket.on('GetOutRoom_Sellername',({value, username})=>{
    dbcontrol.db_GetOutRoom_Sellername(value, username);
    socket.emit('GetOutRoom_Sellername_Result' , "삭제 완료!!!" );
  })

  socket.on('LoadImg',({houseAddress})=>{
    (async() =>{
      let result = await dbcontrol.db_LoadImg(houseAddress);
      socket.emit("LoadImg_Result", {result});
    })()
  })

})
