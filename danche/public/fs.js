!(function(doc, win) {
	var docEle = doc.documentElement,
	   evt = "onorientationchange" in window ? "orientationchange" : "resize",
		fn = function() {
		  var width = docEle.clientWidth;
		      width && (docEle.style.fontSize = 10 * (width / 375) + "px");
		 };
		     
		 win.addEventListener(evt, fn, false);
		 doc.addEventListener("DOMContentLoaded", fn, false);
		 
 }(document, window)); //设置字体大小



var onconfig = {

		//url_test1:"http://vc.yxwenge.com/yxvcity-admin-vc",
		//url_test2:"http://vc.yxwenge.com/yxvcitysaas-admin-saas"
	 
		url_test1:"http://testwan-vc.yxwenge.com:8080/yxvcity-admin-vc",
		url_test2:"http://testwan-vc.yxwenge.com:8080/yxvcitysaas-admin-saas"
	 
}

function sixpass(obj){
	 return /^[0-9]{6}$/.test(obj);
}

function userInspect(obj){
	//return /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(obj);
	return /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(obj);
}
function vfcode(obj){
	 return /^[0-9]{4}$/.test(obj);
}
function email(val){//邮箱
	return /^[a-z0-9][a-z0-9._-]*@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/.test(val);
}
function passInspect(obj){
	 return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(obj);
}


//解决弹出键盘页面高度变化bug
/*var viewHeight = window.innerHeight; //获取可视区域高度
$("input").focus(function(){
    $(".swapper").css("height",viewHeight);
}).blur(function(){
    $(".swapper").css("height","100%");
});
*/

function is_weixin(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return 1 ;
        } else {
            return 0;
        }
}//判断是否是微信端

function activeDate(obj) {
	var _this = this;
	var date = new Date(obj);
	var seperator1 = '年';
	var seperator2 = '月';
	var seperator3 = '日';
	var seperator4 = ':';
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var getSeconds = date.getSeconds()

	if (month >= 1 && month <= 9) {
		month = '0' + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = '0' + strDate;
	}
		if (hour >= 0 && hour <= 24) {
		hour =  hour;
	}
	if (minute >= 0 && minute <= 9) {
		minute = '0' + minute;
	} 
	if (getSeconds >= 0 && getSeconds <= 9) {
		getSeconds = '0'+ getSeconds;
	}
 
	return (currentDate = year + seperator1 + month + seperator2 + strDate +seperator3 +" "+ hour + seperator4 + minute +seperator4 + getSeconds );
}//时间戳转换年月日时分秒

function activeDate1(obj) {
	var _this = this;
	var date = new Date(obj);
	var seperator1 = '.';
	var seperator2 = '.';
	var seperator3 = '.';
	var seperator4 = ':';
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var getSeconds = date.getSeconds()

	if (month >= 1 && month <= 9) {
		month = '0' + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = '0' + strDate;
	}
		if (hour >= 0 && hour <= 24) {
		hour =  hour;
	}
	if (minute >= 0 && minute <= 9) {
		minute = '0' + minute;
	} 
	if (getSeconds >= 0 && getSeconds <= 9) {
		getSeconds = '0'+ getSeconds;
	}
 
	return (currentDate = year + seperator1 + month + seperator2 + strDate +seperator3 +" "+ hour + seperator4 + minute +seperator4 + getSeconds );
}//时间戳转换年月日时分秒


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

function zhuanhuan(){//支付页面按钮切换
	$('.pay_mode li').on('click',function(){
	 	$(this).addClass("onpay").siblings().removeClass("onpay");
	})
}



 
 