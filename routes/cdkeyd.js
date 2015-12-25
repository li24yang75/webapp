var express = require('express');
var router = express.Router();
var dbmail = require("./dbmail");


router.get('/verify/:keyCode/:oldSessionCode/:newSessionCode', function(req, res, next) {
    var ref = dbmail["ref"].child('cdkey/mynba2k16/' + req.params.keyCode);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码！");
        } else {
            var now= new Date();
            var timeSeconds = Math.ceil(now.getTime() / 1000);
            if (codeState.val()["new"] == true) {

                ref.update({"preUpdate" : true, "preSessionCode" : req.params.newSessionCode}, function(error) {
                    if (error) {
                        res.send("错误！再试一次！");
                    } else {
                        res.send("true");
                    }
                });
            } else if (codeState.val()["expireTime"] < timeSeconds) {
                res.send("注册码过期，请重新购买！");
            } else if ((codeState.val()["sessionCode"] != null && codeState.val()["sessionCode"] == req.params.oldSessionCode)) {
                ref.update({"preSessionCode" : req.params.newSessionCode, "preUpdate" : true}, function(error) {
                    if (error) {
                        res.send("错误！再试一次！");
                    } else {
                        res.send("true");
                    }
                });
            } else if ((codeState.val()["preUpdate"] != null && codeState.val()["preUpdate"] == true && codeState.val()["preSessionCode"] == req.params.oldSessionCode)){

                ref.update({"preSessionCode" : req.params.newSessionCode, "preUpdate" : true, "sessionCode" : req.params.oldSessionCode}, function(error) {
                    if (error) {
                        res.send("错误！再试一次！");
                    } else {
                        res.send("true");
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


router.get('/update/:keyCode/:oldSessionCode/:newSessionCode', function(req, res, next) {
    var ref = dbmail["ref"].child('cdkey/mynba2k16/' + req.params.keyCode);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码！");
        } else {
            var now= new Date();
            var timeSeconds = Math.ceil(now.getTime() / 1000);
            if (codeState.val()["new"] == true) {
                var validTime = timeSeconds + 31 * 24 * 60 * 60;
                ref.update({"expireTime" : validTime, "new" : false, "preUpdate" : false,"sessionCode" : req.params.newSessionCode}, function(error) {
                    if (error) {
                        res.send("错误！再试一次！");
                    } else {
                        res.send("true");
                    }
                });
            } else if ((codeState.val()["preSessionCode"] != null && codeState.val()["preSessionCode"] == req.params.newSessionCode)) {
                ref.update({"preUpdate" : false,"sessionCode" : req.params.newSessionCode}, function(error) {
                    if (error) {
                        res.send("错误！再试一次！");
                    } else {
                        res.send("true");
                    }
                });
            } else {
                var validTime = codeState.val()["expireTime"] - 4 * 60 * 60;
                ref.update({"sessionCode" : req.params.newSessionCode, "preUpdate" : false, "expireTime" : validTime}, function(error) {
                    if (error) {
                        res.send("错误！再试一次！");
                    } else {
                        res.send("true1");
                    }
                });
            }
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("错误！再试一次！");
    });
});


module.exports = router;