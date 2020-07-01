var citizenId = null;
var contestId = null;
if(citizenId == null){
	citizenId = GetQueryString("citizenId");
}

if(contestId == null){
	contestId = GetQueryString("contestId");
}

//alert("3.赛事详情,获取citizenId:"+citizenId+",contestId:"+contestId);


/*
 *根据赛事ID，获取赛事详情
 */
function getRegInfo(){
	$.ajax({
		url:onconfig.url_test1+'/rest/depokerContestInfo/getContestInfoById',//查询赛事
		dataType: "JSONP", 
		type: "GET",
		data: {
			"depokerContestInfoId": contestId
		}, 
		success: function(res) {
			
			window.localStorage.setItem('activityname',res.datas.name);
			
			var reInfohtmla = '<p class="IfBP1">活动时期：'+activeDate(res.datas.contestStartTime)+'</p><p class="IfBP2">活动地点：'+res.datas.contestAddress+'</p><p>备注：请牢记活动时间及活动地点，准时到现场参与活动现场凭借手机号进行活动检录。</p>';
			$('.InfoBoxUP_text').append(reInfohtmla);
		},
		error:function(err) {
			alert("网络异常") 
		}
	});

}

//初始化,获取赛事详情信息
getRegInfo();

//初始化,用户重购记录
repRecord(2);


/*
 *获取用户ID和赛事类型获取，重购/补码/边赛记录
 */
function repRecord(obj){
	$('.contentBox').html("");
	$.ajax({
		url:onconfig.url_test1+'/rest/depokerOrder/getOrderRecordBytype',// 查询重购、加码记录接口
		dataType: "JSONP", 
		type: "GET",
		data: {
			"orderType":obj,//（2，重购 3，加码 4，边赛）
			"citizenId": citizenId,
			"contestId":contestId,
			"pageNo":1,
			"pageSize":10
		}, 
		success: function(res) {
			console.log(res);
			var resArry = res.datas;
			console.log(resArry);
			for(var i=0; i < resArry.length; i++){
				var orderTyperStatus = resArry[i].orderType;
					if(orderTyperStatus == '2'){
						orderTyperResult = "重购";
					}else if(orderTyperStatus == '3'){
						orderTyperResult = "加码";
					}else if(orderTyperStatus == '4'){
						orderTyperResult = "边赛";
					};
				var orderStatuslei = resArry[i].orderStatus;
					if(orderStatuslei == '1'){
						orderStatusResult = "未消费";
					}else if(orderStatuslei == '2'){
						orderStatusResult = "已消费";
					}else if(orderStatuslei == '3'){
						orderStatusResult = "已取消";
					}else if(orderStatuslei == '4'){
						orderStatusResult = "已退款";
					}; 
				var payTypeStatus = resArry[i].payType;
				var paypayMoney = resArry[i].payMoney;
					if(payTypeStatus == '1'){
						payTyperResult = paypayMoney+"能量";
					}else if(payTypeStatus == '2'){
						payTyperResult = "￥"+paypayMoney;
					}; 

				var orderNo = resArry[i].orderNo;
				
				//alert("orderFlag"+obj+"订单号"+orderNo);
					 url = 'http://testwan-vc.yxwenge.com/danche/cgbmbssucces.html?state=2&orderFlag='+obj+'&orderNo='+orderNo+'&citizenId='+citizenId+'&contestId='+contestId;
				
				var rInhtmla = '<ol class="contentBox_ol"><li liurl='+url+'><span class="ctBoxSpan1">'+orderTyperResult+'</span><span class="ctBoxSpan2">'+payTyperResult+'</span><span class="ctBoxSpan3">'+activeDate1(resArry[i].creatDate)+'</span><span class="ctBoxSpan4">'+orderStatusResult+'></span></li></ol>';
				$('.contentBox').append(rInhtmla);
			}; 
		},
		error:function(err) {
			alert("网络异常") 
		}
	}) ;
};

$('body').on('click','.contentBox_ol li',function(){	
	var hrefUrl = $(this).attr('liurl');
	//alert("url:"+hrefUrl);
	window.location.href=hrefUrl;
});



/*
 *实现卡片切换
 */
$('.sfDown_ul li').click(function(){
 	var index = $(this).index();
 	$(this).addClass('text_on').siblings().removeClass('text_on');
 	$('.sfDowncontent .contentBox').eq(index).slideDown().siblings().slideUp();
 	repRecord($(this).attr('orderType'));
});

 






 