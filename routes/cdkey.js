var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/mynba2k16/verify/:keyCode/:deviceCode', function(req, res, next) {
  //res.send('respond with a resource   ' + req.params.deviceCode);
    var Firebase = require("firebase");
    var ref = new Firebase("https://bot11.firebaseio.com/cdkey/mynba2k16/" + req.params.keyCode);
    ref.on("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码！Invalid cdkey！");
        } else {
            if (codeState.val()["deviceCode"] != req.params.deviceCode) {
                res.send("注册已绑定其他设备，请先解绑！This cdkey has been used by another device, please unbind firstly!");
            } else {
                var now= new Date();
                var timeSeconds = Math.ceil(now.getTime() / 1000);
                console.log( timeSeconds );
                if (codeState.val()["expireTime"] < timeSeconds) {
                    res.send("注册码已经过期，请重新购买！This cdkey is expired, please buy a new one!")
                } else {
                    res.send("true");
                }
            }
        }
        //console.log(codeState.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("error");
    });
});
router.get('/mynba2k16/bind/:keyCode', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
