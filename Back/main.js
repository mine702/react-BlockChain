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

server.listen(8080, function() {
  dbcontrol.db_init();
  console.log('listening on port 8080')
})

io.on('connection', socket => {

  socket.on('sign_up', ({ name, id, pw, number, MetaMaskAcc}) => {
    dbcontrol.db_insert(name, id, pw, number, MetaMaskAcc);
    socket.emit("MemberCheck", "회원 가입 완료!!!");
  })

  socket.on('idCheck', ({ id }) => {
    (async ()=>{
      let result = await dbcontrol.db_idCheck(id);
      console.log(result);
      socket.emit("idCheck_rusult", {result});
    })()
  })

  socket.on('Login', ({ id, pw }) => {
    (async ()=>{
      let result = await dbcontrol.db_Login(id, pw);
      console.log(result);
      socket.emit("Login_result", result);
    })()
  })

  socket.on('House_Register', ({ locationvalue, address, files, name, number  }) => {
    dbcontrol.db_House_Register(locationvalue, address, files, name, number );
    socket.emit("House_Register_Result", "등록 완료!!!");
  })

  socket.on('Location_Data', ({ locationvalue }) => {
    (async ()=> {
    let result = await dbcontrol.db_Location_Data(locationvalue);
    console.log(result);
    socket.emit("Location_Data_Result", result);
    })()
  })

  let name;
  let msg;

  socket.on('Message_Send', ({username, sendmsg }) => {
   name=username;
   msg= sendmsg;
    console.log(username, sendmsg );
    io.emit("Message_Receive",{ name, msg });
  })

})




// app.get('/', function(req, res){
//     //res.sendFile(__dirname + '/main.html')
//     res.status(200).json({
//       status: "succ",
//       message: "여기는 홈페이지입니다.",
//     });
// });

// app.post('/insert', function(req, res){
//    dbcontrol.db_insert(req.body.name, req.body.age);
// });

// app.post('/delete', function(req, res){
//   dbcontrol.db_delete(req.body.name);
// });

// //const text = document.getElementsByName("after_name").value;

// app.post('/select', function(req, res){
//   (async ()=>{
//     let result = await dbcontrol.db_select(req.body.name);
//     console.log(result[0]);
//     res.send(result[0]);
//   })()
// });

// app.post('/update', function(req, res){
//   dbcontrol.db_update(req.body.before_name, req.body.after_name, req.body.age);
// });

// app.post('/selectAll', function(req, res){
//   (async ()=>{
//     let result = await dbcontrol.db_selectAll();
//     console.log(result[0]);  
//     res.send(result[0]);
//   })()
// });

