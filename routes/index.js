var express = require('express');
var router = express.Router();
var pageinfo = {};
var mydb = require('../models/table.js');
var updatedb=require('../models/updatedb.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/success', function (req, res) {
    res.render('success');
});

/* GET quistions page. */
router.use(function (req, res, next) {
    mydb.addinitdata();
    mydb.getDb("宣传片/广告片/创意影视", function (docs) {
        pageinfo = docs;
        console.log("search finished!");
        next();
    });
});

router.get('/quistionnaire', function (req, res, next) {
    res.render('quistionnaire', pageinfo);
});

/* POST info. */
router.use(function(req,res,next){
    var temptext=req.body.hiddenUpdate;
    temptext='('+temptext+')';
    updatedb.saveData(eval(temptext),next);
});
router.post('/process', function (req, res) {
    res.redirect(303, '/success');
});
module.exports = router;