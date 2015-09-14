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
        $('#calcprice').html("总价为 <strong> " + $t.toString() + " </strong> 元");
    }
};

//修改按钮样式
var btnstyle = function () {
    $("[type='radio']").parent().addClass("am-btn-primary");
    $("[type='checkbox']").parent().addClass("am-btn-warning");
};

//生成POST需要的所有被勾选的id
function genSubmitdata() {
    //所有信息的容器
    var infonode = {};

    //文字信息生成
    var textinfo = $("[type='text']");
    for (var a = 1; a < textinfo.length; a++) {
        textinfo[a].parent().prev().text();
    }

};

//每一个选项被勾选的时候响应
$('[type="radio"],[type="checkbox"]').on('change', function () {
    showPrice(getPrice());

});