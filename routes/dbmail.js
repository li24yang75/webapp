/**
 * Created by zhenghui on 10/31/15.
 */
var dbmail = module.exports = {};
var Firebase = require("firebase");
var Mailgun = require('mailgun').Mailgun;
var fs = require("fs");

fs.readFile( __dirname + "/../" + "serverconf.json", 'utf8', function (err, data) {
    var firebasesecret = JSON.parse(data)["FireBaseSecret"];
    var mailgunapikey = JSON.parse(data)["MailGunApiKey"];
    dbmail["mg"] = new Mailgun(mailgunapikey);
    dbmail["ref"] = new Firebase("https://bot11.firebaseio.com");
    dbmail["ref"].authWithCustomToken(firebasesecret, function (error, authData) {
        if (error) {
            console.log("Authentication Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
        }
    });
});

