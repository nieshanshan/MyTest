var InfoId = window.localStorage.getItem("InfoId");
var flag = 0;
var yxwhOpenID = null;//获取openid
var openNick = null;//获取名称
var openAvatar = null;//获取头像
var energy = null;//获取能量
var citizenId =null;//citizenId
var phone = null;
var openWxId =null;
var orderId =null;
var signUpPayTypew =null;
localStorage.removeItem('yxwhOpenID');//获取openid
localStorage.removeItem('openNick');//获取名称
localStorage.removeItem('openAvatar');//获取头像
localStorage.removeItem('energy');//获取能量
localStorage.removeItem('citizenId');//citizenId
localStorage.removeItem('phone');
localStorage.removeItem('openWxId');
//一进入就微信登录授权，获取微信openId
if (is_weixin() == "1") { 
    var weixinCode = GetQueryString("code");
      $.ajax({ 
        url:onconfig.url_test1 + '/rest/citizen/getByWxOpenCode',
        dataType: "JSONP",
        type: "GET",
        data: {code: weixinCode},
        success: function (res) {
          alert(res.code);
            OpenCodeval(res);
            if(res.code == "1000") {//有会员有手机号  
                YNorder();//查询用户是否有订单  
                flag = "1";
            }else if(res.code == "1053"){//有会员无手机号 需要绑定
                flag  = "2";
            }else if(res.code == "1002"){//无会员无手机号 进行注册登录
                flag = "3";
            };
        },
        error:function(){alert("网络异常");}
      })
} else {
  console.log("不是微信端");
};
/**
 * OpenCode需要的内容
 */
function OpenCodeval(res){
    yxwhOpenID = res.datas.openWxgzhId; //微信公众号ID 
    openWxId = res.datas.openWxId;//微信openId
    citizenId = res.datas.id; //用户id = urseId
    energy = res.datas.energy; //个人能量
    openNick = res.datas.nickName;//昵称
    openAvatar = res.datas.avatar;//头像
    phone = res.datas.phone;
};
  
 
/*
  点报名或者查看赛事信息按钮1有用户信息可以下单2没有用户信息需要注册3有用户信息需要绑定手机号4有用户信息有订单
 */

$('.footerbut').on('click',function(){
    if(flag == "1"){
      alert("点击后的energy"+energy)
         $('.mengceng').hide();
          baomingxiadan();
    }else if (flag == "2") { 
         $('.mengceng').show();
    } else if (flag == "3"){  
         $('.mengceng').show();
    } else if(flag == "4"){   
        window.location.href="http://testwan-vc.yxwenge.com/danche/paymentsucces.html?citizenId="+citizenId+"&yxwhOpenID="+yxwhOpenID+"&energy="+energy+"&orderId="+orderId;
         /*localStorage.removeItem('cId');
         window.localStorage.setItem('cId',citizenId); 
        window.location.href="http://testwan-vc.yxwenge.com/danche/paymentsucces.html";*/
    }
});

/*
查询用户是否有订单("")没有订单不是会员(否)有订单
 */
function YNorder(){
    $.ajax({
        url:onconfig.url_test1+"/rest/depokerOrder/getCitiZenByContest",
        dataType: "JSONP", 
        type: "GET",
        data: {"citizenId":citizenId,"depokerContestInfoId":InfoId}, 
        success: function(res) {
            console.log(res);   
            if(res.datas == ""){
              localStorage.setItem("haveorder",0);
              $('.footerbut_text').text('报名');
            }else{
                localStorage.setItem("haveorder",1);
                $('.footerbut_text').text('查看报名信息'); 
                flag = "4";
            }        
        },
        error:function(err){alert("网络异常")}    
    });
} ;

/*
  报名下单 //1049赛事不存在 //1046赛事比赛已结束，不可报名//1048用户已报名，不可重复报名
  1047用户未绑定，请注册//1045赛事未发布，不可报名 //1000成功 2001(0元的时候直接跳转到成功页面)
  1050 人数已满 1061 报名结束，不能报名
 */
