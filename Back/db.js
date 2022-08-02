//const res = require('express/lib/response');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var url = "mongodb+srv://wus:1234@cluster0.ohw26.mongodb.net/test";

var dbo;

let dbcontrol =
{
    db_init: function () {
        MongoClient.connect(url, function (err, db) {
            dbo = db.db("Real_Estate_Project");
            console.log('conneted!!');
        })
    },

    db_insert: function (name, id, pw, phoneNum, MetaMaskAcc) {
        var myobj = { name: name, id: id, pw: pw, number: phoneNum, MetaMaskAcc: MetaMaskAcc };
        dbo.collection("Member").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log(`${name}님이 회원가입 완료`);
        })
    },

    db_UserUpdate: function (name, id, pw, phoneNum, MetaMaskAcc) {
        var myquery = { id: id };
        var newvalues = { $set: { name: name, pw: pw, number: phoneNum, MetaMaskAcc: MetaMaskAcc } };
        dbo.collection("Member").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log(`${name}님이 회원정보 수정 완료`);
        })
    },

    // db_delete: function (name) {   삭제
    //     var myquery = { name: name };

    //     dbo.collection("Member").deleteOne(myquery, function (err, obj) {
    //         if (err) throw err;
    //         console.log("1 document deleted");
    //     });
    // },

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

    db_House_Register: function (area, address, price, PinataImage, selluserId, sellusername, sellusernumber, sellerMetaAddress, res) {
        var query = { location: area, address: address, price: price, files: PinataImage, selluserId: selluserId, name: sellusername, number: sellusernumber, MetaMaskAcc: sellerMetaAddress, tokenId: res };
        dbo.collection("Registration").insertOne(query, function (err, res) {
            if (err) throw err;
            console.log("매물 등록 완료");
        })
    },

    db_House_Correction: function (_id, area, address, price, files) {
        var id = new ObjectId(_id);
        var myquery = { _id: id };
        var newvalues = { $set: { location: area, address: address, price: price, files: files } };
        dbo.collection("Registration").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("매물 정보 수정 완료");
        })
    },

    db_Location_Data: function (area) {
        var query = { location: area };
        return new Promise(resolve => {
            dbo.collection("Registration").find(query).toArray(function (err, result) {
                if (err) throw err;
                console.log(`${area}지역 검색중`);
                resolve(result);
            });
        });
    },

    db_MyPageSell: function (name, number) {
        return new Promise(resolve => {
            var query = { name: name, number: number };
            dbo.collection("Registration").find(query).toArray(function (err, result) {
                if (err) throw err;
                console.log("My_Page 판매내역 검색중");
                resolve(result);
            });
        });
    },

    db_Delete_Data: function (_id) {
        var id = new ObjectId(_id);
        return new Promise(resolve => {
            var query = { _id: id };
            dbo.collection("Registration").deleteOne(query, function (err, result) {
                if (err) throw err;
                console.log("매물 삭제 완료");
            });
        });
    },

    db_Room_Search: function () {
        return new Promise(resolve => {
            dbo.collection("Room").find({}).toArray(function (err, result) {
                if (err) throw err;
                resolve(result);
                console.log("채팅방 검색중");
            });
        });
    },

    db_Room_Make: function (sellername, buyername, roomnumber) {
        var query = { Sellername: sellername, Buyername: buyername, RoomN: roomnumber, Msg: [] };
        console.log(query)
        dbo.collection("Room").insertOne(query, function (err, res) {
            if (err) throw err;
            console.log("채팅방 생성 완료");
        })
    },

    db_GetRoomNum: function (UserName) {
        return new Promise(resolve => {
            dbo.collection("Room").find({}, { projection: { Sellername: 1, Buyername: 1, RoomN: 1 } }).toArray(function (err, result) {
                if (err) throw err;
                let Buyername_arr = [];
                for (i = 0; i < result.length; i++) {
                    if (result[i].Buyername == UserName) {
                        Buyername_arr.push(result[i].RoomN);
                    }
                    else if (result[i].Sellername == UserName) {
                        Buyername_arr.push(result[i].RoomN);
                    }
                }
                resolve(Buyername_arr);
            })
        })
    },

    db_LoadMsg: function (RoomNumber) {
        const query = { RoomN: RoomNumber }
        return new Promise(resolve => {
            dbo.collection("Room").find(query).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                let Msg_Arr = [];
                Msg_Arr = result[0].Msg;
                resolve(Msg_Arr);
            })
        })
    },

    db_SaveMsg: function (chatlog, RoomNumber) {
        var query = { RoomN: RoomNumber }
        var newvalues = { $set: { Msg: chatlog } };
        return new Promise(resolve => {
            dbo.collection("Room").updateOne(query, newvalues, function (err, res) {
                if (err) throw err;
                resolve();
            })
        })
    },

    db_Search_Room: function (value) {
        var query = { RoomN: value }
        return new Promise(resolve => {
            dbo.collection("Room").find(query, { projection: { Sellername: 1, Buyername: 1, RoomN: 1 } }).toArray(function (err, result) {
                if (err) throw err;
                resolve(result);
                console.log("채팅방 검색 완료");
            });
        });
    },

    db_GetOutRoom: function (value) {  //둘다 나갔을때 채팅방 삭제
        return new Promise(resolve => {
            var query = { RoomN: value };
            dbo.collection("Room").deleteOne(query, function (err, result) {
                if (err) throw err;
                console.log(`${value}번 채팅방 삭제 완료`);
            });
        });
    },

    db_GetOutRoom_Buyername: function (value, username) {   //구매자 채팅방 나가기
        var query = { RoomN: value }
        var newvalues = { $set: { Buyername: null } };
        dbo.collection("Room").updateOne(query, newvalues, function (err, res) {
            if (err) throw err;
            console.log(`구매자 : ${username}님이 ${value}번 채팅방을 나가셨습니다`);
        })
    },

    db_GetOutRoom_Sellername: function (value, username) {  //판매자 채팅방 나가기
        var query = { RoomN: value }
        var newvalues = { $set: { Sellername: null } };
        return new Promise(resolve => {
            dbo.collection("Room").updateOne(query, newvalues, function (err, res) {
                if (err) throw err;
                console.log(`판매자 : ${username}님이 ${value}번 채팅방을 나가셨습니다`);
            })
        })
    },

    db_LoadImg: function (houseAddress) {
        return new Promise(resolve => {
            var query = { address: houseAddress };
            dbo.collection("Registration").find(query).toArray(function (err, result) {
                if (err) throw err;
                resolve(result[0].files)
            })
        })
    },

    db_Add_Approval: function (sellerAddress, locations, sellername, sellerImg, buyername, buyernumber, buyerAddress, houseAddress, housePrice, tokenId) {
        var query = { sellerAddress: sellerAddress, locations: locations, sellername: sellername, sellerImg: sellerImg, buyername: buyername, buyernumber: buyernumber, buyerAddress: buyerAddress, houseAddress: houseAddress, housePrice: housePrice, tokenId: tokenId };
        dbo.collection("Approval").insertOne(query, function (err, res) {
            if (err) throw err;
            console.log("거래 승인 요청 추가 완료");
        })
    },

    db_MyPageApproval: function (name) {
        return new Promise(resolve => {
            var query = { sellername: name };
            dbo.collection("Approval").find(query).toArray(function (err, result) {
                if (err) throw err;
                console.log("My_Page 승인요청 검색중");
                resolve(result);
            });
        });
    },

    db_Delete_Approval: function (username, locations, houseAddress) {
        var myquery = { sellername: username, locations: locations, houseAddress: houseAddress };
        dbo.collection("Approval").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("거래 승인 요청 삭제 완료");
        });
    },

    db_Delete_House_Registration: function (username, locations, houseAddress) {
        var myquery = { name: username, location: locations, address: houseAddress };
        dbo.collection("Registration").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("거래 승인 후 매물 삭제 완료");
        });
    },

    db_AddrCheck: function (address) {
        var query = { address: address };
        return new Promise(resolve => {
            dbo.collection("Registration").find(query).toArray(function (err, result) {
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

    db_Token_Add: function (sellusername, sellusernumber, res) {
        var myobj = { username: sellusername, usernumber: sellusernumber, tokenId: res };
        dbo.collection("Token").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("토큰 추가 완료");
        })
    },

    db_Token_Update: function (username, usernumber, buyername, buyernumber, tokenId) {
        var query = { username: username, usernumber: usernumber, tokenId: tokenId }
        var newvalues = { $set: { username: buyername, usernumber: buyernumber } };
        dbo.collection("Token").updateOne(query, newvalues, function (err, res) {
            if (err) throw err;
            console.log("토큰 수정 완료");
        })
    },

    db_MyToken: function (name, number) {
        return new Promise(resolve => {
            var query = { username: name, usernumber: number };
            dbo.collection("Token").find(query).toArray(function (err, result) {
                if (err) throw err;
                console.log("토큰 검색중");
                resolve(result);
            });
        });
    },

    db_close: function () {
        db.close();
    }
}
module.exports = dbcontrol;
//export {db_init, db_insert, db_delete, db_close };