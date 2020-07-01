function generateRandomAlphaNum(len,radix) {
    radix = radix ? 10 : 36;
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(radix).substr(2));
    return rdmString.substr(0, len);
};//，通过参数指定是生成随机的字符串还是随机的纯数字串
//var url = window.location.href;
var url = window.location.href;
var timestamp1 = parseInt((new Date()).getTime()/1000);//当前时间戳
var noncestr1 = generateRandomAlphaNum(16);//16个字符数字随机串
var jsapi_ticket = "HoagFKDcsGMVCIY2vOjf9prOXh8tu_-qGLQahWBlafEH9Kvanh6SbYBjx-udKjTOdC7EuKK3R3tyOZBHuRfdDw";
//var a = 0;//测试
errstr(jsapi_ticket);//第一遍走的值

setInterval(function(){//一段时间后走ajax传的值
  $.ajax({
      url: 'http://vc.yxwenge.com/yxvcity-admin-vc/rest/jsapiTicket/getJsapiTicket',
      type: 'get',
      dataType: 'json'
  })
  .done(function(res){//res给的jsapi_ticket值
      errstr(res.datas);
  });  
  
/*a++;//测试
$.ajax({
    url: "http://testwan-vc.yxwenge.com:8088/yxvcity-admin-vc/rest/ranking/findRankingItemListBatto",
    dataType: "JSONP", 
    type: "GET",
    data: '',
    success: function(res) {
        errstr(res.code+a);
    }
})*/

},360000);//1个小时360000

function errstr(obj){
  var qmstr = hex_sha1("jsapi_ticket="+obj+"&noncestr="+noncestr1+"&timestamp="+timestamp1+"&url="+url);
  console.log(qmstr)
  wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx6be7be4a05a0f08c', // 必填，公众号的唯一标识
      timestamp:timestamp1 , // 必填，生成签名的时间戳//由开发者生成的当前时间戳
      nonceStr:noncestr1, // 必填，生成签名的随机串//由开发者随机生成
      signature:qmstr,// 必填，签名
      jsApiList: [ 'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareWeibo','onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表
  });

    wx.ready(function(){
        // alert("我已经进来了");
        wx.onMenuShareTimeline({// 分享到朋友圈
            title: "线索游戏", // 分享标题
            desc: "vc注册下载app", // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://h5.yxwenge.com/loding/index/images/logo.png", // 分享图标
            success: function () {
                //alert(url)
                // 用户点击了分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({// 分享到app
            title: "线索游戏", // 分享标题
            desc: "vc注册下载app", // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://h5.yxwenge.com/loding/index/images/logo.png", // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
               //alert(url)
                // alert("成功")
                // 用户点击了分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({//分享到QQ
            title: "线索游戏", // 分享标题
            desc: "vc注册下载app", // 分享描述
            link: url, // 分享链接
            imgUrl: "http://h5.yxwenge.com/loding/index/images/logo.png", // 分享图标
            success: function () {
               //alert(url)
                // alert("成功")
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // alert("失败")
                // 用户取消分享后执行的回调函数
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            }
        });
    });
}


 

    //1. 根据appId和appsecret获取access_token;
    /*$appid = "w   ------  x6be7be4a05a0f08c";
    $appsecret = "5 ----- 5ea2=======9a2b9e79d40c27044f0018a73fc";
    $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);
    curl_close($ch);
    $jsoninfo = json_decode($output, true);
    $access_token = $jsoninfo["access_token"];
    console.log("$access_token")*/
    //https://mp.weixin.qq.com/debug/cgi-bin/apiinfo?t=index&type=%E5%9F%BA%E7%A1%80%E6%94%AF%E6%8C%81&form=%E8%8E%B7%E5%8F%96access_token%E6%8E%A5%E5%8F%A3%20/token

    //2. 使用access_token获取jsapi_ticket;
    //定死的jsapi_ticket;
    //   



 