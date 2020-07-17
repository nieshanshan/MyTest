function isEmail(str) {//正则邮箱格式
    return /^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i.test(str)
}
$('.btn1').on('click',function(){
	var mail = $('.plainput').val();
	if(mail == '' || null){//判断邮箱是否为空为空时按钮不可点击
		$('.Tips').html('请填写邮箱地址');
	}else if(isEmail(mail) == false){//判断输入邮箱格式是否正确
		$('.Tips').html('请输入正确的邮箱格式');
	}else{
		subscribe();//订阅接口
	} 
})
function subscribe(){
	var mail = $('.plainput').val();
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
			/*$('.Tips').html('');
			$('.btn1').html("订阅成功");*/
		},
		error: function(res) {
			console.log(res);
		}
	});
 }