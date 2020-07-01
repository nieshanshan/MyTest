var hreid = null,
	citizenId= null,
	openGzhId= null,
	yue=null,
	payType=null,
	payPass = null,
	phone=null,
	newcold=null,
	oldcold =null,
	usercold=null,
	payPassword=null,
	payFlag = "0",
	//openclose = "0"; 
	openclose = ["0","1"],
	opencloseValue="",
	Bback='0',
	nlback="0";

	//0 是支付密码  1 是设置支付密码
if(citizenId == null){
	citizenId = GetQueryString("citizenId");
}
if(openGzhId == null){
	openGzhId = GetQueryString("yxwhOpenID");
}
if(yue == null){
	yue = GetQueryString("yue");
}
if(phone == null){
	phone = GetQueryString("phone");
}
if(payPassword == null){
	payPassword = GetQueryString("payPassword");
}
//alert("citizenId:"+citizenId+"openGzhId:"+openGzhId+"yue:"+yue+"phone"+phone+"payPassword"+payPassword);
//
 
/**
 * [根据分页页码和个数 调用购买能量列表接口]
 */
function NormByPage(){
	$.ajax({
		url:onconfig.url_test1+"/rest/buyEnergyNorm/findBuyEnergyNormByPage",
		dataType: "JSONP", 
		type: "GET",
		data: {
			"pageNo":1,
			"pageSize":100
		},
		success: function(res) {
			console.log(res);
			for(var i=0; i<res.datas.length; i++){
				 var NEngid = res.datas[i].id;
				  $('.wapEngUP_ul li:first').addClass('onEng');
				  hreid = $('.wapEngUP_ul li:first').attr('EngumId');
					var EngCzhtml = '<li EngumId='+NEngid+'><div class="Engleft"><p>'+res.datas[i].energy+'能量<strong></strong></p></div><div class="Engright"><p>￥'+res.datas[i].money+'</p><em></em></div></li>';
					$('.wapEngUP_ul').append(EngCzhtml);
			};
			$('.downEol_gr').html('<b>余额：'+yue+'</b>');
		},
		error:function(err) {
			alert("网络异常");
		}
	});
}

//初始化,购买能量列表
NormByPage();


/**
 	能量点击事件
 */

//hreid = 'fc1e19dee12149798916b6b5decabb9b';
$('body').on('click','.wapEngUP_ul li',function(){	
	hreid = $(this).attr('EngumId');
	//alert("hreid----"+hreid);
	$(this).addClass("onEng").siblings().removeClass("onEng");
});



/**
 	支付方式点击事件
 */

function Paythod(){
	payType = 3;
	$('body').on('click','.downEol li',function(){	
		$(this).addClass("onYemEng").siblings().removeClass("onYemEng");
		payType = $('.onYemEng').attr("payType") ;
		//alert(payType) ;
	});
};
//初始化,支付方式点击事件
Paythod();


/**
 * 能量充值按钮点击事件
 */
$(".button_lick").click(function(){
	//判断余额是否为0 0就置灰(tishi)；
	//判断是否是余额还是微信 微信就直接调用zhifuajax(); 余额就弹出余额的弹框 然后。。。进行zhifuajax();
	//根据个人中心的密码进行判断用户是否有密码  有 则进行支付密码弹框  无 则到设置支付密码弹框
	//

	if(payType =='3'){
		zhifuajax(payType);
	}else if(payType =='2'){//余额支付
		if(payFlag == "0"){
			//alert("有支付密码")
			//$('#paswordcolduser').val('');
			if(i>="0"){//同//$('#paswordcolduser').val('');
				$(".mm_box li").removeClass("mmdd");
				$(".mm_box li").attr("data","");
				i = 0;
			};
			$('.newcold').val('');
			$('.oldcold').val('');
			$('.usercold').val('');
			//alert(payPassword+"----------------------payPassword")
			if(payPassword == null || payPassword == ""){
				$(document).attr("title","设置支付密码");
				setopenbut();
					 
			}else{
				$(document).attr("title","支付密码");
				openbut();
			}
		}else if(payFlag == "1"){
				$(document).attr("title","支付密码");
				openbut();
		};

	};

});





