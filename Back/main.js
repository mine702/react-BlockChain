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

server.listen(8080, function() {
  dbcontrol.db_init();
  console.log('listening on port 8080')
})

io.on('connection', socket => {
  console.log("안녕하세요");
  socket.on('message', ({ name, id, pw, number, MetaMaskAcc}) => {
    console.log(name);
    //io.emit('message', { name, message })
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

