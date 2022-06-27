//const res = require('express/lib/response');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var url = "mongodb+srv://mine702:633ehddbs@cluster0.ohw26.mongodb.net/?retryWrites=true&w=majority";

var dbo;

let dbcontrol =
{

    db_init: function () {
        MongoClient.connect(url, function (err, db) {
            dbo = db.db("Real_Estate_Project");
            console.log('conneted!!');
        })
    },

    db_insert: function (name, id, pw, number, MetaMaskAcc) {
        var myobj = { name: name, id: id, pw: pw, number: number, MetaMaskAcc: MetaMaskAcc };
        dbo.collection("Member").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        })
    },

    db_delete: function (name) {
        var myquery = { name: name }; +

            dbo.collection("Member").deleteOne(myquery, function (err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
            });
    },

    db_idCheck: function (id) {
        var query = { id: id };
        return new Promise(resolve => {
            dbo.collection("Member").find(query).toArray(function (err, result) {
                if (err) throw err;
                if (result != "") {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    },

    db_Login: function (id, pw) {
        var query = { id: id, pw: pw };
        return new Promise(resolve => {
            dbo.collection("Member").find(query).toArray(function (err, result) {
                if (err) throw err;

                resolve(result);

            });
        });
    },

    db_House_Register: function (locationvalue, address, price, files, selluserId, sellusername, sellusernumber) {
        var query = { location: locationvalue, address: address, price: price, files: files, selluserId: selluserId, name: sellusername, number: sellusernumber, room: [] };
        dbo.collection("Registration").insertOne(query, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        })
    },

    db_House_Correction: function (_id, locationvalue, address, price, files) {
        var id = new ObjectId(_id);
        var myquery = { _id: id };
        var newvalues = { $set: { location: locationvalue, address: address, price: price, files: files } };
        dbo.collection("Registration").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document update");
        })
    },

    db_Location_Data: function (locationvalue) {
        var query = { location: locationvalue };
        return new Promise(resolve => {
            dbo.collection("Registration").find(query).toArray(function (err, result) {
                if (err) throw err;
                resolve(result);
                console.log("All document selected");
            });
        });
    },

    db_MyPageSell: function (name, number) {
        return new Promise(resolve => {
            var query = { name: name, number: number };
            dbo.collection("Registration").find(query).toArray(function (err, result) {
                if (err) throw err;
                resolve(result);
                console.log("All document selected");
            });
        });
    },

    db_Delete_Data: function (_id) {
        var id = new ObjectId(_id);
        return new Promise(resolve => {
            var query = { _id: id };
            dbo.collection("Registration").deleteOne(query, function (err, result) {
                if (err) throw err;
                console.log("1 document deleted");
            });
        });
    },

    db_Room_Search: function () {
        return new Promise(resolve => {
            dbo.collection("Room").find({}).toArray(function (err, result) {
                if (err) throw err;
                resolve(result);
                console.log("All document selected");
            });
        });
    },

    db_Room_Make: function (Sname, Oname, roomnumber) {
        var query = { Sname: Sname, Oname: Oname, RoomN: roomnumber };
        console.log(query)
        dbo.collection("Room").insertOne(query, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        })
    },

    db_Update_Registration: function (_id, roomnumber) {
        var id = new ObjectId(_id);
        var myquery = { _id: id };
        var que = { $push: { room: roomnumber } }   
        dbo.collection("Registration").updateOne(myquery, que, function (err, res) {
            if (err) throw err;
            console.log("1 document update");
        })
    },

    db_GetRoomNum: function (UserName){

        return new Promise(resolve => {
        dbo.collection("Room").find({}, { projection: {  Oname: 1, RoomN: 1 } }).toArray(function(err, result) {
            if (err) throw err;
            let Oname_arr = [];
            for(i=0; i < result.length ; i++){
               if(result[i].Oname == UserName)
               {
                    Oname_arr.push(result[i].RoomN);
               }
            }
            console.log(Oname_arr);
                resolve(Oname_arr);
            })
        })
    },

    db_close: function () {
        db.close();
    }
}
module.exports = dbcontrol;
//export {db_init, db_insert, db_delete, db_close };