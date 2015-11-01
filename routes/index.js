var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

});

router.get('/xxx', function (req, res, next) {
    res.render('emailTemplate', {newCdkey : "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"});
});

//router.get('/add1', function (req, res, next) {
//    //var now= new Date();
//    //var timeSeconds = Math.ceil(now.getTime() / 1000);
//    //console.log(timeSeconds);
//
//    var now = new Date();
//    var timeSeconds = Math.ceil(now.getTime() / 1000);
//
//    for (var i = 0; i < 100; i++) {
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
//        var ref = new Firebase("https://bot11.firebaseio.com/cdkey/mynba2k16/" + str1);
//        ref.set({"deviceCode": 1, "expireTime": 1, "new": true}, function (error) {
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
