/**
 * Created by Xicheng on 2015/9/10.
 */
var mongoose = require('./mongoose.js');
var db = mongoose.connection;

//db on error
db.on('error', function (error) {
    console.log("get table error:");
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
var btnBlock = new Schema({
    btnBlockTitle: String,
    btnBlockDescription: String,
    btnsType: String,
    btnsName: String,
    btns: [btnSchema]
});
var inputBox = new Schema({
    boxId: String,
    boxPlaceholder: String,
    boxName: String,
    boxTitle: String
});

var quistions = new Schema({
    title: String,
    description: String,
    basePrice: Number,
    btnBlocks: [btnBlock],
    inputBoxs: [inputBox]
});

var model = db.model('quistions', quistions);

//functions
db.show = function () {
    console.log("show db 1");
    var temp = model.modelName;
    console.log("show db 2");
    console.log(temp);
};
db.showdocs = function () {
    model.find({}, function (err, docs) {
        console.log(docs[0]);
    });
};
db.getDb = function (pagetitle, func) {
    model.find({'title': pagetitle}, function (err, docs) {
        func(docs[0]);
    });
};

db.addinitdata = function () {
    model.find(function (err, data) {
        if (data.length) {
            return;
        }
        new model({
            title: "宣传片/广告片/创意影视",
            description: "try! this is a test!",
            basePrice: 2000,
            btnBlocks: [
                {
                    btnBlockTitle: "画质",
                    btnBlockDescription: "含摄影师，预计拍摄时长为3天",
                    btnsType: "Radio",
                    btnsName: "huazhi",
                    btns: [{
                        btnId: "huazhi1",
                        btnText: "EX-1",
                        description: "",
                        price: 3000
                    }, {
                        btnId: "huazhi2",
                        btnText: "5D Mark II",
                        description: "",
                        price: 4500
                    }, {
                        btnId: "huazhi3",
                        btnText: "C300或FS700",
                        description: "",
                        price: 6000
                    }, {
                        btnId: "huazhi4",
                        btnText: "无需拍摄",
                        description: "",
                        price: 0
                    }]
                },
                {
                    btnBlockTitle: "时长",
                    btnBlockDescription: "",
                    btnsType: "Checkbox",
                    btnsName: "shichang",
                    btns: [{
                        btnId: "shichang1",
                        btnText: "1分钟",
                        description: "",
                        price: 16000
                    }, {
                        btnId: "shichang2",
                        btnText: "3分钟",
                        description: "",
                        price: 2300
                    }, {
                        btnId: "shichang3",
                        btnText: "5分钟",
                        description: "",
                        price: 3500
                    }, {
                        btnId: "shichang4",
                        btnText: "8分钟-10分钟",
                        description: "",
                        price: 5800
                    }]
                }
            ],
            inputBoxs: [
                {
                    boxId: "didian",
                    boxPlaceholder: "预计拍摄的地点",
                    boxName: "didian",
                    boxTitle: "地点"
                }, {
                    boxId: "xingming",
                    boxPlaceholder: "输入您的姓名",
                    boxName: "xingming",
                    boxTitle: "姓名"
                }
            ]
        }).save();
    });
};
//db on error
db.on('error', function (error) {
    console.log(error);
});

module.exports = db;