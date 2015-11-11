var express = require('express');
var router = express.Router();
var dbmail = require("./dbmail");


router.get('/verify/:keyCode/:randomCode', function(req, res, next) {
    var ref = dbmail["ref"].child('cdkey/mynba2k16/' + req.params.keyCode);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码！");
        } else {
            var now= new Date();
            var timeSeconds = Math.ceil(now.getTime() / 1000);
            if (codeState.val()["new"] == true) {
                var validTime = timeSeconds + 31 * 24 * 60 * 60;
                ref.update({"expireTime" : validTime, "new" : false, "randomCode" : req.params.randomCode}, function(error) {
                    if (error) {
                        res.send("错误！再试一次！");
                    } else {
                        res.send("true");
                    }
                });
            } else if (codeState.val()["expireTime"] < timeSeconds) {
                res.send("注册码过期，请重新购买！");
            } else {
                ref.update({"randomCode" : req.params.randomCode}, function(error) {
                    if (error) {
                        res.send("错误！再试一次！");
                    } else {
                        res.send("true");
                    }
                });
            }
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("错误！再试一次！");
    });
});




router.get('/newverify/:keyCode/:deviceCode', function(req, res, next) {
    var ref = dbmail["ref"].child('cdkey/mynba2k16/' + req.params.keyCode);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码！");
        } else {
            var now= new Date();
            var timeSeconds = Math.ceil(now.getTime() / 1000);
            if (codeState.val()["new"] == true) {
                var validTime = timeSeconds + 31 * 24 * 60 * 60;
                ref.update({"expireTime" : validTime, "new" : false, "deviceCode" : req.params.deviceCode}, function(error) {
                    if (error) {
                        res.send("错误！再试一次！");
                    } else {
                        res.send("true");
                    }
                });
            } else if (codeState.val()["expireTime"] < timeSeconds) {
                res.send("注册码过期，请重新购买！");
            } else if (codeState.val()["deviceCode"] != req.params.deviceCode) {
                var validTime = codeState.val()["expireTime"] - 4 * 60 * 60;
                ref.update({"deviceCode" : req.params.deviceCode, "expireTime" : validTime}, function(error) {
                    if (error) {
                        res.send("错误！再试一次！");
                    } else {
                        res.send("true1");
                    }
                });
            } else {
                res.send("true");
            }
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("错误！再试一次！");
    });
});





router.get('/getrandomcode/:keyCode/:randomCode', function(req, res, next) {
    var ref = dbmail["ref"].child('cdkey/mynba2k16/' + req.params.keyCode +  "/randomCode");
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码！");
        } else {
            if (codeState.val() == req.params.randomCode) {
                res.send("true");
            } else {
                res.send("注册码正在被使用，退出！")
            }
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("错误！再试一次！");
    });
});

module.exports = router;