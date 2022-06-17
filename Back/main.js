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

  socket.on('MemberIdCheck', ({ id, pw }) => {
    (async () => {
      let result = await dbcontrol.db_select(id, pw);
      socket.emit("MemberIdCheck", { result });
    })()
  })

  socket.on('Housesign_up', ({ locationvalue, address, files }) => {
    dbcontrol.db_inserthouse(locationvalue, address, files);
    socket.emit("Housesign_up_check", "등록 완료!!!");
  })
})