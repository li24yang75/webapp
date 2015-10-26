var express = require('express');
var router = express.Router();
var Firebase = require("firebase");
var firebasesecret = "sssss"
var ref = new Firebase("https://bot12.firebaseio.com");

ref.authWithCustomToken("1111111", function(error, authData) {
    if (error) {
        console.log("Authentication Failed!", error);
    } else {
        console.log("Authenticated successfully with payload:", authData);
    }
});




/* GET home page. */
router.get('/', function(req, res, next) {
  //var now= new Date();
  //var timeSeconds = Math.ceil(now.getTime() / 1000);
  //console.log(timeSeconds);
  res.render('index', { title: 'Express' });

console.log(firebasesecret);



    ref.once("value", function(codeState) {
        console.log(codeState.val());
    });




});


router.get('/add1', function(req, res, next) {
  //var now= new Date();
  //var timeSeconds = Math.ceil(now.getTime() / 1000);
  //console.log(timeSeconds);

    var now= new Date();
    var timeSeconds = Math.ceil(now.getTime() / 1000);
    for (var i = 0; i < 50; i++) {
        var str1 = "";
        for (var j = 0; j < 32; j++) {
            var aa = Math.floor(Math.random() * 36);
            if (aa <= 25) {
                str1 = str1 + String.fromCharCode(65 + aa);

            } else {
                str1 = str1 + (aa - 26);
            }

        }
        console.log(str1)
        var ref = new Firebase("https://bot11.firebaseio.com/cdkey/mynba2k16/" + str1);
        ref.set({"deviceCode" : 1, "expireTime" : 1, "new" : true}, function(error) {
            if (error) {

            } else {

            }
        });
    }

});

module.exports = router;
