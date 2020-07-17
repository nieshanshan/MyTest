!(function(doc, win) {
	var docEle = doc.documentElement,
	   evt = "onorientationchange" in window ? "orientationchange" : "resize",
		fn = function() {
		  var width = docEle.clientWidth;
		      width && (docEle.style.fontSize = 100* (width / 375) + "px");
		 }; 
		     
		 win.addEventListener(evt, fn, false);
		 doc.addEventListener("DOMContentLoaded", fn, false);
		 
 }(document, window)); //设置字体大小
 
 