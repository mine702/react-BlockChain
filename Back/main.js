const express = require('express');
const app = express();
const cors = require('cors');
const dbcontrol = require('./db.js');
const con_member = require('./member.js');
const con_token = require('./token.js')
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

let controller;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); //모든 cross-origin 요청에 대해 응답

server.listen(8080, function () {
  dbcontrol.db_init();
  console.log('listening on port 8080')
})

io.on('connection', socket => {

  //#region 소켓전달
  con_member.get_Socket(socket);
  con_token.get_Socket(socket);
  //#endregion

  //#region 멤버관리

  socket.on('sign_up', ({ name, id, pw, phoneNum, MetaMaskAcc }) => {
    con_member.insert(name, id, pw, phoneNum, MetaMaskAcc);
  })

  socket.on('UserUpdate', ({ name, id, pw, phoneNum, MetaMaskAcc }) => {
    con_member.update(name, id, pw, phoneNum, MetaMaskAcc);
  })

  socket.on('idCheck', ({ id }) => {
    con_member.idcheck(id);
  })

  socket.on('Login', ({ id, pw }) => {
   con_member.login(id,pw);
  })
  //#endregion
  
  //#region 채팅관리
  socket.on('Room_Search', () => {
    (async () => {  //합격
      let result = await dbcontrol.db_Room_Search();
      console.log(result);
      socket.emit("Room_Search_Result", result);
    })()
  })

  socket.on('Room_Make', ({ sellername, buyername, roomnumber }) => {
    //con_chat.makeRoom();
    dbcontrol.db_Room_Make(sellername, buyername, roomnumber);
    socket.emit("Room_Make_Result", "Ok");
  })

  socket.on('Chatting_Join', ({ roomnumber }) => {
    socket.join(`${roomnumber}번방`);
    io.to(`${roomnumber}번방`).emit('Join_return', { roomnumber });
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

  socket.on('RoomNumber', ({ name }) => {
    (async () => {
      let result = await dbcontrol.db_GetRoomNum(name);
      socket.emit('RoomNuber_Result', ({ result }));
    })()
  })

  socket.on("Load_Msg_Makechat", ({ roomnumber }) => {
    (async () => {
      console.log(roomnumber)
      let result = await dbcontrol.db_LoadMsg(roomnumber);
      socket.emit("Return_Load_Msg_Makechat", ({ result }));
    })()
  })

  socket.on("Load_Msg_Chat", ({ RoomNumber }) => {
    (async () => {
      controller = RoomNumber;
      let result = await dbcontrol.db_LoadMsg(RoomNumber);
      socket.emit("Return_Load_Msg_Chat", ({ result }));
    })()
  })

  socket.on('Save_Msg', ({ chatlog, RoomNumber }) => {
    if(controller === RoomNumber){
      (async () => {
        console.log(`${controller}번째방 채팅 로딩`);
        await dbcontrol.db_SaveMsg(chatlog, RoomNumber);
        //socket.emit('RoomNuber_Result' , ({result}) );
      })()
    }
  })

  socket.on('GetOutRoom', ({ value }) => {
    dbcontrol.db_GetOutRoom(value);
    socket.emit("GetOutRoom_Result", "삭제 완료!!!");
  })

  socket.on('Search_Room', ({ value }) => {
    (async () => {
      let result = await dbcontrol.db_Search_Room(value);
      socket.emit('Search_Room_Result', ({ result }));
    })()
  })

  socket.on('GetOutRoom_Buyername', ({ value, username }) => {
    dbcontrol.db_GetOutRoom_Buyername(value, username);
    socket.emit('GetOutRoom_Buyername_Result', "삭제 완료!!!");
  })

  socket.on('GetOutRoom_Sellername', ({ value, username }) => {
    dbcontrol.db_GetOutRoom_Sellername(value, username);
    socket.emit('GetOutRoom_Sellername_Result', "삭제 완료!!!");
  })
  //#endregion

  //#region 매물관리
  socket.on('House_Register', ({ area, address, price, PinataImage, selluserId, sellusername, sellusernumber, sellerMetaAddress, res, PinataDocx }) => {
    dbcontrol.db_House_Register(area, address, price, PinataImage, selluserId, sellusername, sellusernumber, sellerMetaAddress, res, PinataDocx);
    socket.emit("House_Register_Result");
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

  socket.on('LoadImg', ({ houseAddress }) => {
    (async () => {
      let result = await dbcontrol.db_LoadImg(houseAddress);
      let address = houseAddress
      socket.emit("LoadImg_Result", { address, result });
    })()
  })

  socket.on("Add_Approval", ({ sellerAddress, locations, sellername, sellerImg, buyername, buyernumber, buyerAddress, houseAddress, housePrice, tokenId }) => {
    dbcontrol.db_Add_Approval(sellerAddress, locations, sellername, sellerImg, buyername, buyernumber, buyerAddress, houseAddress, housePrice, tokenId);
  })

  socket.on('MyPageApproval', ({ name }) => {
    (async () => {
      let result = await dbcontrol.db_MyPageApproval(name);
      socket.emit("MyPageApproval_Result", result);
    })()
  })

  socket.on("Delete_Approval", ({ username, locations, houseAddress }) => {    
    dbcontrol.db_Delete_Approval(username, locations, houseAddress);
    socket.emit("Delete_Approval_Result");
  })

  socket.on("Delete_House_Registration", ({ username, locations, houseAddress }) => {
    dbcontrol.db_Delete_House_Registration(username, locations, houseAddress);
    socket.emit("Delete_House_Registration_Result");
  })

  socket.on('CheckAddr', ({ address }) => {
    (async () => {
      let result = await dbcontrol.db_AddrCheck(address);
      console.log(result);
      socket.emit("AddrCheck_result", { result });
    })()
  })
  //#endregion

  //#region 토큰관리
  socket.on('Token_Add', ({ sellusername, sellusernumber, res }) => {
    con_token.addToken(sellusername, sellusernumber, res);
  })

  socket.on('Token_Update', ({ username, usernumber, buyername, buyernumber, tokenId }) => {
    con_token.updateToken(username, usernumber, buyername, buyernumber, tokenId);
  })

  socket.on('MyToken', ({ name, number }) => {
    con_token.getmyToken(name,number);
  })
  //#endregion

  socket.on('temp', ({ newcards }) => {
    socket.emit('temp_Result', ({ newcards }));
  })


})