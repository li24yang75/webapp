var express = require('express');
var router = express.Router();
var dbmail = require("./dbmail");


router.post('/auth', function (req, res, next) {

    var ipn = require('paypal-ipn');
    res.sendStatus(200);

    ipn.verify(req.body, {'allow_sandbox': true}, function callback(err, msg) {
        if (err) {
            console.log(err);
        } else {
            // Do stuff with original params here
            if (req.body.payment_status == 'Completed') {
                // Payment has been confirmed as completed
                // req.body["mc_gross"] == "1.00" I am not sure if I need to check the price or not.
                if (true) {
                    var refChildTrans = dbmail["ref"].child('mynba2k16F/trans/' + req.body["txn_id"]);
                    refChildTrans.once('value', function (dataSnapshot) {
                        // code to handle new value
                        if (dataSnapshot.val() == null) {
                            var newCdkey = "";
                            for (var j = 0; j < 32; j++) {
                                var digitChar = Math.floor(Math.random() * 36);
                                if (digitChar <= 25) {
                                    newCdkey = newCdkey + String.fromCharCode(65 + digitChar);

                                } else {
                                    newCdkey = newCdkey + (digitChar - 26);
                                }
                            }
                            refChildTrans.set({"cdkey": newCdkey, "info":req.body}, function (error) {
                                if (error) {
                                } else {
                                }
                            });
                            var refChildCdkey = dbmail["ref"].child('mynba2k16F/cdkey/' + newCdkey);
                            refChildCdkey.set({"tx": req.body["txn_id"], "expireTime": 1, "new": true, "deviceCode": 1}, function (error) {
                                if (error) {
                                } else {

                                    // send email to user
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
                                        function(err) { err && console.log(err)
                                        }
                                    );
                                }
                            });
                        }
                    }, function (err) {
                        // code to handle read error
                    });
                }
            }
        }
    });
});


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
