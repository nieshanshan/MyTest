var citizenId = null;
var weixinCode = GetQueryString("code");
var yxwhOpenID = null;
var openNick = null;
var openAvatar = null;
var openWxId = null;
var yue =null;
var phone=null;
var payPassword =null;
 
/*
 * 根据code获取用户信息
 */
function getUserInfo(){
  if (is_weixin() == "1") {
      $.ajax({ 
       url:onconfig.url_test1 + '/rest/citizen/getByWxOpenCode',
      dataType: "JSONP",
      type: "GET",
      data: {
        code: weixinCode
      },
      success: function (res) {
		if(res.code == "1003"){
     
			window.location.href = "http://testwan-vc.yxwenge.com/danche/grhome.html";
		}else{
			citizenId = res.datas.id;
			//根据citizenId获取大师分
			if(citizenId !=null){
			  getDSF();
			};
        
			//将获取的信息，赋值到界面中
     //alert("未知的参数"+res.datas.openWxgzhId) //
			assignment(res.datas);
		}
        
      },
      error: function () {
        alert("网络异常");
      }
      });
  } else {
    console.log("不是微信端");
  }
}


//初始化,获取用户信息
getUserInfo();
 
/*
 * 将用户信息赋值到HTML界面
 */
 function assignment(datas){
 
   var url = datas.avatar;//图片路径
  if(datas.avatar.indexOf('http:')){//图片路径
    url ='http://image.yxwenge.com/'+datas.avatar;
  }

  //获取头像和昵称,赋值
  $('.PictureDl').html('<dd><img src="'+url+'"> </dd><dt><em></em><span>'+datas.nickName+'</span></dt>');
  
  //获取能量，赋值
  var aenergy =parseInt(datas.energy);
 
   if(datas.energy==''){
           $('.energy_spanup').html('<b>'+0+'</b>');
    }else{
      $('.energy_spanup').html('<b>'+aenergy+'</b>');   
    }
  yxwhOpenID = datas.openWxgzhId;//获取openid
  openNick = datas.nickName;//获取名称
  openAvatar = datas.avatar;//获取头像
  openWxId =datas.openWxId;

 

 }

/*
 * 根据用户id获取用户大师分
 */
 
function getDSF(){
 // alert("大师分,citizenId:"+citizenId);
    $.ajax({
      url:onconfig.url_test1+'/rest/citizen/getDepokerCitizenInfo',//德扑个人中心
      dataType: "JSONP", 
      type: "GET",
      data: {
        citizenId:citizenId
      }, 
      success: function(res) {

    //获取用户大师分,赋值
        $('.Master_spanup').html('<b>'+res.datas.masterScore+'</b>'); 
          yue= res.datas.member.balance;
          phone= res.datas.phone;
          payPassword= res.datas.member.payPassword;

      },
      error:function(err) {
        alert("网络异常") 
      }
    });
};

/*
 * 根据用户id，获取赛事报名列表
 */
$(".PicBoxlink").click(function(){
  if(citizenId == null || citizenId == ""){
     $('.mengceng').show();//弹出注册框
	 
  }else{
    //跳转到赛事报名列表界面
	window.location.href='http://testwan-vc.yxwenge.com/danche/MySign.html?citizenId='+citizenId;
  };
  
});






/*
 * 点击能量充值，获取能量充值页面
 */

$('.PBEnge').click(function(){
  //alert("citizenId"+citizenId+"yxwhOpenID"+yxwhOpenID+"yue"+yue+"phone"+phone+"payPassword"+payPassword);
	if(citizenId == null || citizenId == ""){
     $('.mengceng').show();//弹出注册框
	 
  }else{
    //跳转到赛事报名列表界面
	 window.location.href='http://testwan-vc.yxwenge.com/danche/EnergyCz.html?citizenId='+citizenId+'&yxwhOpenID='+yxwhOpenID+'&yue='+yue+'&phone='+phone+'&payPassword='+payPassword;

  };
  
})









 


 




