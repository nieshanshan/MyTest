//=========================================注册登录==============================================================//
function userName(){//propertychange 当输入框的值发生改变时触发该事件。功能同oninput，用以替代oninput在IE9以下的不兼容性。
    $('#username').on('input propertychange',function(){ //验证用户名是否符合正则
        var val = this.value,
            otheVal = $('#userpassword').val();
        if(userInspect(val) ){//userInspect 用户名正则
            $('.send').attr('disabled',false);//当用户名输入正确的时候获取验证码（颜色）状态发生改变
            $('.send').css({'color':'#FFEA01','borderColor':'#FFEA01'});
        }else{
            $('.send').attr('disabled',true);//当用户名输入错误的时候获取验证码（颜色）状态为禁用状态
            $('.send').css({'color':'#999','borderColor':'#999'});
        }
        if( userInspect(val) && vfcode(otheVal) ){ //注册按钮亮起
            $('#loginBtn').attr('disabled',false);
            $('#loginBtn').css('background','#FFEA01');
        }else{
            $('#loginBtn').attr('disabled',true);
            $('#loginBtn').css('background','#999');
        }
    })
    $('#username').on('blur',function(){ //失去焦点提示信息
        var val = this.value;
        if( !userInspect(val) ){
         // alert("请输入正确格式手机号！"); 
         var ut = $(".tankuang").show().html("请输入正确格式手机号！");
         setTimeout(function(){ut.fadeOut()},1000)
        }
    })
    $('#userpassword').on('input propertychange',function(){ //验证验证码是否符合正则
        var val = this.value,
            otheVal = $('#username').val();
        if(vfcode(val) && userInspect(otheVal) ){ //注册按钮亮起
            $('#loginBtn').attr('disabled',false);
            $('#loginBtn').css('background','#FFEA01');
        }else{
            $('#loginBtn').attr('disabled',true);
            $('#loginBtn').css('background','#999');
        }
    })
    $('#userpassword').on('blur',function(){ //失去焦点提示信息
        var val = this.value
        if( !vfcode(val) ){
            var ut = $(".tankuang").show().html("请输入正确格式验证码！");
            setTimeout(function(){ut.fadeOut()},1000)
        }
    })
}
userName()
function sendAuthenticationCode(){ //发送验证码倒计时
    var setNum = 60;
    function send1(o){
        if(setNum == 0){
            o.removeAttribute('disabled');
            o.value = '获取动态验证码';
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
    var phone = $("#username").val();//传phone
    $.ajax({
        type:"GET",
        url:onconfig.url_test2+"/rest/citizen/sendSmsCode", //发送验证码接口 
        dataType:"JSONP",
        data: {
            "phone":phone,
            "bizCode":"bindingPhone"//登录验证码bindingPhone
          // "bizCode":"register"//注册验证码
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
//alert("openId--"+openWxId+"openNick--"+openNick+"phone--"+phone+);
//注册绑定按钮提交
$('.submitbotss').on('click',function(){
   // function register1(){
	  //alert("here"+openWxId+openNick+yxwhOpenID);
        var phone = $("#username").val();//传phone
        var smsCode = $("#userpassword").val();//传短信验证码
        $.ajax({
            url:onconfig.url_test2+"/rest/citizen/thirdBindingPhoneForDepoker", // 绑定手机号或注册接口
            dataType:"JSONP",
            type:"GET",
            data: {
                'openLoginType':5,
                'openId':openWxId,
                'openNick':openNick,
                'openAvatar':openAvatar,
                "phone":phone,
                "smsCode":smsCode,
                "openWxgzhId":yxwhOpenID

            },
            //contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            success:function(res){  
                //console.log(res);
                //alert("code:"+res.code);
                if(res.code == "1000"){              
					window.localStorage.setItem("yxwhOpenID",res.datas.openWxgzhId);//存储微信公众号id(openid) res.datas.openWxgzhId
					// window.localStorage.setItem("energy",res.datas.energy);//存储个人能量
					window.localStorage.setItem("openNick",res.datas.nickName);//存储openNick昵称
					window.localStorage.setItem("openAvatar",res.datas.avatar);//存储openAvatar 头像
					window.localStorage.setItem('phone',res.datas.phone);
					window.localStorage.setItem('citizenId',res.datas.id);
					window.localStorage.setItem('openWxId',res.datas.openWxId);
					yxwhOpenID = localStorage.getItem('yxwhOpenID');//获取openid
					openNick = localStorage.getItem('openNick');//获取名称
					openAvatar = localStorage.getItem('openAvatar');//获取头像
					energy = localStorage.getItem('energy');//获取能量
					citizenId = localStorage.getItem('citizenId');//citizenId
					phone = localStorage.getItem('phone');
					openWxId =localStorage.getItem('openWxId');

					var ut = $(".tankuang").show().html(res.message);//登录、注册成功
					setTimeout(function(){ut.fadeOut()},1000);
					 $('.mengceng').hide();//注册弹框;  
					 fal = "1";
					 //location.reload(true);
					 window.location.href='http://testwan-vc.yxwenge.com/danche/grhome.html';
             
                }else if(res.code == "1006"){//无效验证码
					var ut = $(".tankuang").show().html(res.message);
                    setTimeout(function(){ut.fadeOut()},1000);
        
                }else if(res.code == "1004"){//手机号已存在
                    var ut = $(".tankuang").show().html(res.message);
                    setTimeout(function(){ut.fadeOut()},1000);
                
                };
            },
            error:function(result){
                alert(result.message);
            }

        })
   // }
    //register1(); 
})
//==============================================注册end登录=======================================================================//
