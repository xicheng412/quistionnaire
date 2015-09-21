/**
 * Created by Xicheng on 2015/9/14.
 */
//计算累加所有的被勾选项的价格
var getPrice = function () {
    var price = 0;
    price += Number($("#basePrice").text());

    var temp = $(":checked");
    for (var a = 0; a < temp.length; a++) {
        //console.log(temp[a]);  //查看输出的样式
        price += Number(temp[a].value);
    }
    return price;
};
//显示价格到选项框
var showPrice = function (price) {
    if (price == 0) {
        $('#calcprice').html("请选择需要的服务项目");
    } else {
        $('#calcprice').html("总价为 <strong> " + price.toString() + " </strong> 元");
    }
};

//修改按钮样式
var btnstyle = function () {
    $("[type='radio']").parent().addClass("am-btn-primary");
    $("[type='checkbox']").parent().addClass("am-btn-warning");
};

//生成输入的文字信息对应的json文件
function getTextInfo() {
    //文字信息生成
    var info = {};
    var temptext1 = "";//选项名称
    var temptext2 = "";//选项内容
    var textinfo = $("[type='text']:visible");//找到可见的文本框，存在不可见的
    //console.log(textinfo);//测试
    if (textinfo.length > 0) {
        for (var a = 0; a < textinfo.length; a++) {
            temptext1 = textinfo.eq(a).parent().prev().text();
            temptext2 = textinfo.eq(a).val();
            info[temptext1] = temptext2;
        }
    }
    return info;
};
//生成按钮信息对应的json文件
function getBtnInfo() {
    //按钮信息生成
    var info = {};
    var temptext1 = "";//所属类别
    var temptext2 = "";//选项所选
    var btninfo = $(":checked");
    var tempjson = {};//所选内容打包
    if (btninfo.length > 0) {
        for (var a = 0; a < btninfo.length; a++) {
            temptext1 = btninfo.eq(a).parent().parent().prev().prev().text();
            temptext2 = btninfo.eq(a).parent().text();
            temptext2 = temptext2.replace(/[\r\n ]/g, "");//去掉首位的空格回车等
            tempjson = {};
            tempjson['category'] = temptext1;
            tempjson['btn'] = temptext2;
            info[a.toString()] = tempjson;
        }
    }
    return info;
};
//生成POST需要的所有被勾选的id
function genSubmitdata() {
    //所有信息的容器
    var infonode = {};
    infonode["textinfo"] = getTextInfo();
    infonode["btninfo"] = getBtnInfo();
    return JSON.stringify(infonode);
};

//每一个选项被勾选的时候响应
$('[type="radio"],[type="checkbox"]').on('change', function () {
    showPrice(getPrice());
    $("#hiddenUpdate").val(genSubmitdata());
});

btnstyle();