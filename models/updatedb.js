//connect mongodb
var mongoose = require('./mongoose.js');
var db = mongoose.connection;

//db on error
db.on('error', function (error) {
    console.log("create data error");
    console.log(error);
});

//set schma and model
var Schema = require('mongoose').Schema;

var btnPicked = new Schema({
    category: String,
    btn: String
});
var textInfo = new Schema({
    type: String,
    text: String
});

//two types of infomations
var quistions = new Schema({
    textInfo: [textInfo],
    btnInfo: [btnPicked]
});
var model = db.model('Orders', quistions);

db.saveData = function (data) {
    new model(data).save();
};
module.exports = db;