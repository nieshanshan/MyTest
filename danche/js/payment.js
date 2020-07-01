var citizenId =null;
var signUpPayTypew =null;
var orderId = null;
var yxwhOpenID=null;
var energy = null;
if(citizenId == null){
	citizenId = GetQueryString("citizenId");
}
if(signUpPayTypew == null){
	signUpPayTypew = GetQueryString("signUpPayTypew");
}
if(orderId == null){
	orderId = GetQueryString("orderId");
}
if(yxwhOpenID == null){
	yxwhOpenID = GetQueryString("yxwhOpenID");
}
if(energy == null){
	energy = GetQueryString("energy");
}

/*
	判断支持的支付方式1，现金和微信 2,能量 3 现金   zhuanhuan()按钮切换
 */
	if(signUpPayTypew ==1){
		zhuanhuan(); 
	}else if(signUpPayTypew ==2){

	}else if(signUpPayTypew ==3){
		$('.pay_mode li').eq(1).addClass('onpay').siblings().removeClass('onpay'); 	
	}
/*
	支付按钮点击事件
 */
	$('.payOff').click(function(){//支付
		typayzf();
	})
 
/*
	页面展示内容
 */
	var signUpMoney = localStorage.getItem('signUpMoney');
	var signUpMoney ='<span>价值'+signUpMoney+'元</span>';
	$('.pay_mony').append(signUpMoney);//现金

	var signUpenergy = localStorage.getItem('signUpenergy');
	var signUpenergy =signUpenergy;
	$('.nangpay').append(signUpenergy);//报名所需能量 

	//var energy = localStorage.getItem('energyp');
	var energy = energy;
	$('.gr_nengliang').append(energy);//用户个人能量  

/*
	能量支付时判断能量是否足够
 */
function typayzf(){
	var payType =$('.onpay').attr('payType');//拿到html页面定义的paytype（支付方式）值
	if(payType==3){
		//N_zhifu(payType,openID,cID);
		N_zhifu(payType,yxwhOpenID,citizenId);
	}else if(payType==1){
		if(parseInt(energy)<parseInt(signUpenergy)){
				var alrr = $('.promptBox').show().html('能量不足,请去个人中心充值');
				setTimeout(function(){alrr.fadeOut()},1000);
		}else{
				$(".nnegliangkuang").show();	
		};
		$('.nlzfanniu').click(function(){
			$(".nnegliangkuang").hide();
			//N_zhifu(payType,openID,cID);
			N_zhifu(payType,yxwhOpenID,citizenId);
		});
	}
};

/*
	支付（接口）方法  3微信支付  1能量支付
 */
	//function N_zhifu(payType,openID,cID){
	function N_zhifu(payType,yxwhOpenID,citizenId){
	$.ajax({
		url:onconfig.url_test1+"/rest/depokerOrder/depokerPay", 
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
			console.log(res);
			if(res.code == '1000'){
				if(payType == 3){
					WXpay(res);
				}else if(payType == 1){
					window.location.href='http://testwan-vc.yxwenge.com/danche/paymentsucces.html?citizenId='+citizenId+'&yxwhOpenID='+yxwhOpenID//跳转成功页面 
				};
			}else if(res.code == '1051'){
				var alrr = $('.promptBox').show().html('能量不足,请去个人中心充值');
				setTimeout(function(){alrr.fadeOut()},1000);
			};
		},
		error:function(err){alert("网络异常")}
	});
};

/*
	微信支付
 */
function WXpay(res){
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
					 window.location.href='http://testwan-vc.yxwenge.com/danche/paymentsucces.html?citizenId='+citizenId+'&yxwhOpenID='+yxwhOpenID;
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
};
 


$(function(){  //返回监听事件
pushHistory();  
window.addEventListener("popstate", function(e) {  
	//window.location.href="http://testwan-vc.yxwenge.com/danche/signup.html";
    //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能  
    if(is_weixin() == "1"){    
            var urlAdd =encodeURIComponent(encodeURIComponent(encodeURIComponent(String("http://testwan-vc.yxwenge.com/danche/signup.html")))); 
            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6be7be4a05a0f08c&redirect_uri=http://vc.yxwenge.com/yxvcity-admin-vc/redirect/"+urlAdd+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        }else{
          window.location.href = "http://testwan-vc.yxwenge.com/danche/signup.html";
        }

}, false);  
function pushHistory() {   
    var state = {  
        title: "title",  
        url: "http://testwan-vc.yxwenge.com/payment.html"  
    };  
    window.history.pushState(state, "title", "http://testwan-vc.yxwenge.com/danche/payment.html");  
}  
  
}); 