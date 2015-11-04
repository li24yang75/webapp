var express = require('express');
var router = express.Router();
var dbmail = require("./dbmail");


router.get('/verify/:keyCode/:randomCode', function(req, res, next) {
    var ref = dbmail["ref"].child('mynba2k16F/cdkey/' + req.params.keyCode);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("Invalid cdkey");
        } else {
            var now= new Date();
            var timeSeconds = Math.ceil(now.getTime() / 1000);
            if (codeState.val()["new"] == true) {
                var validTime = timeSeconds + 31 * 24 * 60 * 60;
                ref.update({"expireTime" : validTime, "new" : false, "randomCode" : req.params.randomCode}, function(error) {
                    if (error) {
                        res.send("Error, Please try again!");
                    } else {
                        res.send("true");
                    }
                });
            } else if (codeState.val()["expireTime"] < timeSeconds) {
                res.send("This cdkey is expired, please buy a new one!");
            } else {
                ref.update({"randomCode" : req.params.randomCode}, function(error) {
                    if (error) {
                        res.send("Error, Please try again!");
                    } else {
                        res.send("true");
                    }
                });
            }
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("Error, Please try again!");
    });
});


router.get('/getrandomcode/:keyCode/:randomCode', function(req, res, next) {
    var ref = dbmail["ref"].child('mynba2k16F/cdkey/' + req.params.keyCode);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("Invalid cdkey");
        } else {
            if (codeState.val()["randomCode"] == req.params.randomCode) {
                res.send("true");
            } else {
                res.send("Another device is using this cdkey. Log out.")
            }
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("Error, Please try again!");
    });
});

module.exports = router;