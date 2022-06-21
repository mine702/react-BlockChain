//const res = require('express/lib/response');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://jinzero:0619@cluster0.hs9i9.mongodb.net/?retryWrites=true&w=majority";
//mongodb+srv://wb35:1234@firstcluster.fvuco.mongodb.net/?retryWrites=true&w=majority
const dayjs = require('dayjs');

var dbo;

let dbcontrol = 
{
    
    db_init :function ()
    {
        MongoClient.connect(url, function(err, db) {
        dbo = db.db("LoginInfo");
        console.log('conneted!!');
        })
    },

    db_insert: function(name, id, pw, number, MetaMaskAcc)
    {
        var myobj = { name : name, id: id, pw: pw, number : number, MetaMaskAcc : MetaMaskAcc };
        dbo.collection("Member").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        })
    },

    db_delete: function (name)
    {
        var myquery = { name: name };
        dbo.collection("Member").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        });
    },

    db_idCheck: function (id) {
        var query = { id: id };
        return new Promise(resolve => {
            dbo.collection("Member").find(query).toArray(function (err, result) {
                if (err) throw err;
                if(result!="")
                {
                    resolve(true);
                }
                else
                {  
                    resolve(false);
                }
            });            
        });
    },

    db_Login: function (id, pw) {
        var query = { id: id, pw : pw};
        return new Promise(resolve => {
            dbo.collection("Member").find(query).toArray(function (err, result) {
                if (err) throw err;
               
                resolve(result);
                
            });            
        });
    },

    db_select: function (name) {
        var query = { name: name };

        return new Promise(resolve => {
            dbo.collection("customers").find(query).toArray(function (err, result) {
                if (err) throw err;
                if(result=="")
                {
                    console.log("undefined");
                }
                else
                {
                    console.log("1 document selected");
                    resolve(result);
                }
            });            
        });
    },

    db_update: function (before_name, after_name, age)
    {
        var myquery = { name: before_name };
        var newvalues = { $set: {name: after_name, age: age } };
        dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        });
    },

    db_selectAll: function ()
    {
        return new Promise(resolve => {
            dbo.collection("customers").find({}).toArray(function(err,result){
                if(err) throw err;
                resolve(result);
                console.log("All document selected");
            });           
        });
    },



    db_InsertMsg : function(to,from)
    {
        var myobj = { from : from, to : to, msg:"", time : dayjs().format("MM월DD일HH:mm:ss")};
        dbo.collection("MsgInfo").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        })
    },

    db_UpdateMsg : function(to,from,msg)
    {
        return new Promise(resolve => {
            dbo.collection("MsgInfo").find({}, { projection: { msg: 1, time : 1, to : 1, from : 1 } }).toArray(function(err, result) {
                if (err) throw err;
                console.log(result[0].msg);
                for(var i = 0; i< result.length; i++)
                {
                    if(result[i].to ==to && result[i].from == from)
                    {
                        //console.log(result[i].msg + "+"  + result[i].time);
                        myquery = { to : result[i].to, from : result[i].from };
                        newmsg = result[i].msg + "#" +  msg;
                        //newtime = result[i].time + "@" + dayjs().format("MM월DD일HH:mm:ss");
                        newvalues = { $set: {msg: newmsg } };
                        dbo.collection("MsgInfo").updateOne(myquery, newvalues, function(err, res) {
                          if (err) throw err; 
                    });    
                }
              }});
            })
    },

    db_getMsgInfo : function(f_name)
    {
        return new Promise(resolve => {
            dbo.collection("MsgInfo").find({}, { projection: { msg: 1, time : 1, to : 1, from : 1 } }).toArray(function(err, result) {
                if (err) throw err;
                for(var i = 0; i< result.length; i++)
                {
                    console.log(result);
                    if(result[i].from == f_name)
                    {
                        resolve(result[i].msg);
                    }
                    // if(result[i].to ==to)
                    // {
                        
                    // }
                }
              })
            })
    },

    db_close: function()
    {
        db.close();
    }
}

module.exports = dbcontrol;
//export {db_init, db_insert, db_delete, db_close };