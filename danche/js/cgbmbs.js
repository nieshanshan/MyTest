var citizenId =null;
var yxwhOpenID =null;
var eny = null;
var isOrderCount =null;
var orderNum =null;
var orderMoney =null;
var orderEnergy =null;
var orderType =null;
var signUpPayType = null;
var orderId = null;
var orderNo = null;
if(citizenId == null){
	citizenId = GetQueryString("citizenId");
}
if(yxwhOpenID == null){
	yxwhOpenID = GetQueryString("yxwhOpenID");//OpenID
}
if(eny == null){
	eny = GetQueryString("eny");
}
if(isOrderCount == null){
	isOrderCount = GetQueryString("isOrderCount");
}
if(orderNum == null){
	orderNum = GetQueryString("orderNum");
}
if(orderMoney == null){
	orderMoney = GetQueryString("orderMoney");
}
if(orderEnergy == null){
	orderEnergy = GetQueryString("orderEnergy");
}
if(orderType == null){
	orderType = GetQueryString("orderType");
}
if(signUpPayType == null){
	signUpPayType = GetQueryString("signUpPayType");
}
if(orderId == null){
	orderId = GetQueryString("orderId");
}
if(orderNo == null){
	orderNo = GetQueryString("orderNo");
}
 
/**
 * 根据类型进行界面初始化
 *
 */
function chushihua(){
	//alert("初始化")
	var xd_ng = isOrderCount;  //总次数
	var dq_ng =orderNum;   //当前用户已购买的次数
	var hou_shuliang =xd_ng-dq_ng;
	 
 	var orderneng = orderEnergy;
	$('.jqne').append(orderneng);
	   
	var orderqian =orderMoney;
	$('.payqianSpan').append(orderqian);
	
	var energy2w = eny;
	$('.gr').append(energy2w);//个人能量 
 
 	var zongpay = isOrderCount
		$('.zong').append(zongpay);//总次数

	var danpay = hou_shuliang
		$('.dan').append(danpay);// 剩余可购买次数
	
	if(orderType == null){
		orderType = orderType;
	}

	if(orderType == '2'){
		$('.font_text').text('重购费用：￥');
		$('.fonttext').text('重购');
		
	}else if(orderType == '3'){
		$('.font_text').text('补码费用：￥');
		$('.fonttext').text('补码');
		
	}else if(orderType == '4'){
		$('.pay_text_san').css('display','none');
	}

  	var signUpPayTypew =signUpPayType;
  	//支持的支付方式1，现金和微信 2,能量 3 现金

 	if(signUpPayTypew == 1){
 		zhuanhuan();//切换支付方式按钮

 	}else if(signUpPayTypew ==2){
 		$('.pay_mode li').eq(0).addClass('onpay').siblings().removeClass('onpay');

 	}else if(signUpPayTypew ==3){
 		$('.pay_mode li').eq(1).addClass('onpay').siblings().removeClass('onpay');	
 	};	
};
chushihua();

/**
 * 支付接口
 */
function zhifu(){
	payType = $('.onpay').attr('payType');
	if(payType == 3){
		ajaxpayset();
	}else if(payType == 1){
		if(parseInt(eny)<parseInt(orderEnergy)){
			var alrr = $('.promptBox2').show().html('能量不足,请去个人中心充值');
			setTimeout(function(){alrr.fadeOut()},1000); 
		}else{
			$(".nnegliangkuang2").show();	
		};
		$('.nlzfanniu2').click(function(){
			$(".nnegliangkuang2").hide();
			ajaxpayset();
		});
		
	};
};

function ajaxpayset(){
 	$.ajax({
		url:onconfig.url_test1+"/rest/depokerOrder/depokerPay",//德扑赛事支付接口
		dataType: "JSONP",
		type: "GET",
		data: {
			'orderType':1,
			'payType':payType, 
			'orderId':orderId,
			'openId':yxwhOpenID,
			'citizenId':citizenId
		}, 
		success: function(res) {
	//alert("payType========="+payType+"=====orderId"+orderId+"=========orderNo"+orderNo+"=========citizenId"+citizenId+"======openID"+yxwhOpenID);
			if(res.code == '1000'){
				if(payType == 3){ //微信支付
					WX(res);
				}else if(payType == 1){   //能量支付
					if (res.datas == 1) {
						/*$('.nnegliangkuang2').show();*/
						//$('.nlzfanniu2').click(function(){
							//$('.nnegliangkuang2').hide();
							//遵循uml时序图原则 先清空，再设置
							//window.localStorage.setItem("orderFlag","");//d
						    //window.localStorage.setItem("orderFlag",orderType);//dingdanid
							window.location.href="http://testwan-vc.yxwenge.com/danche/cgbmbssucces.html?state=1&orderFlag="+orderType+"&orderNo="+orderNo;
						//})
					} 	
				}
			}else if(res.code == '1051'){//能量不足
					var alrr = $('.promptBox2').show().html('能量不足,请去个人中心充值');
					setTimeout(function(){alrr.fadeOut()},1000);

						
			}else {
				alert(res.message);
			}
		},
		error:function(err) {
				alert("网络异常") 
		}
	}) 	
}


//微信支付函数
function WX(res){
		var payData = res.datas;
		function onBridgeReady() {//微信收银台
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				{
		 			appId: payData.appId, //公众号名称，由商户传入
					nonceStr: payData.nonceStr, //随机串
					package: payData.package, //统一下单接口返回的prepay_id参数值，提交格式如
					signType: 'MD5',
					paySign: payData.paySign, //微信签名  后台
					timeStamp: payData.timeStamp //时间戳，自1970年以来的秒数
				},
				function(res) {
					console.log(res)
					//微信支付成功后的操作，但是不一定会成功返回
					if (res.err_msg == 'get_brand_wcpay_request:ok') {
							//遵循uml时序图原则 先清空，再设置
						//window.localStorage.setItem("orderFlag","");//d	
					   // window.localStorage.setItem("orderFlag",orderType);//dingdanid
						window.location.href="http://testwan-vc.yxwenge.com/danche/cgbmbssucces.html?state=1&orderFlag="+orderType+"&orderNo="+orderNo;
					}
				}
			);
		};
		if (typeof WeixinJSBridge == 'undefined') {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
		} else {
			onBridgeReady();
		};

}


 

/*
返回监听事件
 */
$(function(){  //返回监听事件
	    pushHistory();  
	    window.addEventListener("popstate", function(e) {  
	  		if(is_weixin() == "1"){    
           var urlAdd =encodeURIComponent(encodeURIComponent(encodeURIComponent(String("http://testwan-vc.yxwenge.com/danche/paymentsucces.html?citizenId="+citizenId+'&yxwhOpenID='+yxwhOpenID+'&eny='+eny)))); 
            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6be7be4a05a0f08c&redirect_uri=http://vc.yxwenge.com/yxvcity-admin-vc/redirect/"+urlAdd+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
		    }else{
		      window.location.href = "http://testwan-vc.yxwenge.com/danche/paymentsucces.html?citizenId="+citizenId+'&yxwhOpenID='+yxwhOpenID+'&eny='+eny;
		    }
	        
	}, false);  
	    function pushHistory() {   
	        var state = {  
	            title: "title",  
	            url: "http://testwan-vc.yxwenge.com/cgbmbs.html"  
	        };  
	        window.history.pushState(state, "title", "http://testwan-vc.yxwenge.com/danche/cgbmbs.html");  
	    }  
	      
	}); 