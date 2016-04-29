var express = require('express');
var router = express.Router();
var dbmail = require("./dbmail");
var fs = require("fs");

/* GET home page. */







router.get('/aa', function (req, res, next) {
    res.send("sss<br>ssss")

});













//var arr = [3,4,7,13,4,7,6,2,2,5,10,3,3,8,10,4,15,9,6,3,5,5,6,9,7,5,8,10,5,4,9];
////var y = 0;
////for (var x = 0; x < arr.length; x++) {
////    y = arr[x] + y;
////}
////console.log(y);
//
//router.get('/xxx', function (req, res, next) {
//    //res.render('emailTemplate', {newCdkey : "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"});
//    fs.readFile( __dirname + "/../" + "MYNBA2K16.txt", 'utf8', function (err, data) {
//        var x = data.split("\n");
//        var count = 0;
//        var now= new Date();
//        var timeSeconds = Math.ceil(now.getTime() / 1000);
//        for (var i = 0; i < arr.length; i++) {
//            var validTime = timeSeconds + (i + 1) * 24 * 60 * 60;
//            for (var j = 0; j < arr[i]; j++) {
//                cdkey = "";
//                for (var k = 0; k < 32; k++) {
//                    cdkey = cdkey + x[count].charAt(k);
//                }
//                count++;
//
//                var refChildCdkey = dbmail["ref"].child('cdkey/mynba2k16/' + cdkey);
//                refChildCdkey.set({"new": false, "preUpdate":false, "preSessionCode": "20", "sessionCode" : "30", "expireTime" : validTime}, function (error) {
//                    console.log("firebase set cdkey ");
//                    if (error) {
//                        console.log(error);
//                    } else {
//                    }
//                });
//
//
//
//
//
//            }
//        }
//        //console.log(x.length);
//        //for (var i = 0; i < x.length; i++) {
//        //    cdkey = "";
//        //
//        //
//        //    //var refChildCdkey = dbmail["ref"].child('cdkey/mynba2k16/' + cdkey);
//        //    //refChildCdkey.set({"new": true}, function (error) {
//        //    //    console.log("firebase set cdkey ");
//        //    //    if (error) {
//        //    //        console.log(error);
//        //    //    } else {
//        //    //    }
//        //    //});
//        //    console.log(x[i]);
//        //}
//    });
//
//});

//
//router.get('/add1', function (req, res, next) {
//    //var now= new Date();
//    //var timeSeconds = Math.ceil(now.getTime() / 1000);
//    //console.log(timeSeconds);
//
//    var now = new Date();
//    var timeSeconds = Math.ceil(now.getTime() / 1000);
//
//    for (var i = 0; i < 300; i++) {
//        var str1 = "";
//        for (var j = 0; j < 32; j++) {
//            var aa = Math.floor(Math.random() * 36);
//            if (aa <= 25) {
//                str1 = str1 + String.fromCharCode(65 + aa);
//
//            } else {
//                str1 = str1 + (aa - 26);
//            }
//
//        }
//        console.log(str1)
//        var ref = dbmail["ref"].child('cdkey/mynba2k16/' + str1);
//        ref.set({"new": true}, function (error) {
//            if (error) {
//
//            } else {
//
//            }
//        });
//    }
//    res.send("sss");
//});



module.exports = router;
