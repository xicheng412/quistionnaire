/**
 * Created by Xicheng on 2015/9/21.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://qxc:112211@ds041583.mongolab.com:41583/qxcdb');
module.exports = mongoose;