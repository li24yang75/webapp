var express = require('express');
var router = express.Router();
var dbmail = require("./dbmail");


router.get('/verify/:keyCode/:oldSessionCode/:newSessionCode', function(req, res, next) {
    var ref = dbmail["ref"].child('mynba2k16F/cdkey/' + req.params.keyCode);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("Invalid cdkey！");
        } else {
            var now= new Date();
            var timeSeconds = Math.ceil(now.getTime() / 1000);
            if (codeState.val()["new"] == true) {

                ref.update({"preUpdate" : true, "preSessionCode" : req.params.newSessionCode}, function(error) {
                    if (error) {
                        res.send("Error, Please try again!");
                    } else {
                        res.send("true");
                    }
                });
            } else if (codeState.val()["expireTime"] < timeSeconds) {
                res.send("This cdkey is expired, please buy a new one!");
            } else if ((codeState.val()["sessionCode"] != null && codeState.val()["sessionCode"] == req.params.oldSessionCode)) {
                ref.update({"preSessionCode" : req.params.newSessionCode, "preUpdate" : true}, function(error) {
                    if (error) {
                        res.send("Error, Please try again!");
                    } else {
                        res.send("true");
                    }
                });
            } else if ((codeState.val()["preUpdate"] != null && codeState.val()["preUpdate"] == true && codeState.val()["preSessionCode"] == req.params.oldSessionCode)){

                ref.update({"preSessionCode" : req.params.newSessionCode, "preUpdate" : true, "sessionCode" : req.params.oldSessionCode}, function(error) {
                    if (error) {
                        res.send("Error, Please try again!");
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
        res.send("Error, Please try again!");
    });
});


router.get('/update/:keyCode/:oldSessionCode/:newSessionCode', function(req, res, next) {
    var ref = dbmail["ref"].child('mynba2k16F/cdkey/' + req.params.keyCode);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("Invalid cdkey！");
        } else {
            var now= new Date();
            var timeSeconds = Math.ceil(now.getTime() / 1000);
            if (codeState.val()["new"] == true) {
                var validTime = timeSeconds + 30 * 24 * 60 * 60;
                ref.update({"expireTime" : validTime, "new" : false, "preUpdate" : false,"sessionCode" : req.params.newSessionCode}, function(error) {
                    if (error) {
                        res.send("Error, Please try again!");
                    } else {
                        res.send("true");
                    }
                });
            } else if ((codeState.val()["preSessionCode"] != null && codeState.val()["preSessionCode"] == req.params.newSessionCode)) {
                ref.update({"preUpdate" : false,"sessionCode" : req.params.newSessionCode}, function(error) {
                    if (error) {
                        res.send("Error, Please try again!");
                    } else {
                        res.send("true");
                    }
                });
            } else {
                var validTime = codeState.val()["expireTime"] - 6 * 60 * 60;

                var penalty = codeState.val()["penalty"] == null ? 1 : codeState.val()["penalty"] + 1;

                ref.update({"sessionCode" : req.params.newSessionCode, "preUpdate" : false, "expireTime" : validTime, "penalty" : penalty}, function(error) {
                    if (error) {
                        res.send("Error, Please try again!");
                    } else {
                        res.send("true1");
                    }
                });
            }
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("Error, Please try again!");
    });
});


module.exports = router;