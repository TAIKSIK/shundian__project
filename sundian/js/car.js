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
	// $(".vip-user,.vip-right-user").html(JSON.parse(localStorage.getItem("user")).user)

	// 获取购物车内数据并渲染页面
	var car = localStorage.getItem("car") ? JSON.parse(localStorage.getItem("car")) : [];
	
	

	if(car == undefined || car.length == 0){
		$(".car-bot").stop().hide();
		$(".car-empty").stop().show()
	}
	else{
		$(".car-bot").stop().show();
		$(".car-empty").stop().hide()
		var str="";
		for(var s=0;s<car.length;s++){
			var temp = parseInt(car[s].price)*car[s].num;
			str+=`
			<tr>
                        <td><input class="check-this"  style="height:20px; width:20px" checked type="checkbox"></td>
                        <td></td>
                        <td>
                            <div class="car-img">
                                <a href="detail.html?${car[s].id}"><img src="${car[s].src[0]}"></a>
                            </div>
                            <div class="car-det">
                                <a href="detail.html?${car[s].id}">${car[s].tit[3]}</a>
                            </div>
                        </td>
                        <td>￥<span class="shop-price">${car[s].price}</span></td>
                        <td style="color:red">￥0.00</td>
                        <td>
                            <div class="num-cut">-</div>
                            <input class="num-value" type="text" value="${car[s].num}">
                            <div class="num-add">+</div>
                        </td>
                        <td style="color:red">￥<span class="tem-math">${temp}</span></td>
                        <td>-</td>
                        <td><span class="this-del" shopid="${car[s].id}">删除</span></td>
                    </tr>
			`
		}
		
		$("tbody").html(str);

		// 删除当前行商品
		$(".this-del").on("click",function(){
			var thisid = $(this).attr("shopid");
			
			for(var p=0;p<car.length;p++){
				if(car[p].id == thisid){
					car.splice(p,1);					
					localStorage.setItem("car",JSON.stringify(car));
					$(this).parent().parent().remove();
					Math();
					if($(".check-this").length == 0){
						location.reload()
					}
				}
			};
		});


		// 删除所有选中的商品

		$(".del-all").on("click",function(){
			var thisid;
			for(var d=0;d<$(".check-this:checked").length;d++){
				thisid = $(".check-this:checked").eq(d).parent().parent().find(".this-del").attr("shopid");
				for(var e=0;e<car.length;e++){
					if(thisid == car[e].id){
						car.splice(e,1);
						localStorage.setItem("car",JSON.stringify(car));
						// $(".check-this:checked").eq(d).parent().parent().remove();
					}
				}
			}
			location.reload();
		})

		
		//商品数量选择功能及小计功能
		

		$(".num-cut").on("click", function () {
			var value = $(this).parent().parent().find(".num-value").val();
			value--;
			if (value <= 1) {
				value = 1;
			}
			$(this).parent().parent().find(".num-value").val(value);
			
			$(this).parent().parent().find(".tem-math").html(parseInt($(this).parent().parent().find(".shop-price").text())*parseInt($(this).parent().find(".num-value").val()));

			var thisid = $(this).parent().parent().find(".this-del").attr("shopid");
			for(var h=0;h<car.length;h++){
				if(car[h].id == thisid){
					car[h].num = value;
					localStorage.setItem("car",JSON.stringify(car));
				}
			};
			Math()
		})
		$(".num-add").on("click", function () {
			var value = $(this).parent().parent().find(".num-value").val();
			value++;
			$(this).parent().parent().find(".num-value").val(value);
			$(this).parent().parent().find(".tem-math").html(parseInt($(this).parent().parent().find(".shop-price").text())*parseInt($(this).parent().find(".num-value").val()));
			var thisid = $(this).parent().parent().find(".this-del").attr("shopid");
			for(var h=0;h<car.length;h++){
				if(car[h].id == thisid){
					car[h].num = value;
					localStorage.setItem("car",JSON.stringify(car));
				}
			};
			Math()
		})


		$(".num-value").on("input",function(){
			$(this).parent().parent().find(".tem-math").html(parseInt($(this).parent().parent().find(".shop-price").text())*parseInt($(this).val()));
			var thisid = $(this).parent().parent().find(".this-del").attr("shopid");
			for(var h=0;h<car.length;h++){
				if(car[h].id == thisid){
					car[h].num = parseInt($(this).val());
					localStorage.setItem("car",JSON.stringify(car));
				}
			};
			Math()
		})




		// 计算共多少商品 选中几件 及总额
		function Math(){
				var allNum=0;
				var checkNum=0;
				var checkPrice=0;
				for(var i=0;i<$(".check-this").length;i++){
					allNum+=Number($(".check-this").eq(i).parent().parent().find(".num-value").val())
				}
				for(var i=0;i<$(".check-this[checked]").length;i++){
					checkNum+=Number($(".check-this[checked]").eq(i).parent().parent().find(".num-value").val());
					checkPrice+=Number($(".check-this[checked]").eq(i).parent().parent().find(".tem-math").text())
				}
				
				if(allNum == checkNum){
					$(".check-all").attr("checked",true).prop("checked",true);
				}
				
				$(".all-num").html(allNum)
				$(".checked-num").html(checkNum)
				$(".all-price").html(checkPrice)
		}

		// 全选与取消全选
		$(".check-this").on("click",function(){

			
			if($(this).is(":checked")){
				$(this).attr("checked",'true').prop("checked",true);;
			}else{
				$(this).removeAttr("checked");
				$(".check-all").removeAttr("checked").prop("checked",false);
			}
			Math()
		})
		$(".check-all").on("click",function(){
			if($(this).is(":checked")){
				$(".check-all").attr("checked",true).prop("checked",true);
				
				$(".check-this").attr("checked",true).prop("checked",true);
				
			}else{
				$(".check-all").removeAttr("checked").prop("checked",false);
				$(".check-this").removeAttr("checked").prop("checked",false);
			}
			Math()
		})
		
		Math();



	}
		
	
	


	



	
})