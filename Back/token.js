const dbcontrol = require('./db.js');
let main_socket;

let con_token = {
    get_Socket : function(socket){
        main_socket = socket;
    },

    addToken : function(sellusername, sellusernumber, res){
        dbcontrol.db_Token_Add(sellusername, sellusernumber, res);
      },
    
    updateToken : function(username, usernumber, buyername, buyernumber, tokenId){
        (async () => {
         await dbcontrol.db_Token_Update(username, usernumber, buyername, buyernumber, tokenId);
         main_socket.emit("Token_UpdateResult",({}));
        })()
      },
    
    getmyToken : function(name,number){
        (async () => {
          let result = await dbcontrol.db_MyToken(name,number);
          main_socket.emit("MyToken_Result", result);
        })()
      }
}

module.exports = con_token;