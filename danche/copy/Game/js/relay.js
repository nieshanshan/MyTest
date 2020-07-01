var citizenId =null;
if(citizenId == null){
	citizenId = GetQueryString("citizenId");
}
 
//alert("flag"+flag);
//alert("1分享页面citizenId"+citizenId)
/*点击到下载页面*/
 $('.relayclick').click(function(){
 	window.location.href='http://h5.yxwenge.com/itemxq/download.html'
 });
  $('.relayjoy').click(function(){
 	 $('.promptBoxone').show();
     $('.promptBoxtext p').html("请选择微信分享");
     setTimeout(function(){ $('.promptBoxone').fadeOut()},1000);
 });
  
 
   