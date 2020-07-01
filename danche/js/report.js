var contestId = '7c1c661e61614941a41f28795acbb82f';
localStorage.getItem('activityname');
$.ajax({
	url:onconfig.url_test1+'/rest/depokerGrade/findDepokerGradeContestId',// 查询当前赛事成绩接口
	dataType: "JSONP", 
	type: "GET",
	data: {
		"contestId": contestId
	}, 
	success: function(res) {
		console.log(res);
		var activitynamehtml='<b>'+localStorage.getItem('activityname')+'</b>';
		$('.reportBg_h2').append(activitynamehtml);
		var reportdat = res.datas;
		console.log(reportdat);
	 	for(var i = 0;i < reportdat.length; i++){
			var reporthtmla='<li><span class="wapconpic">NO.'+reportdat[i].ranking+'<em></em></span><span>'+reportdat[i].nickName+'</span><span>'+reportdat[i].masterScore+'</span></li>';
			$('.tableBox_ul').append(reporthtmla);
		};
	},
	error:function(err) {
		alert("网络异常") 
	}
}); 

