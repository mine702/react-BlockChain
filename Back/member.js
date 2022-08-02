const dbcontrol = require('./db.js');
let main_socket;

let con_member = {

    get_Socket : function(socket){
        main_socket = socket;
    },

    insert : function(name, id, pw, phoneNum, MetaMaskAcc) {
        dbcontrol.db_insert(name, id, pw, phoneNum, MetaMaskAcc);
        main_socket.emit("MemberCheck", "회원 가입 완료!!!");
    },

    update : function(name, id, pw, phoneNum, MetaMaskAcc){
        dbcontrol.db_UserUpdate(name, id, pw, phoneNum, MetaMaskAcc);
        main_socket.emit("UserUpdate_Result", "회원 정보 수정 완료!!!");
    
    },

    idcheck : function(id){
        (async () => {
            let result = await dbcontrol.db_idCheck(id);
            main_socket.emit("idCheck_rusult", { result });
          })()
    },

    login: function(id,pw){
        (async () => {
            let result = await dbcontrol.db_Login(id, pw);
            main_socket.emit("Login_result", result);
          })()
    },
}

module.exports = con_member;