var citizenId =null;
var yxwhOpenID=null;
var InfoId = null;
var orderType = null;
var signUpPayType =null;
var orderId = null;
var energy = null;
var eny =null;
var orderEnergy = null;
var orderNo = null;
var isOrderCount = null;
var orderNum =null;
var orderMoney =null;
var orderEnergy =null;
var InfoId = window.localStorage.getItem("InfoId");
if(citizenId == null){
	citizenId = GetQueryString("citizenId");
}
if(yxwhOpenID == null){
	yxwhOpenID = GetQueryString("yxwhOpenID");//OpenID
}
/*if(energy == null){
	energy = GetQueryString("energy");
}*/

 
 /**
  * 判断当前赛事是否允许当前用户进行复购、补码和边赛报名 
  * 1062 重购已经结束，不能重购  1061 加码已结束，不能加码
  */
 function popo(){
  $.ajax({
        url:onconfig.url_test1+"/rest/citizen/getDepokerCitizenInfo",// 个人中心
        dataType: "JSONP", 
        type: "GET",
        data: {
            "citizenId":citizenId
        }, 
        success: function(res){
           if(res.code == "1000"){
                eny=res.datas.energy;
           }
        },
          
    }) ;
}
 	
function panduan(){
	popo();
  //alert("判断:"+citizenId+",yxwhOpenID:"+yxwhOpenID+",InfoId:"+InfoId);
	$.ajax({
		url:onconfig.url_test1+"/rest/depokerOrder/isRebuyOrAddonOrSideContest",//判断重购，加码，边赛下单接口
		dataType: "JSONP", 
		type: "GET",
		data: {"citizenId":citizenId,"depokerContestInfoId":InfoId}, 
		success: function(res) {
			//alert(res.code);
			console.log(res);
			if (res.code == "1000"){
				fuzhi(res.datas);
        	}else if(res.code == "1062"){
        		alert(res.message);
        	}else if(res.code == "1061"){
        		alert(res.message);
        	}	
		},
		error:function(err) {
			alert("网络异常") 
		}
	})
};
panduan();

function fuzhi(datas){//0 否 1 是
	//复购的状态
	//alert("允许复购:"+datas.isRebuy+",允许补码:"+datas.isAddon+",允许边赛:"+datas.isSideContest);
	if(datas.isRebuy == "1"){
		$('.Urlbutton_li1').addClass('on').attr('disabled',false) 
	}else{
		$('.Urlbutton_li1').removeClass('on').attr('disabled',true) 
	}
	//补码的状态
	if(datas.isAddon == "1"){
		$('.Urlbutton_li2').addClass('on').attr('disabled',false) 
	}else{
		$('.Urlbutton_li2').removeClass('on').attr('disabled',true) 
	}
	//边赛的状态
	if(datas.isSideContest == "1"){
		$('.Urlbutton_li3').addClass('on').attr('disabled',false) 
	}else{
		$('.Urlbutton_li3').addClass('on').attr('disabled',true)
	}
}

/*
	点击复购，加码，边赛按钮传orderType下单
 */
function fugou(){//复购
	orderType = $('.Urlbutton_li1').attr('orderType');
	xiadan();
}	
function jiama(){//加码
	orderType = $('.Urlbutton_li2').attr('orderType');
	xiadan();
}
function biansai(){//边赛
	orderType = $('.Urlbutton_li3').attr('orderType');
	xiadan();
}
 
/**
 * 复购、补码、边赛下单接口
*/
function xiadan(){
	//alert("下单,citizenId:"+citizenId+",InfoId:"+InfoId+",type:"+orderType);
	$.ajax({
		url:onconfig.url_test1+"/rest/depokerOrder/rebuyOrAddonOrSideContest",// 重购,加码,边赛下单接口
		dataType: "JSONP", 
		type: "GET",
		data: {"citizenId":citizenId, "depokerContestInfoId":InfoId,"orderType":orderType}, 
		success: function(res) {
			//alert(res.code)
			console.log(res);
			if (res.code == "1000") {	
				isOrderCount = res.datas.isOrderCount;//总共可购买的次数
				orderNum = res.datas.orderNum;//当前用户已购买的次数
				orderMoney =res.datas.orderMoney;//订单支付金额
				orderEnergy = res.datas.orderEnergy;//订单支付能量
				orderType =orderType;//订单类型（补码。边赛。重购）
				signUpPayType = res.datas.signUpPayType;//订单支持支付方式1，现金和微信 2,能量 3 现金
				orderId = res.datas.orderId;//订单ID
				orderNo = res.datas.orderNo;//订单号
                window.location.href="http://testwan-vc.yxwenge.com/danche/cgbmbs.html?citizenId="+citizenId+"&yxwhOpenID="+yxwhOpenID+"&eny="+eny+"&isOrderCount="+isOrderCount+"&orderNum="+orderNum+"&orderMoney="+orderMoney+"&orderEnergy="+orderEnergy+"&orderType="+orderType+"&signUpPayType="+signUpPayType+"&orderId="+orderId+"&orderNo="+orderNo;
            }else if(res.code == "1003"){
				alert("下单失败");
			}
		},
		error:function(err) {
			alert("网络异常") 
		}
	})
}





 /**
 * 赛事内容信息
 */
zhuanhuan();
var contestStartTime = localStorage.getItem('contestStartTime');//比赛时间
var contestAddress = localStorage.getItem('contestAddress');//比赛地点
var contestStartTime = '<span>'+contestStartTime+'</span>';
	$('.time_star').append(contestStartTime);
var contestAddress = '<strong class="bisai_Address">'+contestAddress+'</strong>';
	$('.bisai_Address').append(contestAddress)
 $('.payOff_but').click(function(){
 	if(is_weixin() == "1"){    
           var urlAdd =encodeURIComponent(encodeURIComponent(encodeURIComponent(String("http://testwan-vc.yxwenge.com/danche/signup.html")))); 
            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6be7be4a05a0f08c&redirect_uri=http://vc.yxwenge.com/yxvcity-admin-vc/redirect/"+urlAdd+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    }else{

      window.location.href = "http://testwan-vc.yxwenge.com/danche/signup.html";

    }
 });




  $(function(){  //返回监听事件
    pushHistory();  
    window.addEventListener("popstate", function(e) {  
        //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能  
  		//location.reload(true);
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
            url: "http://testwan-vc.yxwenge.com/paymentsucces.html"  
        };  
        window.history.pushState(state, "title", "http://testwan-vc.yxwenge.com/danche/paymentsucces.html");  
    }  
      
}); 

 

