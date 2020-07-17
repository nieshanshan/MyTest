SUBSCRIBE="http://47.57.153.155:2029/getMail"//订阅
NZDUSD="http://47.57.153.155:2023/get-items"//数据
DATASET = "http://47.57.153.155:2023/get-all-items"//数据集合



function GetQueryString(name) {  //获取url中"?"符后的字符串
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}