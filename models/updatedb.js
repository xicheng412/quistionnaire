//connect mongodb
var mongoose = require('./mongoose.js');
var db = mongoose.connection;
//db on error
db.on('error', function (error) {
    console.log(error);
});

//set schma and model
var Schema = require('mongoose').Schema;

var btnSchema = new Schema({
    btnId: String,
    btnText: String,
    description: String,
    price: Number
});
var btnPicked = new Schema({
    btnBlockTitle: String,
    btnBlockDescription: String,
    btnsType: String,
    btnsName: String,
    btns: [btnSchema]
});
var textInfo = new Schema({
    type: String,
    text: String
});

//two types of infomation
var customer = new Schema({
    textInfo: [textInfo],
    orderRecord: [btnPicked]
});
var model = db.model('Orders', quistions);

module.exports = db;