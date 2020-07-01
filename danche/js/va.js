var	orderFlag = null;  //window.localStorage.getItem("orderFlag");//dingdanid
var	orderNo =  null; //window.localStorage.getItem("orderNo");//订单号
var state = null;
var citizenId = null;
var contestId = null;
if(orderFlag == null){
	orderFlag =  GetQueryString("orderFlag");
}

if(orderNo == null){
	orderNo =  GetQueryString("orderNo");//订单号
}

	if(orderFlag == '2'){//重购
		//$('.paysuccess_text').html('重购成功');
		$('.paytext').text('重购成功');
		$('.pantype_b').text('重购消费');
		ajax_sw();
		 
	}else if(orderFlag == '3'){
		$('.paytext').text('补码成功');
		$('.pantype_b').text('补码消费');
		ajax_sw();
	 
	}else if(orderFlag == '4'){
		$('.pantype_b').text('边赛消费');
		$('.paytext').text('边赛报名成功');
		$('.sanText .dis_none').css("display","none");
		ajax_sw();
	}
function ajax_sw(){
	$.ajax({
		url:onconfig.url_test1+"/rest/depokerOrder/getSuccessOrderDetail",//查询订单详情
		dataType: "JSONP", 
		type: "GET",
		data: {"orderNo":orderNo}, 
		success: function(res) {
			console.log(res);
			if (res.code == "1000"){
				var payType,pay_maonN;
				if(res.datas.payType == '1'){//zhifu类型
			 		payType = '能量支付';	
			 		pay_maonN = res.datas.userEnergyNum;
				}else if(res.datas.payType == '3'){
			 		payType = '微信支付';
			 		pay_maonN = res.datas.payMoney;
				}
				$('.fangshi b').html(payType);
				$('.pay_maonN b').html(pay_maonN);
				//获得订单实付金额userEnergyNum / res.datas.userEnergyNum
				 
				var pay_creat = '<b>'+activeDate(res.datas.creatDate)+'</b>';//riqi
				$('.pay_data').append(pay_creat);

				var orderNn = '<b>'+res.datas.orderStatus+'</b>';//订单状态
				$('.nao_order').append(orderNn);

				// orderNorr = res.datas.orderNo;//订单号

				var ding = '<b>'+res.datas.orderNo+'</b>'
				$('.wedv').append(ding);


				$('.dis_none').append('<b>'+res.datas.orderNum+'</b>');
				if(res.datas.orderStatus == '1'){
				$('.nao_order').text('未消费');
				}else if(res.datas.orderStatus == '2'){
				$('.nao_order').text('已消费');
				}else if(res.datas.orderStatus == '3'){
				$('.nao_order').text('已取消');
				}else if(res.datas.orderStatus == '4'){
				$('.nao_order').text('已退款');
				}
	 
        	}	
		},
		error:function(err) {
			alert("网络异常") 
		}
	})
}