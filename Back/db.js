//const res = require('express/lib/response');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://wb35:1234@cluster.yau6n.mongodb.net/?retryWrites=true&w=majority";

var dbo;

let dbcontrol = 
{
    
    db_init :function ()
    {
        MongoClient.connect(url, function(err, db) {
        dbo = db.db("test");
        console.log('conneted!!');
        })
    },

    db_insert: function(name, age)
    {
        var myobj = { name : name, age: age };
        dbo.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        })
    },

    db_delete: function (name)
    {
        var myquery = { name: name };
        dbo.collection("customers").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
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

    db_close: function()
    {
        db.close();
    }
}

module.exports = dbcontrol;
//export {db_init, db_insert, db_delete, db_close };