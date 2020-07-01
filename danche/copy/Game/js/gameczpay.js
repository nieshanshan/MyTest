//alert("22222222");
var hreid = null,
	energy =null,
	NEngyw=null,
    citizenId = GetQueryString("citizenId")
//alert(citizenId);
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
				 var NEngy = res.datas[i].energy
				  $('.wapEngUP_ul li:first').addClass('onEng');
				  hreid = $('.wapEngUP_ul li:first').attr('EngumId');
				   $('.wapEngUP_ul li:first').addClass('NEngy');
				   NEngyw = $('.wapEngUP_ul li:first').attr('NEngy');
					var EngCzhtml = '<li EngumId='+NEngid+' NEngy='+NEngy+'><div class="Engleft"><p>'+res.datas[i].energy+'能量<strong></strong></p></div><div class="Engright"><p>￥'+res.datas[i].money+'</p><em></em></div></li>';
					$('.wapEngUP_ul').append(EngCzhtml);
			};
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
	NEngyw = parseInt($(this).attr('NEngy'));
	//alert("hreid----"+hreid);
	//alert("NEngyw---------"+NEngyw);
	$(this).addClass("onEng").siblings().removeClass("onEng");
});



/*
	调取个人中心接口 提取能量
 */

function pop(){
  $.ajax({
        url:onconfig.url_test1+"/rest/citizen/getDepokerCitizenInfo",// 个人中心
        dataType: "JSONP", 
        type: "GET",
        data: {
            "citizenId":citizenId
        }, 
        success: function(res){
           if(res.code == "1000"){
                energy = parseInt(res.datas.energy);
               $('.cznl').append(energy);
           }
        },
          
    }) ;
}
//初始化, 个人中心
pop()



/*
	判断是安卓还是ios
 */
function isAndroid_ios() {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isAndroid == true ? true : false;
}

/*
	点击立即充值直接掉收银台
 */
function pay(){
	//alert("点击立即充值直接掉收银台");
    if (isAndroid_ios()) {
        //alert("android")
        //注意：安卓只需要传字符串
         window.Cashier.powerCharge(hreid) 
    }else {
        //alert("ios")
        window.webkit.messageHandlers.PayParam.postMessage({
           "payId":hreid  
        });
    }	 
}
 
$(".inclik").click(function(){
	$('.succesinfo').hide();
	 window.location.reload()
})
/**
 *  接收参数改变弹框之文字
 *  
 */


function payResult(result){
	if(result==true){
		$('.succesinfo').show();
		$('.infoBox .infoi').html("充值成功");
		var a = NEngyw;
		var b = energy;
		var num = a+b;
		$('.infoBox .wey').append(NEngyw);
		$('.infoBox .wep').append(num);
		 
	}else if(result==false){
		console.log("充值失败");
		/*$('.succesinfo').show();
		$('.infoBox .infoi').html("充值失败");
		$('.infoBox .wey').html("0");
		$('.infoBox .wep').append(energy);*/

	}
}

/*
点击刷新按钮重刷页面
 */
$('.refresh').click(function(){
	  window.location.reload();
})



/*
微信h5页面禁止下拉露出网页来源
 */

 
 