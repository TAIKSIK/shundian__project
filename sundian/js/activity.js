
$(window).load(function(){

	// 二级菜单默认隐藏 鼠标经过显示离开消失功能
  $(".main-nav-list").hover(function(){
    $(".main-nav-classify").stop().show();
  },function(){
    $(".main-nav-classify").hide()
	});

	$(".main-nav-classify").children("li").hover(function(){
		$(this).parent().show()
	},function(){
		$(".main-nav-right").children(".main-nav-right-in").on("mouseenter",function(){            
			$(".main-nav-right").children(".main-nav-right-in").off("mouseenter")            
			
			$(".main-nav-classify").show();          
			event.stopPropagation()
	});
	$(".main-nav-right").children(".main-nav-right-in").on("mouseleave",function(){
			$(".main-nav-right").children(".main-nav-right-in").off("mouseleave");
		
			$(".main-nav-classify").hide();       
			event.stopPropagation()
	})
	$(this).parent().hide();     
	event.stopPropagation()
	})
  

//   活动倒计时
var myDate = "11/11/2019";
		
		var dataS = Date.parse(myDate);
		setInterval(function(){
					
		
		var d=new Date();
		var timeLass = (dataS-Date.parse(d))/1000;
		var timeD = Math.floor(timeLass/60/60/24)
		var timeH = Math.floor(timeLass/60/60)-timeD*24
		var timeM = Math.floor(timeLass/60)-timeD*24*60-timeH*60
		var timeS = Math.floor(timeLass)-timeD*24*60*60-timeH*60*60-timeM*60
			
			
			$(".timeD").html(timeD)
			$(".timeH").html(timeH)
			$(".timeM").html(timeM)
			$(".timeS").html(timeS)
			
		},1000)
		
  
})