//
function baomingxiadan(){
        $.ajax({
        url:onconfig.url_test1+"/rest/depokerOrder/signUpContest",
        dataType: "JSONP", 
        type: "GET",
        data: {"citizenId":citizenId,"depokerContestInfoId":InfoId}, 
        success: function(res){
            console.log(res);
            alert("报名下单"+res.code);
            var orderId = res.datas.orderId;
           
            if(res.code == '1049'){
                var alertkuang = $('.alertkuang').show().html(res.message);
                setTimeout(function(){alertkuang.fadeOut()},1000);
            }else if(res.code == '1046'){
               var alertkuang = $('.alertkuang').show().html(res.message);
               setTimeout(function(){alertkuang.fadeOut()},1000);
            }else if(res.code == '1048'){
                //localStorage.removeItem('cId');
               // window.localStorage.setItem('cId',citizenId); 
              window.location.href='http://testwan-vc.yxwenge.com/paymentsucces.html?citizenId='+citizenId+'&signUpPayTypew='+signUpPayTypew+'&orderId='+orderId+'&yxwhOpenID='+yxwhOpenID+'&energy='+energy
            }else if(res.code == '1047'){
                var alertkuang = $('.alertkuang').show().html(res.message);
                setTimeout(function(){alertkuang.fadeOut()},1000);
            }else if(res.code == '1045'){
                var alertkuang = $('.alertkuang').show().html(res.message);
                setTimeout(function(){alertkuang.fadeOut()},1000);
            }else if(res.code == '1000'){
              alert("1000报名下单energy"+energy)
               // localStorage.setItem("orderId",res.datas.orderId);
                //localStorage.setItem("energyp",energy);
                // localStorage.setItem("openIDp",yxwhOpenID);
                //localStorage.setItem("citizenIdp",citizenId);
                //localStorage.setItem("signUpPayTypew",res.datas.signUpPayType);
                // localStorage.removeItem('cId');
                // window.localStorage.setItem('cId',citizenId);   
                window.location.href='http://testwan-vc.yxwenge.com/danche/payment.html?citizenId='+citizenId+'&signUpPayTypew='+signUpPayTypew+'&yxwhOpenID='+yxwhOpenID+'&energy='+energy+'&orderId='+orderId;
            }else if(res.code == '2001'){ 
                //localStorage.removeItem('cId');
                //window.localStorage.setItem('cId',citizenId);   
                window.location.href='http://testwan-vc.yxwenge.com/danche/paymentsucces.html?citizenId='+citizenId+'&signUpPayTypew='+signUpPayTypew+'&orderId='+orderId+'&yxwhOpenID='+yxwhOpenID+'&energy='+energy;
            }else if(res.code == '1050'){
               alert(res.message) 
            }else if(res.code == '1061'){
               alert(res.message) 
            }
        },       
    }) ;
};
 
/*
  赛事信息
 */
$.ajax({//赛事信息
    url:onconfig.url_test1+'/rest/depokerContestInfo/getContestInfoById',
    dataType: "JSONP", 
    type: "GET",
    data: {"depokerContestInfoId":InfoId}, 
    success: function(res) {
        console.log(res);
         var string = res.datas.orderNum;
         var i = 25;
         var sum =string+i;
        window.localStorage.setItem("signUpMoney",res.datas.signUpMoney);//报名费用
        window.localStorage.setItem("contestStartTime",activeDate(res.datas.contestStartTime));//报名时间
        window.localStorage.setItem("contestAddress",res.datas.contestAddress);//比赛地点
        window.localStorage.setItem("signUpenergy",res.datas.signUpenergy);//报名所用能量
        var url = res.datas.posterPictureUrl;//图片路径
        if(res.datas.posterPictureUrl.indexOf('http:')){//图片路径
            url ='http://image.yxwenge.com/'+res.datas.posterPictureUrl;
        }
        var asigup = '<img class="topbanner" src="'+url+'"><h2><p>'+res.datas.name+'</p></h2>';
            $(".headertitle").append(asigup);//标题和头图
        var bsigup = "<span>"+ activeDate(res.datas.contestStartTime)+"</span>";
			//bsigup += "<br><span>"+ countDown(18204) +"</span>";
            $(".main_time").append(bsigup);//比赛开始时间activeDate时间戳转换方法
       // var csigup = '<ul class="main_menu"><li><span class="span_pic_01"></span><p>当前报名人数：'+sum+'人</p></li><li><span class="span_pic_02"></span><p>报名费用：'+res.datas.signUpenergy+'能量/人</p></li><li><span class="span_pic_03"></span><p>报名截止时间：'+activeDate(res.datas.signUpEndTime)+'</p></li><li><span class="span_pic_04"></span><p>地址：'+res.datas.contestAddress+'</p></li></ul>'
           // $(".main").append(csigup)//比赛详情*/ 
         var csigup = '<ul class="main_menu"><li><span class="span_pic_02"></span><p>报名费用：'+res.datas.signUpenergy+'能量/人</p></li><li><span class="span_pic_03"></span><p>报名截止时间：'+activeDate(res.datas.signUpEndTime)+'</p></li><li><span class="span_pic_04"></span><p>地址：'+res.datas.contestAddress+'</p></li></ul>'
            $(".main").append(csigup)//比赛详情*/ 
        var dsigup = '<h2></h2><ol class="rulet_main">'+res.datas.contestDetail+'</ol>';
            $(".ruletmain").append(dsigup)
    },
    error:function(err) {
        alert("网络异常") 
    }
});

