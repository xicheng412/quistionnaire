/**
 * Created by Xicheng on 2015/9/14.
 */
//�����ۼ����еı���ѡ��ļ۸�
var getPrice = function () {
    var price = 0;
    price += Number($("#basePrice").text());

    var temp = $(":checked");
    for (var a = 0; a < temp.length; a++) {
        //console.log(temp[a]);  //�鿴�������ʽ
        price += Number(temp[a].value);
    }
    return price;
};
//��ʾ�۸�ѡ���
var showPrice = function (price) {
    if (price == 0) {
        $('#calcprice').html("��ѡ����Ҫ�ķ�����Ŀ");
    } else {
        $('#calcprice').html("�ܼ�Ϊ <strong> " + $t.toString() + " </strong> Ԫ");
    }
};

//�޸İ�ť��ʽ
var btnstyle = function () {
    $("[type='radio']").parent().addClass("am-btn-primary");
    $("[type='checkbox']").parent().addClass("am-btn-warning");
};

//����POST��Ҫ�����б���ѡ��id
function genSubmitdata() {
    //������Ϣ������
    var infonode = {};

    //������Ϣ����
    var textinfo = $("[type='text']");
    for (var a = 1; a < textinfo.length; a++) {
        textinfo[a].parent().prev().text();
    }

};

//ÿһ��ѡ���ѡ��ʱ����Ӧ
$('[type="radio"],[type="checkbox"]').on('change', function () {
    showPrice(getPrice());

});