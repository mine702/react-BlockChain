//const res = require('express/lib/response');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://wb35:1234@cluster.yau6n.mongodb.net/?retryWrites=true&w=majority";

var dbo;

let dbcontrol = 
{
    
    db_init :function ()
    {
        MongoClient.connect(url, function(err, db) {
        dbo = db.db("Real_Estate_Project");
        console.log('conneted!!');
        })
    },

    db_insert: function(name, id, pw, number, MetaMaskAcc)
    {
        var myobj = { name : name, id: id, pw: pw, number : number, MetaMaskAcc : MetaMaskAcc, socket_id : "" };
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

    db_House_Register: function (locationvalue, address, files, name, number, userid ) {
        var myobj = { address: address, files: files, name: name, number: number, userid: userid };
        dbo.collection(`${ locationvalue }`).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        })
    },

    db_Location_Data: function (locationvalue)
    {
        return new Promise(resolve => {
            dbo.collection(`${locationvalue}`).find({}).toArray(function(err,result){
                if(err) throw err;
                resolve(result);
                console.log("All document selected");
            });           
        });
    },

    db_IdSelect: function (sellerid) {
        var query = { id: sellerid };

        return new Promise(resolve => {
            dbo.collection("Member").find(query,{ projection: { socket_id : 1 } }).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                resolve(result);  
                });            
        });
    },

    db_update: function (userid, socket_id)
    {
        var myquery = { id : userid };
        var newvalues = { $set: { socket_id: socket_id} };
        dbo.collection("Member").updateOne(myquery, newvalues, function(err, res) {
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

    db_close: function()
    {
        db.close();
    }
}

module.exports = dbcontrol;
//export {db_init, db_insert, db_delete, db_close };