/*
  早鸟价带天数的倒计时
 */
function CountDown(){
          //var tian = document.getElementsByClassName('JS-tian')[0];
          var shi = document.getElementsByClassName('JS-shi')[0];
          var fen = document.getElementsByClassName('JS-fen')[0];
          var miao = document.getElementsByClassName('JS-miao')[0];
          var endTime = new Date('2018/10/17 22:00:00').getTime() + 1000;
          var interval = null;
          interval = setInterval(function () {
           var syhm = endTime - Date.now(); // 剩余毫秒
           if (syhm >= 0) {
            //tian.innerText = Math.floor(syhm / 1000 / 60 / 60 / 24);
           // shi.innerText = Math.floor(syhm / 1000 / 60 / 60 % 24);
            shi.innerText = Math.floor(syhm / 1000 / 60 / 60);
            fen.innerText = Math.floor(syhm / 1000 / 60 % 60);
            miao.innerText = Math.floor(syhm / 1000 % 60);
           } else {
            clearInterval(interval);
            $('.Count_down').hide()
           }
          }, 0);
    }
  CountDown();


 


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

//注册绑定按钮提交
$('.submitbotss').on('click',function(){
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
            success:function(res){ 
                if(res.code == "1000"){
                 yxwhOpenID = res.datas.openWxgzhId; //微信公众号ID 
                 openWxId = res.datas.openWxId;//微信openId
                 citizenId = res.datas.id; //用户id = urseId
                  //energy = res.datas.energy; //个人能量
                  openNick = res.datas.nickName;//昵称
                  openAvatar = res.datas.avatar;//头像
                  phone = res.datas.phone;
                  alert("yxwhOpenID------------"+yxwhOpenID);
                  alert("openWxId------------"+openWxId);
                  alert("citizenId------------"+citizenId);
                  alert("openNick------------"+openNick);
                  alert("phone------------"+phone);
                pop();
                  

                   //  window.localStorage.setItem("yxwhOpenID",res.datas.openWxgzhId);//存储微信公众号id(openid) res.datas.openWxgzhId
                   //   window.localStorage.setItem("energy",res.datas.energy);//存储个人能量
                   //  window.localStorage.setItem("openNick",res.datas.nickName);//存储openNick昵称
                   //  window.localStorage.setItem("openAvatar",res.datas.avatar);//存储openAvatar 头像
                   //  window.localStorage.setItem('phone',res.datas.phone);
                   //  window.localStorage.setItem('citizenId',res.datas.id);
                   //  window.localStorage.setItem('openWxId',res.datas.openWxId);
                   //  yxwhOpenID = localStorage.getItem('yxwhOpenID');//获取openid
                   //  openNick = localStorage.getItem('openNick');//获取名称
                   //  openAvatar = localStorage.getItem('openAvatar');//获取头像
                   //  //energy = localStorage.getItem('energy');//获取能量
                   //  citizenId = localStorage.getItem('citizenId');//citizenId
                   //  phone = localStorage.getItem('phone');
                   //  openWxId =localStorage.getItem('openWxId');
                   //  pop();

                    var ut = $(".tankuang").show().html(res.message);//登录、注册成功
                    setTimeout(function(){ut.fadeOut()},1000);
                     $('.mengceng').hide();//注册弹框;  
                     flag = "1";
                    
                     
             
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
})
//==============================================注册end登录=======================================================================//




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
            window.localStorage.setItem("energy",res.datas.energy)
                energy = res.datas.energy;
                alert("个人中心的"+energy)
               
           }
        },
          
    }) ;

}


 
