 var citizenId = null;
if(citizenId == null){
	citizenId = GetQueryString("citizenId");
}
//alert("2.报名列表页获取citizenId:"+citizenId);

/*
 *根据用户ID，获取赛事报名列表
 */
function getSignList(){
	
	 $.ajax({
		url:onconfig.url_test1+'/rest/depokerOrder/querySignUpInfo',//查询报名赛事信息
		dataType: "JSONP", 
		type: "GET",
		data: {
			citizenId:citizenId
		}, 
		success: function(res) {
			console.log(res)
			var mySdata = res.datas;
			if(mySdata == null || mySdata.length == 0){
				$(".mySign").html("<font align='center'class='blik' color='grey'>暂无数据</font>");
			}else{
				for(var i = 0; i < mySdata.length; i++){
					var MycontestId = mySdata[i].contestId;
					var orderStatus = mySdata[i].orderStatus;
					var url = 'http://testwan-vc.yxwenge.com/danche/Registinfo.html?contestId='+MycontestId+'&citizenId='+citizenId;
					var conStatusResult ='';	
						if(orderStatus == '1'){
							conStatusResult += '<div class="mySignli_right wei1">未消费</div>';	
						}else if(orderStatus == '2'){
							conStatusResult += '<div class="mySignli_right wei2">已消费</div>';
						}else if(orderStatus == '3'){
							conStatusResult += '<div class="mySignli_right wei3">已取消</div>';
						}else if(orderStatus == '4'){
							conStatusResult += '<div class="mySignli_right wei5">已退款</div>';
						};
					var myShtml = '<li liurl='+url+'><div class="mySignli_left"><div class="myS_left_text">'+mySdata[i].contestName+'</div><div class="myS_left_time">'+activeDate(mySdata[i].creatDate)+'</div></div>'+conStatusResult+'</li>';
					$(".mySignUl").append(myShtml);

				};		
			
			};
		},
		error:function(err) {
			alert("网络异常") 
		}
	});
}


//初始化，获取赛事报名列表
getSignList();


$('body').on('click','.mySignUl li',function(){	
	var hrefUrl = $(this).attr('liurl');
	window.location.href=hrefUrl;
});
























 