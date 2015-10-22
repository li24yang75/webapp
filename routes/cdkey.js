var express = require('express');
var router = express.Router();
var Firebase = require("firebase");
/* GET users listing. */
router.get('/mynba2k16/verify/:keyCode/:deviceCode', function(req, res, next) {
    //res.send('respond with a resource   ' + req.params.deviceCode);
    var ref = new Firebase("https://bot11.firebaseio.com/cdkey/mynba2k16/" + req.params.keyCode);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码！Invalid cdkey");
        } else {
            if (codeState.val()["new"] == true) {
                res.send("您的注册码尚未使用，请先绑定当前设备！Your cdkey is new，please bind with your device firstly！")
            } else if (codeState.val()["deviceCode"] != req.params.deviceCode) {
                res.send("注册码已绑定其他设备，请先绑定当前设备再登录！This cdkey has been used by another device, please bind cdkey with this device firstly!");
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
        res.send("错误，请再试一次！Error, Please try again!");
    });
});
router.get('/mynba2k16/bind/:keyCode/:deviceCode', function(req, res) {
    var ref = new Firebase("https://bot11.firebaseio.com/cdkey/mynba2k16/" + req.params.keyCode);
    var ref1 = new Firebase("https://bot11.firebaseio.com/cdkey/mynba2k16/" + req.params.keyCode);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码，绑定失败。Invalid cdkey. Faill！");
        } else {
            var now= new Date();
            var timeSeconds = Math.ceil(now.getTime() / 1000);
            if (codeState.val()["new"] == true) {
                var validTime = timeSeconds + 31 * 24 * 60 * 60;
                ref1.update({"deviceCode" : req.params.deviceCode, "expireTime" : validTime, "new" : false}, function(error) {
                    if (error) {
                        res.send("错误，请再试一次！Error, Please try again!");
                    } else {
                        res.send("true");
                    }
                });
            } else if (codeState.val()["deviceCode"] == req.params.deviceCode) {
                res.send("true");
            } else {
                if (codeState.val()["expireTime"] < timeSeconds) {
                    res.send("注册码已经过期，请重新购买！This cdkey is expired, please buy a new one! Fail！")
                } else {
                    var updateValidTime = codeState.val()["expireTime"] - 4 * 60 * 60;
                    ref1.update({"deviceCode" : req.params.deviceCode, "expireTime" : updateValidTime}, function(error) {
                        if (error) {
                            res.send("错误，请再试一次！Error, Please try again!");
                        } else {
                           res.send("true");
                        }
                    });
                }
            }
        }
        //console.log(codeState.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("error");
    });
});
module.exports = router;
