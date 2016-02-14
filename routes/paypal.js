var express = require('express');
var router = express.Router();
var dbmail = require("./dbmail");

var request = require('request');
// var RSVP = require('rsvp');


var fs = require("fs");


//request('http://www.google.com', function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//        console.log(body) // Show the HTML for the Google homepage.
//    }
//})

//var formData = {
//    VERSION : '95.0',
//    USER: 'li24yang75_api1.163.com',
//    PWD: 'ADPK35FEEWKF7N2C',
//    SIGNATURE: 'A0znA.um8IcpEqSlUyqkVRaIYzH5AftRI.Oz6VZ5eZwQIWpmzbgNZi7N',
//    METHOD: 'TransactionSearch',
//    STARTDATE: '2016-01-27T05:38:48Z'
//};
//
//
//request.post({url:'https://api-3t.paypal.com/nvp', form: formData}, function(err,httpResponse,body){
//    if (!err && httpResponse.statusCode == 200) {
//        console.log(body);
//        console.log(decodeURI(body));
//    }
//})
//
//
//
//setInterval(function(){
//
//
//}, 2000);


router.post('/auth', function (req, res, next) {
    res.sendStatus(200);
    var ipn = require('paypal-ipn');
    write("-----------------------------------------------------------------------------------------------------------");
    write(JSON.stringify(req.body));
    ipn.verify(req.body, {'allow_sandbox': false}, function callback(err, msg) {
        if (err) {
            write(JSON.stringify(err));
            write(JSON.stringify(msg));
        } else {
            write("paypal right!");
            // Do stuff with original params here
            if (req.body.payment_status == 'Completed') {
                write("paypal completed!");
                // Payment has been confirmed as completed
                // req.body["mc_gross"] == "1.00" I am not sure if I need to check the price or not.
                if (req.body["item_name"] == "Mynba2k16Bot" ) {
                    var refChildTrans = dbmail["ref"].child('mynba2k16F/trans/' + req.body["txn_id"]);
                    refChildTrans.once('value', function (dataSnapshot) {
                        // code to handle new value
                        write("firebase txn_id");
                        if (dataSnapshot.val() == null) {
                            write("firebase txn_id null");
                            var newCdkey = "";
                            for (var j = 0; j < 32; j++) {
                                var digitChar = Math.floor(Math.random() * 36);
                                if (digitChar <= 25) {
                                    newCdkey = newCdkey + String.fromCharCode(65 + digitChar);
                                } else {
                                    newCdkey = newCdkey + (digitChar - 26);
                                }
                            }
                            refChildTrans.set({"cdkey": newCdkey, "info":req.body, "isEmailSend" : false}, function (error) {
                                write("firebase set txn_id ");

                                if (error) {
                                    write(error);
                                } else {
                                    var refChildCdkey = dbmail["ref"].child('mynba2k16F/cdkey/' + newCdkey);
                                    refChildCdkey.set({"tx": req.body["txn_id"], "expireTime": 1, "new": true}, function (error) {
                                        write("firebase set cdkey ");
                                        if (error) {
                                            write(error);
                                        } else {
                                            // send email to user
                                            write("send email!");
                                            var emailTo;
                                            if (req.body["payer_email"] == req.body["custom"]) {
                                                emailTo = req.body["payer_email"];
                                            } else {
                                                emailTo = [req.body["payer_email"], req.body["custom"]];
                                            }
                                            var emailpart1 = '<div style = "width: 558px; height: 310px; border: 1px solid darkgrey; border-radius: 3px; margin:auto">' +
                                                '<div style = "width: 558px; height: 60px; border-radius: 3px; background-color: #3785b9"> <div style ="width:280px;height: 60px;font-size:45px; margin:auto; color:White">Your CDKEY</div> </div>' +
                                                '<div style ="padding: 30px; font-size:20px"> <p>Thank you for your payment. This is your CDKEY:</p><p><strong>';

                                            var emailpart2 = '</strong></p><p>Happy emailing, Mynba2k16Bot Team</p><p>Please visit <a href = "http://www.bot11.com">www.bot11.com</a> for more information.</p></div></div>';

                                            dbmail["mg"].sendRaw('mynba2k16@bot11.com',
                                                emailTo,
                                                'From: mynba2k16@bot11.com' +
                                                '\nTo: ' + emailTo +
                                                '\nContent-Type: text/html; charset=utf-8' +
                                                '\nSubject: Mynba2k16Bot CDKEY From BOT11.COM' +
                                                '\n\n' + emailpart1 + newCdkey + emailpart2,
                                                function (err) {
                                                    if (err) {
                                                        write(err);
                                                    } else {
                                                        refChildTrans.update({"isEmailSend": true}, function (error) {
                                                            if (error) {
                                                                write(error);
                                                            } else {
                                                                console.log("success!");
                                                            }
                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    });
                                }
                            });
                        }
                    }, function (err) {
                        write(err);
                        // code to handle read error
                    });
                }
            }
        }
    });
});



function write(str) {

    str = "\r\n" + str;
    fs.appendFile(__dirname + "/../" + "runlogs.txt", str, function(err){
        if(err) {

        }
        else {

        }

    });
}



//router.post('/auth', function (req, res, next) {
//    res.sendStatus(200);
//    paypalVerify(req).then(createCdkey).then(createCdkey);
//
//});
//
//
//
//
//
//
//
//
//function paypalVerify(req) {
//    var promise = new RSVP.Promise(function(resolve, reject){
//        var ipn = require('paypal-ipn');
//        ipn.verify(req.body, {'allow_sandbox': true}, function callback(err, msg) {
//            if (err) {
//                reject(err);
//            } else {
//                if (req.body.payment_status == 'Completed' && req.body["mc_gross"] == "1.00" ) {
//                    resolve(req);
//                }
//            }
//        });
//    });
//    return promise;
//}
//
//
//function writeErrorLog(err) {
//    console.log(err);
//}
//
//function createCdkey(req) {
//    var promise = new RSVP.Promise(function(resolve, reject){
//        var refChildTrans = dbmail["ref"].child('mynba2k16F1/trans/' + req.body["txn_id"]);
//        refChildTrans.once('value', function (dataSnapshot) {
//            if (dataSnapshot.val() == null) {
//                var newCdkey = "";
//                for (var j = 0; j < 32; j++) {
//                    var digitChar = Math.floor(Math.random() * 36);
//                    if (digitChar <= 25) {
//                        newCdkey = newCdkey + String.fromCharCode(65 + digitChar);
//                    } else {
//                        newCdkey = newCdkey + (digitChar - 26);
//                    }
//                }
//                refChildTrans.set({"cdkey": newCdkey, "info":req.body, "isEmailSend" : false}, function (error) {
//                    if (error) {
//                    } else {
//                        var refChildCdkey = dbmail["ref"].child('mynba2k16F1/cdkey/' + newCdkey);
//                        refChildCdkey.set({"tx": req.body["txn_id"], "expireTime": 1, "new": true}, function (error) {
//                            if (error) {
//                            } else {
//                                // send email to user
//                                var emailTo;
//                                if (req.body["payer_email"] == req.body["custom"]) {
//                                    emailTo = req.body["payer_email"];
//                                } else {
//                                    emailTo = [req.body["payer_email"], req.body["custom"]];
//                                }
//                                var emailpart1 = '<div style = "width: 558px; height: 310px; border: 1px solid darkgrey; border-radius: 3px; margin:auto">' +
//                                    '<div style = "width: 558px; height: 60px; border-radius: 3px; background-color: #3785b9"> <div style ="width:280px;height: 60px;font-size:45px; margin:auto; color:White">Your CDKEY</div> </div>' +
//                                    '<div style ="padding: 30px; font-size:20px"> <p>Thank you for your payment. This is your CDKEY:</p><p><strong>';
//
//                                var emailpart2 = '</strong></p><p>Happy emailing, Mynba2k16Bot Team</p><p>Please visit <a href = "http://www.bot11.com">www.bot11.com</a> for more information.</p></div></div>';
//
//                                dbmail["mg"].sendRaw('mynba2k16@bot11.com',
//                                    emailTo,
//                                    'From: mynba2k16@bot11.com' +
//                                    '\nTo: ' + emailTo +
//                                    '\nContent-Type: text/html; charset=utf-8' +
//                                    '\nSubject: Mynba2k16Bot CDKEY From BOT11.COM' +
//                                    '\n\n' + emailpart1 + newCdkey + emailpart2,
//                                    function(err) {
//                                        if (error) {
//                                        } else {
//                                            refChildTrans.update({"isEmailSend" : true}, function(error) {
//                                                if (error) {
//                                                } else {
//                                                    console.log("success!");
//                                                }
//                                            });
//                                        }
//                                    }
//                                );
//                            }
//                        });
//                    }
//                });
//            } else if (dataSnapshot.val()["isEmailSend"] == false) {
//
//
//            }
//        }, function (err) {
//            // code to handle read error
//        });
//    });
//    return promise;
//}



router.get('/show', function (req, res, next) {
    var refChildTrans = dbmail["ref"].child('mynba2k16F/trans/' + req.query["tx"]);
    refChildTrans.on('value', function (dataSnapshot) {
        if (dataSnapshot.val() != null) {
            res.render('emailTemplate', {newCdkey : dataSnapshot.val()["cdkey"]});
            refChildTrans.off();
        } else {
        }
    }, function (err) {
        // code to handle read error
    });
    setTimeout(function(){
        refChildTrans.off();
    }, 40000);
});


module.exports = router;
