$(window).load(function () {
	// 二级菜单默认隐藏 鼠标经过显示离开消失功能
	$(".main-nav-list").hover(function () {
		$(".main-nav-classify").stop().show();
	}, function () {
		$(".main-nav-classify").hide()
	});

	$(".main-nav-classify").children("li").hover(function () {
		$(this).parent().show()
	}, function () {
		$(".main-nav-right").children(".main-nav-right-in").on("mouseenter", function () {
			$(".main-nav-right").children(".main-nav-right-in").off("mouseenter")

			$(".main-nav-classify").show();
			event.stopPropagation()
		});
		$(".main-nav-right").children(".main-nav-right-in").on("mouseleave", function () {
			$(".main-nav-right").children(".main-nav-right-in").off("mouseleave");

			$(".main-nav-classify").hide();
			event.stopPropagation()
		})
		$(this).parent().hide();
		event.stopPropagation()
	})
	
	// 获取用户名
	$(".vip-user,.vip-right-user").html(JSON.parse(localStorage.getItem("user")).user)

	// 左侧菜单收起与拉下
	$(".vip-left").children("li").on("click","span",function(){
		$(this).parent().children(".vip-left-in").stop().slideToggle(500);
	})
})