/**
 * 支付密码 开启、关闭按钮
 */
function openbut(){
	nlback = "1";
	$('.passBOx').show();//支付密码弹框显示
	opencloseValue=openclose[0];
}
function closebut(){
			//$('#paswordcolduser').val('');
			$('.newcold').val('');
			$('.oldcold').val('');
			$('.usercold').val('');
			if(i>="0"){//同//$('#paswordcolduser').val('');
				$(".mm_box li").removeClass("mmdd");
				$(".mm_box li").attr("data","");
				i = 0;
			};

	nlback = "0";
	$('.passBOx').hide();//支付密码弹框隐藏 
	
}

/**
 * 设置支付密码 开启、关闭按钮
 */
function setopenbut(){
	 nlback = "2";
	 $('.setpaypassword').show();//设置支付密码弹框显示
	 opencloseValue=openclose[1];
	 Bback='1';
}
function setclose(){
			//$('#paswordcolduser').val('');
			if(i>="0"){//同//$('#paswordcolduser').val('');
				$(".mm_box li").removeClass("mmdd");
				$(".mm_box li").attr("data","");
				i = 0;
			};
			$('.newcold').val('');
			$('.oldcold').val('');
			$('.usercold').val('');
			
	
	if(nlback =="1"){
		nlback = "0"; 
	}else if(nlback =="2"){
		nlback = "0"; 
	}
	$('.setpaypassword').hide();//设置支付密码弹框隐藏 
	Bback='0';
}

/**
 * 支付密码弹框的 点击 按钮调支付
 */
/*  $('.passwordbutton').click(function(){
  	$('.passwordbutton').attr("disabled",true);
   	$('.passwordbutton').css("background","#3D4172");
  	payPass = hex_md5($('.paswordcold').val());
  	zhifuajax(payType);
  	//alert("payPass"+payPass);
  });*/


 // $('.quedinganiu').click(function(){

 // 	$('.quedinganiu').attr("disabled",true);
 //   	$('.quedinganiu').css("background","#3D4172");
 //  	payPass = hex_md5($('.paswordcold').val());
 //  	zhifuajax(payType);

 // })
 
/**
 * 虚拟键盘
 */

$(".xiaq_tb").click(function(){
	$(".numb_box").slideUp(500);
});
$(".mm_box").click(function(){
	$(".numb_box").slideDown(500);
});
var i = 0;
$(".nub_ggg li .zf_num").click(function(){
		
	if(i<6){
		$(".mm_box li").eq(i).addClass("mmdd");
		$(".mm_box li").eq(i).attr("data",$(this).text());
		i++
		if (i==6) {
		  setTimeout(function(){
			var data = "";
				$(".mm_box li").each(function(){
				data += $(this).attr("data");
			});
			//alert("支付成功"+data);
				payPass = hex_md5(data);
					zhifuajax(payType);
		  },100);
		};
	} 
});

$(".nub_ggg li .zf_del").click(function(){
	if(i>0){
		i--
		$(".mm_box li").eq(i).removeClass("mmdd");
		$(".mm_box li").eq(i).attr("data","");
	}
});

$(".nub_ggg li .zf_empty").click(function(){
	$(".mm_box li").removeClass("mmdd");
	$(".mm_box li").attr("data","");
	i = 0;
});
		 
 

/**
 	支付方式 
 */
