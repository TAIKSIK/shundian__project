// 根据id请求数据并渲染

var shopid = location.search.split("?")[1]
$.ajax({
	url: "./json/detail.json",
	success: function (res) {
		for (var i = 0; i < res.length; i++) {
			if (shopid == res[i].id) {
				var str1 = "";
				var str2 = "";
				var str3 = "";
				var str4 = "";
				var str5 = "";
				var str6 = "";
				var str7 = "";
				var str = `
				<p class="layout"><a href="index.html" target="_blank">首页</a> > <a href="#">${res[i].tit[0]}</a> > <a href="#">${res[i].tit[1]}</a> > <a href="#">${res[i].tit[2]}</a> > <span>${res[i].tit[3]}</span></p>
				`
				for (var j = 0; j < res[i].src.length; j++) {
					str1 += `
					<img class="detail-show-img-img" src="${res[i].src[j]}"/>
					`
					str2 += `
					<img class="detail-show-out-img" src="${res[i].src[j]}"/>
					`
					str3 += `
					<li class="detail-show-list-in">
                            <img src="${res[i].src[j]}"/>
                    </li>
					`
				}
				for (var z = 0; z < res[i].det.length; z++) {
					str4 += `
					<p>${res[i].det[z]}</p>
					`
				}

				str5 += `
		<div class="detail-show-l f-l">
               
                    <div class="detail-show-img">

                        <div class="detail-show-img-box">
		` + str1 + `
		</div>
                        
                        <div class="detail-show-out">
		` + str2 + `
		</div>
		<div class="detail-show-in"></div>
		<p></p>
	</div>

	<ul class="detail-show-list">
		` + str3 + `
		</ul>

                    <div class="detail-show-mark">
                        <div>商品编号：<span>${res[i].id}</span></div>
                        <div><a>分享到</a><a href="#" title="分享到qq好友"></a><a href="#" title="分享到微信"></a><a href="#" title="分享到新浪微博"></a></div>
                        <div>
                            <span></span>
                        </div>
                        <div>收藏</div>
                    </div>
               
            </div>

            <div class="detail-show-r f-l">
                
                <div class="detail-title">${res[i].tit[3]}</div>
                
                <div class="detail-price">￥<span>${res[i].price}</span></div>
                
                <div class="detail-act" style="display:${res[i].act[0]}"><span>${res[i].act[1]}</span>${res[i].act[2]} <a href="#" title="${res[i].act[2]}">详情></a></div>
                
                <div class="detail-cap" style="display:${res[i].cap[0]}">选择容量<span>${res[i].cap[1]}</span></div>
                
                <div class="detail-num">数量<div class="num-cut">-</div><input class="num-value" type="text" value="1"><div class="num-add">+</div>库存较为充足</div>
                
                <div class="detail-send"><img src="https://sundan.com/themes/shundian/images/iconp.png">顺丰、德邦、顺电配送<img src="https://sundan.com/themes/shundian/images/iconm.png">订单满200元<span>花呗3期免息</span>、包邮</div>
                
                <div class="detail-det">
		` + str4 + `
		</div>
                
                <div class="detail-get">
                    <div class="detail-buy f-l">立即购买</div>
                    <div class="detail-car f-l" shopid="${res[i].id}">加入购物车</div>
                    <a href="#" class="detail-cust f-l">在线客服</a>
                </div>

            </div>
		`


				for (var x = 0; x < res[i].list.length; x++) {
					str6 += `
				<a class="detail-bot-list-in" href="detail.html?001">
							<div class="detail-bot-list-in-l f-l">
								<img src="${res[i].list[x][0]}">
							</div>
							<div class="detail-bot-list-in-r f-l">
								<p>${res[i].list[x][1]}</p>
								<p><span>${res[i].list[x][2]}</span></p>
							</div>
				</a>
				`
				}
				for (var y = 0; y < res[i].int.length; y++) {
					str7 += `
					<img src="${res[i].int[y]}" />
					`
				}

			}
		}

		$(".detail-nav").html(str);
		$(".detail-show").html(str5);
		$(".detail-bot-list").html(str6);
		$(".shop-int").html(str7);






	}

})










