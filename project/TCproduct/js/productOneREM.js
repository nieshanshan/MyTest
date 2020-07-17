function isEmail(str) {//正则邮箱格式
    return /^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i.test(str)
}
$('.btn1').on('click',function(){
	var mail = $('.subbeinput').val();
	if(mail == '' || null){//判断邮箱是否为空为空时按钮不可点击
		$('.Tips').html('请填写邮箱地址');
	}else if(isEmail(mail) == false){//判断输入邮箱格式是否正确
		$('.Tips').html('请输入正确的邮箱格式');
	}else{
		subscribe();//订阅接口
	} 
})
function subscribe(){
	var mail = $('.subbeinput').val();
	var ip= returnCitySN["cip"];
	var channel = "offical";
	var _data ={
		"mail":mail,//邮箱
		"channel":channel,//渠道
		"ip":ip//用户ip
	}
	$.ajax({
		type:'GET',
		dataType:"JSON",
		url: SUBSCRIBE,
		data: _data,
		success: function(res) {
			console.log(res);
			if(res.code == -1){
				$('.Tips').html(res.msg)
			}else{
				$('.Tips').html('');
				$('.btn1').html("订阅成功");
			}
		},
		error: function(res) {
			console.log(res);
		}
	});
 }
 
//进入即调用分析师观点数据
$.ajax({
	type:'GET',
	dataType:"JSON",
	url: NZDUSD,
	data: '',
	success: function(res) {
		//console.log(res)
		$('.load').hide();
		for(var i=0; i<res.length;i++){
			var m = res[i];
			var iconimg = m.opinion_st;
				if(iconimg > 0){
					var imghtml='<img class="fl liLimg" src="imgs/up.png" alt="">'
				}else if(iconimg == 0){
					var imghtml='<img class="fl liLimg" src="imgs/lond.png" alt="">'
				}else if(iconimg < 0){
					var imghtml='<img class="fl liLimg" src="imgs/down.png" alt="">'
				}
			var ahtml='<li><a href="Analysisdata.html">'+imghtml+'<div class="fl box"><h3 class="fl"><span>'+m.name+'</span><div class="b">'+m.summary+'</div></h3><p class="fr">'+m.hour+'发布</p></div><img class="fr liRimg" src="imgs/more.png" alt=""></a></li>';
			$('.list').append(ahtml);
		} 
	},
	error: function(res) {
 		console.log(res);
	}
});