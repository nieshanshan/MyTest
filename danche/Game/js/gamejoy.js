//alert("888888");
var openWxId = null;
var citizenId = GetQueryString("citizenId");

if (is_weixin() == "1") {//一进入就微信登录授权，获取微信openId
    var weixinCode = GetQueryString("code");
      $.ajax({ 
        url:onconfig.url_test1 + '/rest/citizen/getByWxOpenCode',
        dataType: "JSONP",
        type: "GET",
        data: {code: weixinCode},
        success: function (res) {
            openWxId = res.datas.openWxId; 
        },
        error:function(){alert("网络异常");}
      })
} /*else {
  console.log("其他")
};*/

 
//=========================================注册登录==============================================================//
function userName(){//propertychange 当输入框的值发生改变时触发该事件。功能同oninput，用以替代oninput在IE9以下的不兼容性。
    $('.usernameid').on('input propertychange',function(){ //验证用户名是否符合正则
        var val = this.value,
            otheVal = $('.userpassword').val();
        if(userInspect(val) ){//userInspect 用户名正则
            $('.send').attr('disabled',false);//当用户名输入正确的时候获取验证码（颜色）状态发生改变
            $('.send').css({'color':'#AFA31B','borderColor':'#AFA31B'});
        }else{
            $('.send').attr('disabled',true);//当用户名输入错误的时候获取验证码（颜色）状态为禁用状态
            $('.send').css({'color':'#999','borderColor':'#999'});
        }
        if( userInspect(val) && vfcode(otheVal) ){ //注册按钮亮起
            $('.usersubmit').attr('disabled',false);
            $('.usersubmit').css('background','#1C1C36');
        }else{
            $('.usersubmit').attr('disabled',true);
            $('.usersubmit').css('background','#999');
        }
    })
    $('.usernameid').on('blur',function(){ //失去焦点提示信息
        var val = this.value;
        if( !userInspect(val) ){
          $('.promptBoxone').show();
          $('.promptBoxtext p').html("请输入正确格式手机号！");
          setTimeout(function(){ $('.promptBoxone').fadeOut()},1000);
        }
    })
    $('.userpassword').on('input propertychange',function(){ //验证验证码是否符合正则
        var val = this.value,
            otheVal = $('.usernameid').val();
        if(vfcode(val) && userInspect(otheVal) ){ //注册按钮亮起
            
            $('.usersubmit').attr('disabled',false);
            $('.usersubmit').css('background','#1C1C36');
        }else{
        
            $('.usersubmit').attr('disabled',true);
            $('.usersubmit').css('background','#999');
        }
    })
    $('.userpassword').on('blur',function(){ //失去焦点提示信息
        var val = this.value
        if( !vfcode(val) ){
          $('.promptBoxone').show();
          $('.promptBoxtext p').html("请输入正确格式验证码！");
          setTimeout(function(){ $('.promptBoxone').fadeOut()},1000);
        }
    })
}
userName()
function sendAuthenticationCode(){ //发送验证码倒计时
    var setNum = 60;
    function send1(o){
        if(setNum == 0){
            o.removeAttribute('disabled');
            o.value = '发送验证码';
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
    $('.send').on('click',function(){ 
        send1(this);
    })
}
sendAuthenticationCode(); 

function send(){
    var phone = $(".usernameid").val();//传phone
    $.ajax({
        type:"GET",
        url:onconfig.url_test2+"/rest/citizen/sendSmsCode", //发送验证码接口 
        dataType:"JSONP",
        data: {
            "phone":phone,
            //"bizCode":"bindingPhone"//登录验证码bindingPhone
            "bizCode":"register"//注册验证码
        },
        success:function(result){
           localStorage.setItem("phone",phone);
          // alert(result.message);
        }
    })
}
$('.send').on('click',function(){
    send();
})

//注册绑定按钮提交
$('.usersubmit').on('click',function(){ 
  $('.usersubmit').css('background','#999');
  $('.usersubmit').attr('disabled','disabled');

  var phone = $(".usernameid").val(); 
  var smsCode = $(".userpassword").val(); 
  //alert("注册接口citizenId----"+citizenId+"--------openWxId----"+openWxId+"----phone----"+phone+"-----smsCode----"+smsCode);
  $.ajax({
      url:onconfig.url_test1+"/rest/cue/shareByCue", // 注册分享
      dataType:"JSONP",
      type:"GET",
      data: {  
          "citizenId":citizenId,
          "phone":phone,
          "smsCode":smsCode,
          "openId":openWxId 
          },
          success:function(res){ 
           // alert("2222citizenId----"+citizenId+"--------openWxId----"+openWxId+"----phone----"+phone+"-----smsCode----"+smsCode);
           // alert(res.code);
            if(res.code == "1000"){ 
                citizenId = res.datas.id;
                //alert("citizenId2"+citizenId); 
                window.location.href='http://testwan-vc.yxwenge.com/danche/Game/relay.html?citizenId='+citizenId
                 
            }else if(res.code == "1004"){
                $('.promptBoxone').show();
                $('.promptBoxtext p').html("手机号已注册");
                setTimeout(function(){ $('.promptBoxone').fadeOut()},1000);

            }else if(res.code == "1006"){
              $('.promptBoxone').show();
              $('.promptBoxtext p').html("无效验证码");
              setTimeout(function(){ $('.promptBoxone').fadeOut()},1000);

            }else if(res.code == "2006"){
              $('.promptBoxone').show();
              $('.promptBoxtext p').html("该微信已绑定,不能重复绑定");
              setTimeout(function(){ $('.promptBoxone').fadeOut()},1000);

            };
          },
          error:function(result){alert(result.message)}
        });
});
//==============================================注册end登录=======================================================================//




