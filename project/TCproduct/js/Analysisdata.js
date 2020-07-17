ajaxfenye(1);//第一次进来展示1页的数据
var a =new Paging('page', {
    nowPage: 1, // 当前页码
    pageNum: 100, // 总页码
    buttonNum: 9, //要展示的页码数量
    canJump: 1,// 是否能跳转。0=不显示（默认），1=显示
    showOne: 1,//只有一页时，是否显示。0=不显示,1=显示（默认）
    callback: function (num) { //回调函数
        console.log(num);
        ajaxfenye(num);
    }
})
function ajaxfenye(num){
	var _data={
		"offset":num,
		"length":9
	}
	$.ajax({
	type:'GET',
	dataType:"JSON",
	url:DATASET,//数据集合
	data:_data,
	success: function(res) {
		//console.log(res.list);
		$('.loading').hide();//加载中隐藏
		$('.page').show();//分页显示
		localStorage.setItem("data", JSON.stringify(res.list));//存储数据
		$('.TechnicalAnalysisBody').html(' ');
		for(var i=0; i < res.list.length; i++){
			var m=res.list[i]
			var opinion_ST = m.opinion_st;//短期视图
			var opinion_MT = m.opinion_mt;//长期视图
			var alternative_media = m.alternative_media;//详情图片地址
			var paragraph_arr = m.paragraph_arr;//详情内容
			if(opinion_ST == "0"){
				var opistst = '<td class="dataone">震荡</td>' 
			}else if(opinion_ST == "1"){
				var opistst = '<td class="dataone">限制性上涨</td>' 
			}else if(opinion_ST == "2"){
				var opistst = '<td class="dataone">上涨</td>' 
			}else if(opinion_ST == "-1"){
				var opistst = '<td class="dataone">限制性下跌</td>' 
			}else if(opinion_ST == "-2"){
				var opistst = '<td class="dataone">下跌</td>' 
			}
			if(opinion_MT == "0"){
				var opistmt = '<td class="datathree">震荡</td>' 
			}else if(opinion_MT == "1"){
				var opistmt = '<td class="datathree">看涨</td>' 
			}else if(opinion_MT == "-1"){
				var opistmt = '<td class="datathree">看跌</td>' 
			} 
			var ahtml = '<tr><td>'+m.name+'</td><td>'+m.date_hour+'</td><td><a href="analysisdetail.html?num='+i+'" target="_blank" class="PopWindowNewsPoster">'+m.story_title+'</a></td>'+opistst+''+opistmt+'<td>'+m.chartlevels_last+'</td></tr>'
			$('.TechnicalAnalysisBody').append(ahtml);
		}
	},
	error: function(res) {
 		console.log(res);
	}
});
}