$(window).load(function () {

	// 点击购物车检测登录状态
    $(".fix-right-t").eq(0).on("click",function(){
        if(JSON.parse(localStorage.getItem("user"))) {
            location.href = "./car.html"
        }else{
            $(".login-main").show();
        }
	})
	
	// 头部固定加入购物车提示模态框
    $(".moudle-close,.moudle-con,.moudle-go").on("click",function(){
        $(".moudle").stop().fadeOut(500)
    })


    // 加入购物车功能 
	var car = localStorage.getItem("car")?JSON.parse(localStorage.getItem("car")):[];
	if(car){
		 var carNum=0; 
		for(var x=0;x<car.length;x++){
			carNum += car[x].num
			
		}
		$(".fix-right-t").eq(0).children("span").html(carNum);

	}
   
    
     
    $(".detail-car").on("click",function(){
        if(JSON.parse(localStorage.getItem("user")) !=undefined && JSON.parse(localStorage.getItem("user")).length !=0) {
          var thisid = $(this).attr("shopid");
		  carNum=0;
		  var thisNum =parseInt( $(".num-value").val());
		  console.log(thisNum)
               
            $.ajax({
                url:"./json/detail.json",
                success:function(res){
                    for(var i=0;i<res.length;i++){
                        if(res[i].id == thisid){
							res[i].num = thisNum;
                            for(var j=0;j<car.length;j++){
                                if(car[j].id == thisid){
                                    car[j].num += thisNum;
                                    localStorage.setItem("car",JSON.stringify(car));
                                    $(".moudle").stop().fadeIn(500);
                                    for(var x=0;x<car.length;x++){
                                        carNum += car[x].num                                        
                                    }
                                    $(".car-num").html(carNum);
                                    $(".fix-right-t").eq(0).children("span").html(carNum);
                                    return;
                                }
                            }
                            car.push(res[i]);
                            localStorage.setItem("car",JSON.stringify(car));
                            $(".moudle").stop().fadeIn(500);
                            for(var x=0;x<car.length;x++){
                                carNum+=car[x].num
                            }
                            $(".car-num").html(carNum);
                            $(".fix-right-t").eq(0).children("span").html(carNum);
                        }
                    }
                }
            })




        }else{
            $(".login-main").show();
        }
    })
    


	// toTop功能
	$(".fix-toTop").click(function () {
		$("html").animate({
			scrollTop: 0
		})
	})
	
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

	// 放大镜功能

	$(".detail-show-img").on("mouseenter", function () {
		var box = document.querySelector(".detail-show-img")
		var x = "";
		var y = "";
		$(".detail-show-in").stop().show();
		$(".detail-show-out").stop().show();
		$(".detail-show-in").css({
			left: event.offsetX - $(".detail-show-in").width() / 2,
			top: event.offsetY - $(".detail-show-in").height() / 2
		});

		$(".detail-show-img").on("mousemove", function () {
			x = event.offsetX - $(".detail-show-in").width() / 2;
			y = event.offsetY - $(".detail-show-in").height() / 2;
			if (x < 0) x = 0;
			if (x > $(".detail-show-img").width() - $(".detail-show-in").width()) {
				x = $(".detail-show-img").width() - $(".detail-show-in").width()
			}
			if (y < 0) y = 0;
			if (y > $(".detail-show-img").height() - $(".detail-show-in").height()) {
				y = $(".detail-show-img").height() - $(".detail-show-in").height()
			}
			$(".detail-show-in").css({
				left: x,
				top: y
			});
			$(".detail-show-out-img").css({
				left: -x / 500 * 800,
				top: -y / 500 * 800
			})
		})
	})
	$(".detail-show-img").on("mouseleave", function () {
		$(".detail-show-img").off("mousemove")
		$(".detail-show-in").stop().hide();
		$(".detail-show-out").stop().hide();
	})

	$(".detail-show-img-img").eq(0).stop().show().siblings().stop().hide();
	$(".detail-show-out-img").eq(0).stop().show().siblings().stop().hide();
	$(".detail-show-list-in").eq(0).css({
		border: "2px solid #00bbd7",
		padding: "0"
	}).siblings().css({
		border: "1px solid #cccccc",
		padding: "1px"
	});

	$(".detail-show-list").children("li").on("mouseenter", function () {
		$(this).css({
			border: "2px solid #00bbd7",
			padding: "0"
		}).siblings().css({
			border: "1px solid #cccccc",
			padding: "1px"
		});
		$(".detail-show-img-img").eq($(this).index()).stop().show().siblings().stop().hide();
		$(".detail-show-out-img").eq($(this).index()).stop().show().siblings().stop().hide();
	})


	//商品数量选择功能 

	$(".num-cut").on("click", function () {
		var value = $(".num-value").val();
		value--;
		if (value <= 1) {
			value = 1;
		}
		$(".num-value").val(value);
	})
	$(".num-add").on("click", function () {
		var value = $(".num-value").val();
		value++;
		$(".num-value").val(value);
	})


	// 产品介绍标签页切换功能
	$(".detail-bot-r-top").children("li").eq(0).children("span").css({
		color: "#00bbd7",
		borderBottom: "2px solid #00bbd7",
		background: "rgb(247,247,247)"
	})
	$(".detail-bot-r-top").children("li").on("click", function () {
		$(".detail-bot-r-top").children("li").eq(6).off("click");
		$(this).children("span").css({
			color: "#00bbd7",
			borderBottom: "2px solid #00bbd7",
			background: "rgb(247,247,247)"
		}).end().siblings().children("span").css({
			color: "rgb(97,97,97)",
			borderBottom: "none",
			background: "rgb(255,255,255)"
		});
		$(".detail-bot-inout").eq($(this).index()).stop().show().siblings().stop().hide()
	})
	// 商品介绍导航吸顶功能
	$(window).on("scroll", function () {
		if ($(document).scrollTop() >= 1000) {
			$(".detail-bot-r-top").css({
				position: "fixed",
				top: "0"
			})
		} else {
			$(".detail-bot-r-top").css({
				position: ""
			})
		}
	})







})