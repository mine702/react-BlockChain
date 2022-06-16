//const res = require('express/lib/response');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://mine0702:633ehddbs@cluster0.ohw26.mongodb.net/?retryWrites=true&w=majority";

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
        var myquery = { name: name };
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

    db_select: function (id, pw) {
        var query = { id: id, pw: pw };
        return new Promise(resolve => {
            dbo.collection("Member").find(query).toArray(function (err, result) {
                if (err) throw err;
                if (result == "") {
                    console.log("undefined");
                    resolve(result);
                }
                else {
                    console.log("1 document selected");
                    resolve(result[0]);
                }
            });
        });
    },

    db_update: function (before_name, after_name, age) {
        var myquery = { name: before_name };
        var newvalues = { $set: { name: after_name, age: age } };
        dbo.collection("customers").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
    },

    db_selectAll: function () {
        return new Promise(resolve => {
            dbo.collection("customers").find({}).toArray(function (err, result) {
                if (err) throw err;
                resolve(result);
                console.log("All document selected");
            });
        });
    },

    db_close: function () {
        db.close();
    }
}

module.exports = dbcontrol;
//export {db_init, db_insert, db_delete, db_close };