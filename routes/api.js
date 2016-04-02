var express = require('express');
var router = express.Router();
var dbmail = require("./dbmail");

router.get('/gettime', function (req, res, next) {
    res.end(new Date().getTime().toString().slice(0,10));
});

router.get('/getrandomnum', function (req, res, next) {
    var randomNum = Math.floor(Math.random() * 100000 + 1);
    res.end("" + randomNum);
});

// China version
router.get('/getcdkeytime/:cdkey', function (req, res, next) {

    function add0(m){return m<10?'0'+m:m }
    function format(shijianchuo)
    {
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }
    var ref = dbmail["ref"].child('cdkey/mynba2k16/' + req.params.cdkey);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码！");
        } else {
            res.send(format((codeState.val()["expireTime"] + 60 * 60 * 8) * 1000)+" (北京时间)")
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("错误！再试一次！");
    });
});



//international version
router.get('/getcdkeytime1/:cdkey', function (req, res, next) {

    function add0(m){return m<10?'0'+m:m }
    function format(shijianchuo)
    {
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }
    var ref = dbmail["ref"].child('mynba2k16F/cdkey/' + req.params.cdkey);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码！");
        } else {
            res.send(format((codeState.val()["expireTime"] + 60 * 60 * 0) * 1000) + ' (PST)')
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("错误！再试一次！");
    });
});


//wwe
router.get('/getcdkeytime2/:cdkey', function (req, res, next) {

    function add0(m){return m<10?'0'+m:m }
    function format(shijianchuo)
    {
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }
    var ref = dbmail["ref"].child('wwe/cdkey/' + req.params.cdkey);
    ref.once("value", function(codeState) {
        if (codeState.val() == null) {
            res.send("无效的注册码！");
        } else {
            res.send(format((codeState.val()["expireTime"] + 60 * 60 * 0) * 1000) + ' (PST)')
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("错误！再试一次！");
    });
});



module.exports = router;