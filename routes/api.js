var express = require('express');
var router = express.Router();


router.get('/gettime', function (req, res, next) {
    res.end(new Date().getTime().toString().slice(0,10));
});


module.exports = router;