function zhifuajax(payType){
	//alert("调起支付");
	//alert("citizenId----:"+citizenId+"openGzhId-----:"+openGzhId+",buyEnergyNormId-----:"+hreid+"payType---:"+payType);
	$.ajax({
		url:onconfig.url_test1+"/rest/buyEnergyNorm/payOfBuyEnergy",
		dataType: "JSONP", 
		type: "GET",
		data: {
			 "citizenId":citizenId,
			 "openGzhId":openGzhId,
			 "buyEnergyNormId":hreid,
			 "payType":payType,
			 "payPass":payPass
		},
		success: function(res) {
			if(res.code=='1000'){//支付成功
				if(payType=='2'){
					//余额支付
					//if(payPass ==res.datas.1){
					 $('.paypassalert').show();
				 	 $('.paypassalert .textmassg').html('能量支付成功');
				 	 $('.qrclick').click(function(){
				  	   	$('.paypassalert').hide();
				  	    	closebut();
				  	   		/*$('.quedinganiu').attr("disabled",false);
   							$('.quedinganiu').css("background","#FFE401");*/

   							window.location.href = "http://testwan-vc.yxwenge.com/danche/grhome.html";
	  						 
				 	 });
						 
					//}
				}else if(payType=='3'){
					weixinpay(res);//将获取的信息，赋值到界面中如果code=1000调起微信收银台 
				}
			}else if(res.code=='1062'){	//支付密码不正确
				 $('.paypassalert').show();
				  $('.paypassalert .textmassg').html('支付密码不正确');
				  $('.qrclick').click(function(){
				  	   $('.paypassalert').hide();
				  	    	/*$('.quedinganiu').attr("disabled",false);
   							$('.quedinganiu').css("background","#FFE401");*/
				  });
			}else if(res.code=='1036'){//余额不足 
				  $('.paypassalert').show();
				  $('.paypassalert .textmassg').html('余额不足');
				  $('.qrclick').click(function(){
				  	
				  	   $('.paypassalert').hide();
				  	 	closebut();
				  	   /*	$('.quedinganiu').attr("disabled",false);
   					    $('.quedinganiu').css("background","#FFE401");*/
				  });
                                
			};
			
		},
		error:function(err) {
			alert("网络异常");
		}
	});
}


 /*
 * 将微信收银台HTML界面调起
 */

 function weixinpay(res){
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
					alert('微信支付成功');
					  if(is_weixin() == "1"){    
            			var urlAdd =encodeURIComponent(encodeURIComponent(encodeURIComponent(String("http://testwan-vc.yxwenge.com/danche/home.html")))); 

			            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6be7be4a05a0f08c&redirect_uri=http://vc.yxwenge.com/yxvcity-admin-vc/redirect/"+urlAdd+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
			       	 }else{

			          window.location.href = "http://testwan-vc.yxwenge.com/danche/home.html";

			        };

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

/**
 * 点击忘记密码
 */

$('.forget').click(function(){
	setopenbut();
})

/**
 * 判断是否符合正则当前元素先满足数字正则 然后再和下面的值对等
 */
function sixpass(obj){
	 return /^[0-9]{6}$/.test(obj);
}
$('.newcold').on('input propertychange',function(){  
 		var valone = this.value;
 		var valtwo = $('.oldcold').val();
 		if(sixpass(valone) && valone == valtwo){
 		 	$('.setsend').attr('disabled',false);
            $('.setsend').css('color','#FFE401');
 		}else{
 			$('.setsend').attr('disabled',true);
            $('.setsend').css('color','#666');
 		};
});
$('.oldcold').on('input propertychange',function(){  
 		var valone = $('.newcold').val();
 		var valtwo = this.value;
 		if(sixpass(valtwo) && valtwo == valone){
 		 	$('.setsend').attr('disabled',false);
            $('.setsend').css('color','#FFE401');
 		}else{
 			$('.setsend').attr('disabled',true);
            $('.setsend').css('color','#666');
 		};
});



/**
 *  发送验证码倒计时
 */
function sendAuthenticationCode(){ 
    var setNum = 60;
    function send1(o){
        if(setNum == 0){
            o.removeAttribute('disabled');
            o.value = '获取验证码';
            setNum = 60;
        }else{
            o.setAttribute('disabled',true);
            o.value = setNum+'秒重试';
            setNum--;
            setTimeout(function(){
                send1(o);
            },1000);
        }
    }

    $('.setsend').on('click',function(){//为甚么不能用tap
        send1(this);
    })
}
/**
 *  初始化验证码倒计时
 */
sendAuthenticationCode(); 

/**
 * 发送验证码接口
 */
function sendfs(){
    $.ajax({
        type:"post",
        url:onconfig.url_test2+"/rest/citizen/sendSmsCode", //发送验证码接口 
        data: {
        	"phone":phone,
        	"bizCode":"resetPayPwd"	
        },
        success:function(result){
           //alert(result.message);
        }
    })
};
/**
 * 点击发送验证码触发接口事件
 */

$('.setsend').on('click',function(){
    sendfs();
});



/**
 * 根据新密码和验证码实现点击按钮事件
 */

$('.setbuttonmit').click(function(){
	newcold = hex_md5($('.newcold').val());
	oldcold = hex_md5($('.oldcold').val());
	usercold = $('.usercold').val();
	forget();
 //alert("newcold====="+newcold+"oldcold====="+oldcold+"usercold======"+usercold)
});
 

/**
 *  定义重置支付密码接口
 */
function forget(){
	$.ajax({
		url:onconfig.url_test2+"/rest/citizen/resetPayPassword",
		dataType: "JSONP", 
		type: "GET",
		data: {
			 'id':citizenId,
			 'smsCode':usercold,
			 'newPayPass':newcold
		},
		success: function(res) {
		 	console.log(res)
		 	if(res.code == "1000"){ //成功
		 		$('.paypassalert').show();
				  $('.paypassalert .textmassg').html("设置密码成功");
				  $('.qrclick').click(function(){
				  	   $('.paypassalert').hide();
				  	 	 setclose();
					 	closebut();
					 	payFlag = "1";
				  });
			 	
		 	}else if(res.code == "1006"){//无效验证码

				  $('.paypassalert').show();
				  $('.paypassalert .textmassg').html(res.message);
				  $('.qrclick').click(function(){
				  	   $('.paypassalert').hide();  
				  });
		 	}else if(res.code == "1004"){
		 		 $('.paypassalert').show();
				  $('.paypassalert .textmassg').html(res.message);
				  $('.qrclick').click(function(){
				  	   $('.paypassalert').hide();  
				  });
		 	};
		},
		error:function(err) {
			alert("网络异常");
		}
	});
};
 

 $(function(){  //返回监听事件
	    pushHistory();  
	    window.addEventListener("popstate", function(e) { 
	    if(is_weixin() == "1"){    
	    	//$('#paswordcolduser').val('');
			$('.newcold').val('');
			$('.oldcold').val('');
			$('.usercold').val('');
			if(i>="0"){//同//$('#paswordcolduser').val('');
				$(".mm_box li").removeClass("mmdd");
				$(".mm_box li").attr("data","");
				i = 0;
			};
			
			if(nlback == "0"){
				var urlAdd =encodeURIComponent(encodeURIComponent(encodeURIComponent(String("http://testwan-vc.yxwenge.com/danche/grhome.html"))));
				
				window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6be7be4a05a0f08c&redirect_uri=http://vc.yxwenge.com/yxvcity-admin-vc/redirect/"+urlAdd+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
			
			}else if(nlback == "1"){
				closebut();
			}else{
	
				setclose();
			}
		}else{
			window.location.href = "http://testwan-vc.yxwenge.com/danche/grhome.html";
		};
	}, false);  
	    function pushHistory() {  
	        var state = {  
	            title: "title",  
	            url: "http://testwan-vc.yxwenge.com/danche/EnergyCz.html"  
	        }; 
	        window.history.pushState(state, "title", "http://testwan-vc.yxwenge.com/danche/EnergyCz.html");  
	    }  
	      
	}); 





  