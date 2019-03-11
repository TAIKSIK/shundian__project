//加载模块



$(window).load(function () {

    var bool = true;

    // 点击右侧购物车检测登录状态
    $(".fix-right-t").eq(0).on("click", function () {
        if (JSON.parse(localStorage.getItem("user")) ==undefined || JSON.parse(localStorage.getItem("user")).length == 0) {
            $(".login-main").show();
        } else {

            if(bool){
                $(".fixcar-right").stop().show().animate({
                right:"0px"
                });
                $(this).css({
                    backgroundColor: "rgba(0, 187, 215, 1)"
                });
                $(".fix-right").stop().animate({
                    right:"320px" 
                });
                bool = false;
            }else{
                $(".fixcar-right").animate({
                    right:"-320px"
                    },function(){
                        $(".fixcar-right").stop().hide();
                    });
                    $(this).css({
                        backgroundColor: ""
                    });
                    $(".fix-right").stop().animate({
                        right:"0px" 
                    });
                    bool = true;
            }
            
            
        }
    })


    // 购物车计算功能
    function fixCar(){

                var carNum = 0;
               
                if(car!=undefined && car.length !=0){
                   
                    for (var x = 0; x < car.length; x++) {
                        carNum += car[x].num;
                       
                    }
                    $(".car-num").html(carNum);
                    $(".fix-right-t").eq(0).children("span").html(carNum);
                    var checkedNum=0;
                    var checkedPrice=0;
                    for(var c=0;c<$(".check-this:checked").length;c++){
                        checkedNum += parseInt($(".check-this:checked").eq(c).parent().parent().find(".num-value").val());
                        checkedPrice += parseInt($(".check-this:checked").eq(c).parent().parent().find(".num-value").val())*parseInt($(".check-this:checked").parent().parent().find(".fixcar-price").text());
                    }
                    
                    $(".fixcar-right-num").html(checkedNum);
                    $(".fixcar-right-price").html(checkedPrice);

                    if($(".check-this:checked").length == $(".check-this").length){
                        
                        $(".check-all").attr("checked",true).prop("checked",true);
                    }

                }         
            
            

    }

    // 购物车页面数据渲染

    function doCar(){
        var cart="";
        for (var x = 0; x < car.length; x++) {
              
            cart+=`
            <li class="fixcar-right-li">
                <div class="fixcar-right-li-l f-l">
                    <input class="check-this" type="checkbox" checked>
                </div>
                <div class="fixcar-right-li-r f-l">
                    <div class="fixcar-right-li-r-t"><a href="detail.html?${car[x].id}">${car[x].tit[3]}</a></div>
                    <div class="fixcar-right-li-r-b">
                        <div class="fixcar-right-li-del" shopid=${car[x].id}>x</div>
                        <a href="detail.html?${car[x].id}" class="fixcar-img f-l">
                            <img src="${car[x].src[0]}" >
                        </a>
                        <div class="fixcar-val f-l">
                                <div class="num-cut f-l">-</div>
                                <input class="num-value f-l" type="text" value="${car[x].num}">
                                <div class="num-add f-l">+</div>
                        </div>
                        <div class="fixcar-price f-l">${car[x].price}</div>
                    </div>
                </div>
            </li>
            `      

        }
        $(".fixcar-right-c").html(cart);

    }


    // 购物车内部功能

    function useCar(){


        // 购物车内全选与取消全选

		
		$(".check-all").on("click",function(){
			if($(this).is(":checked")){
                $(this).attr("checked",true).prop("checked",true);				
				$(".check-this").attr("checked",true).prop("checked",true);
				
			}else{
				$(this).removeAttr("checked").prop("checked",false);
				$(".check-this").removeAttr("checked");
			}
			fixCar();
        })
        
        // 购物车内当前行选中与取消选中
        $(".check-this").on("click",function(){			
			if($(this).is(":checked")){
				$(this).attr("checked",'true').prop("checked",true);;
			}else{
				$(this).removeAttr("checked");
				$(".check-all").removeAttr("checked").prop("checked",false);
			}
			fixCar()
        })
        
       //购物车商品数量选择功能及小计功能
		

		$(".num-cut").on("click", function () {
			var value = $(this).parents("li").find(".num-value").val();
			value--;
			if (value <= 1) {
				value = 1;
			}
			$(this).parents("li").find(".num-value").val(value);
			var thisid = $(this).parents("li").find(".fixcar-right-li-del").attr("shopid");
			for(var h=0;h<car.length;h++){
				if(car[h].id == thisid){
					car[h].num = value;
					localStorage.setItem("car",JSON.stringify(car));
				}
			};
			fixCar()
		})
		$(".num-add").on("click", function () {
			var value = $(this).parents("li").find(".num-value").val();
			value++;
			$(this).parents("li").find(".num-value").val(value);
			var thisid = $(this).parents("li").find(".fixcar-right-li-del").attr("shopid");
			for(var h=0;h<car.length;h++){
				if(car[h].id == thisid){
					car[h].num = value;
					localStorage.setItem("car",JSON.stringify(car));
				}
			};
			fixCar()
		})


		$(".num-value").on("change",function(){
			
			var thisid = $(this).parents("li").find(".fixcar-right-li-del").attr("shopid");
			for(var h=0;h<car.length;h++){
				if(car[h].id == thisid){
					car[h].num = parseInt($(this).val());
					localStorage.setItem("car",JSON.stringify(car));
				}
			};
			fixCar();
        })
        
        // 购物车当前行商品删除功能
       
		$(".fixcar-right-li-del").on("click",function(){
            
			var thisid = $(this).attr("shopid");
		
			for(var p=0;p<car.length;p++){
				if(car[p].id == thisid){
					car.splice(p,1);					
                    localStorage.setItem("car",JSON.stringify(car));
                    $(this).parents("li").remove();
                    if($(".check-this").length ==0){
                       location.reload();
                    }
                    fixCar();                    
				}
			}
		});


    }
    

    // 头部固定加入购物车提示模态框
    $(".moudle-close,.moudle-con,.moudle-go").on("click", function () {
        $(".moudle").stop().fadeOut(300);
        
            doCar();
            fixCar();
            useCar();       
    })



    // 购物车功能 
    
    if (JSON.parse(localStorage.getItem("user")) !=undefined && JSON.parse(localStorage.getItem("user")).length != 0) {
        var car = localStorage.getItem("car") ? JSON.parse(localStorage.getItem("car")) : [];
        if(car!=undefined && car.length !=0){
            // 如果用户在登录状态加载购物车数据
            doCar();
            fixCar();
            useCar();
        }
            
    }



    


    

    // 添加商品到购物车
    $(".shop-show-add").on("click", function () {
        
       
        if (JSON.parse(localStorage.getItem("user")) !=undefined && JSON.parse(localStorage.getItem("user")).length != 0) {
            var thisid = $(this).attr("shopid");
            carNum = 0;

            $.ajax({
                url: "./json/detail.json",
                success: function (res) {
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].id == thisid) {
                            for (var j = 0; j < car.length; j++) {
                                if (car[j].id == thisid) {
                                    car[j].num += 1;
                                    localStorage.setItem("car", JSON.stringify(car));
                                    $(".moudle").stop().fadeIn(300);
                                    for (var x = 0; x < car.length; x++) {
                                        carNum += car[x].num
                                    }
                                    $(".car-num").html(carNum);
                                    $(".fix-right-t").eq(0).children("span").html(carNum);
                                    return;
                                }
                            }
                            car.push(res[i]);
                            localStorage.setItem("car", JSON.stringify(car));
                            $(".moudle").stop().fadeIn(300);
                            for (var x = 0; x < car.length; x++) {
                                carNum += car[x].num
                            }
                            $(".car-num").html(carNum);
                            $(".fix-right-t").eq(0).children("span").html(carNum);
                        }
                    }
                }
            })




        } else {
            $(".login-main").show();
            
        }
    })






    // 上部固定搜索栏与左部固定导航栏功能

    // 根据页面楼层数添加相应左侧导航
    var str = "";
    for (var i = 0; i < $("h1").length; i++) {
        str += `<li>${$("h1")[i].textContent}</li>`
    }
    $(".fix-left").html(str);

    //点击相应左侧导航去往相应楼层
    $(".fix-left").children("li").on("click", function () {
        $(window).off("scroll");
        var liIndex = $(this).index();
        $(this).css({
            background: "#00bbd7"
        }).siblings().css({
            background: "rgb(98,98,98)"
        })
        //    console.log($(".shop-show").eq(liIndex)[0].offsetHeight)
        $("html").animate({
            scrollTop: $(".shop-show").eq(liIndex)[0].offsetTop
        });
        setTimeout(function () {
            $(window).on("scroll", winScroll);
        }, 500)

    })

    // 滚动到固定位置显示与隐藏
    $(window).on("scroll", winScroll)

    function winScroll() {
        if ($(document).scrollTop() > 690) {
            $(".fix-search").stop().show();
            $(".fix-left").stop().show();
        } else {
            $(".fix-search").stop().hide();
            $(".fix-left").stop().hide();
        }
        for (var i = 0; i < $(".shop-show").length; i++) {
            if ($(document).scrollTop() > $(".shop-show").eq(i)[0].offsetTop && $(document).scrollTop() < $(".shop-show").eq(i)[0].offsetTop + $(".shop-show").eq(i)[0].offsetHeight) {
                $(".fix-left").children("li").eq(i).css({
                    background: "#00bbd7"
                }).siblings().css({
                    background: "rgb(98,98,98)"
                })
            }
        }
    }

})

// window.onload 结束


// toTop功能
$(".fix-toTop").click(function () {
    $("html").animate({
        scrollTop: 0
    })
})

// 右下固定活动窗关闭
$(".fix-rightBot-close").click(function () {
    $(".fix-rightBot").hide();
    return false;
})

// 主轮播图部分
var imagesSwitch = true;
var imgTimer = null;
//点击下方页码显示当前图片
$(".imagesNav").children("li").click(function () {
    clearTimeout(imgTimer);
    imgTimer = setTimeout(function () {
        imagesSwitch = true;
    }, 500)

    if (imagesSwitch) {
        $(this).addClass("iActive").siblings().removeClass("iActive");
        $(".imagesList").children("a").eq($(this).index()).stop().fadeIn(500).siblings().stop().fadeOut(500);
        imagesSwitch = false;
    }



});
// 左右按钮功能
$(".iLeft,.iRight").click(function () {
    clearTimeout(imgTimer);
    imgTimer = setTimeout(function () {
        imagesSwitch = true;
    }, 500)
    if (imagesSwitch) {
        var iBoth = 1;
        switch ($(this).index()) {
            case 1:
                iBoth = -1;
                break;
            case 2:
                iBoth = 1;
                break;
        }
        var iIndex = $(".iActive").index() + iBoth;
        if (iIndex > 7) iIndex = 0;
        if (iIndex < 0) iIndex = 7;
        $(".imagesNav").children("li").eq(iIndex).addClass("iActive").siblings().removeClass("iActive");
        $(".imagesList").children("a").eq(iIndex).stop().fadeIn(500).siblings().stop().fadeOut(500);
        imagesSwitch = false;
    }

});
// 自动轮播功能
var autoPlay = setInterval(function () {
    $(".iRight").trigger("click");
}, 3000)
//鼠标进入显示左右按钮及停止自动轮播及鼠标离开相应效果
$(".imagesBox").hover(function () {
    $(".iLeft,.iRight").show();
    clearInterval(autoPlay);

}, function () {
    $(".iLeft,.iRight").hide();
    clearInterval(autoPlay)
    autoPlay = setInterval(function () {
        $(".iRight").trigger("click");
    }, 3000)

})


//请求商品楼层上部信息并渲染

$.ajax({
    url: "./json/shop1.json",
    success: function (res) {
        var str = "";
        var str1 = "";
        var str2 = "";

        for (var i = 0; i < res.length; i++) {
            for (var j = 0; j < res[i].tit3.length; j++) {
                str1 += `
                    <a href="#">${res[i].tit3[j]}</a>
                    `
            }

            for (var z = 0; z < res[i].list.length; z++) {
                str += `
                       <li class="shop-show-bot-in f-l">
                            <a class="shop-show-img" href="detail.html?${res[i].list[z][0]}" target="_blank"><img src="${res[i].list[z][1]}"/></a>
                            <div class="shop-show-title">${res[i].list[z][2]}</div>
                            <div class="shop-show-par">${res[i].list[z][3]}</div>
                            <div class="shop-show-price">￥<span>${res[i].list[z][4]}</span></div>
                            <div class="shop-show-active" style="display:${res[i].list[z][5]}">${res[i].list[z][6]}</div>
                            <div class="shop-show-car">
                                <div class="shop-show-price">￥<span>${res[i].list[z][4]}</span></div>
                                <div class="shop-show-add" shopID=${res[i].list[z][0]}>加入购物车</div>
                            </div>
                       </li>
                       `
            }
            str2 += `
                <div class="shop-show">
                <h1>${res[i].tit1}</h1>
                <div class="shop-show-top">
                    <div class="shop-show-top-l f-l">${res[i].tit2}</div>
                    <div class="shop-show-top-r f-r">
                ` + str1 + `
                </div>
                </div>
                <ul class="shop-show-bot">
                ` + str + `
                </ul>
                </div>
                `
            str = "";
            str1 = "";
        }
        // console.log(str2);
        $(".shop-list").html(str2)
    }
})

// 请求楼层中部数据并渲染

$.ajax({
    url: "./json/shop2.json",
    success: function (res) {
        var str = "";
        var str1 = "";
        var str2 = "";
        for (var i = 0; i < res.length; i++) {
            for (var j = 0; j < res[i].tit3.length; j++) {
                str += `
                <a href="#">${res[i].tit3[j]}</a>
                `
            }

            str1 += `
                <div class="shop-center-bot-l">
                        <a class="shop-center-bot1" href="#"><img src="${res[i].src[0]}"/></a>
                        <a class="shop-center-bot2" href="#"><img src="${res[i].src[1]}"/></a>
                        <a class="shop-center-bot2" href="#"><img src="${res[i].src[2]}"/></a>
                    </div>                    
                    <a class="shop-center-bot3" href="#"><img src="${res[i].src[3]}"/></a>
                    <a class="shop-center-bot3" href="#"><img src="${res[i].src[4]}"/></a>
                    <a class="shop-center-bot4" href="#"><img src="${res[i].src[5]}"/></a>                   
                    <a class="shop-center-bot3" href="#"><img src="${res[i].src[6]}"/></a>
                    <a class="shop-center-bot3" href="#"><img src="${res[i].src[7]}"/></a>
                    <a class="shop-center-bot5" href="#"><img src="${res[i].src[8]}"/></a>
                `

            str2 += `
            <div class="shop-show">
                <h1>${res[i].tit1}</h1>
                <div class="shop-show-top">
                    <div class="shop-show-top-l f-l">${res[i].tit2}</div>
                    <div class="shop-show-top-r f-r">
            ` + str + `
            </div>
            </div>
            <div class="shop-center-bot">
            ` + str1 + `
                </div>
            </div>
            `
            str = "";
            str1 = "";
        }
        // console.log(str2)
        $(".shop-center").html(str2)
    }
})

// 请求四季楼层数据并渲染页面
$.ajax({
    url: "./json/shop3.json",
    success: function (res) {
        var str = "";
        var str1 = "";
        var str2 = "";
        for (var i = 0; i < res[0].tit3.length; i++) {
            str += `
        <a href="#">${res[0].tit3[i]}</a>
        `
        }
        for (var j = 0; j < res[0].list.length; j++) {
            str1 += `
        <li class="shop-show-bot-in f-l">
            <a class="shop-show-img" href="detail.html?${res[0].list[j][0]}" target="_blank"><img src="${res[0].list[j][1]}" /></a>
            <div class="shop-show-title">${res[0].list[j][2]}</div>
            <div class="shop-show-par">${res[0].list[j][3]}</div>
            <div class="shop-show-price">￥<span>${res[0].list[j][4]}</span></div>
            <div class="shop-show-active" style="display:${res[0].list[j][5]}">${res[0].list[j][6]}</div>
            <div class="shop-show-car">
                <div class="shop-show-price">￥<span>${res[0].list[j][4]}</span></div>
                <div class="shop-show-add" shopID=${res[0].list[j][0]}>加入购物车</div>
            </div>
        </li>
        `
        }

        str2 += `
       <div class="shop-show">
            <h1>${res[0].tit1}</h1>
            <div class="shop-show-top">
                <div class="shop-show-top-l f-l">${res[0].tit2}</div>
                <div class="shop-show-top-r f-r">
       ` + str + `
       </div>
       </div>
       <ul class="shop-show-bot">
           <li class="shop-season-pic shop-show-bot-in"><a href="#"><img src="${res[0].tit4}"></a></li>
       ` + str1 + `
       </ul>
       </div>
       `
        str = "";
        str1 = "";
        //    console.log(str2)
        $(".shop-season").html(str2)
    }
})

// 请求特价楼层商品数据并渲染页面

$.ajax({
    url: "./json/shop4.json",
    success: function (res) {
        var str = "";
        for (var i = 0; i < res.length; i++) {
            str += `
            <li class="shop-show-bot-in shop-sales-li f-l">
                <a class="shop-show-img" href="detail.html?${res[i].id}" target="_blank"><img src="${res[i].src}" /></a>
                 <div class="shop-show-title">${res[i].tit}</div>
                <div class="shop-show-par">${res[i].det}</div>
                <div class="shop-show-price">￥<span>${res[i].pric}</span></div>
                <div class="shop-show-active" style="display:none"></div>
                <div class="shop-show-car">
                    <div class="shop-show-price">￥<span>${res[i].pric}</span></div>
                    <div class="shop-show-add" shopID=${res[i].id}>加入购物车</div>
                </div>
            </li>
            `
        }
        // console.log(str)
        $(".shop-sales-in").html(str);
    }
})


// 特价商品层左右移动功能 

var clickTimer=null;
var bool=true;

$(".shop-sales-l").on("click", function () {
    clearTimeout(clickTimer);
    clickTimer = setTimeout(function(){
         bool = true;
    },400)
    if(bool){

       

    var index = $(".shop-sales-in").children("li").eq(0).index();
    var preindex = index-1;
    if(preindex<0) preindex=6;

    $(".shop-sales-in").css({
        width:"1512px",
        left:"-252px"
    })
    $(".shop-sales-in").children("li").eq(index).before($(".shop-sales-in").children("li").eq(preindex))
    $(".shop-sales-in").stop().animate({
        left:"0px"
    },function(){
        $(".shop-sales-in").css({
            width:"1260px"
        })
    })
    bool = false; 
}
});
$(".shop-sales-r").on("click", function () {

    clearTimeout(clickTimer);
    clickTimer = setTimeout(function(){
         bool = true;
    },400)
    if(bool){
    var index = $(".shop-sales-in").children("li").eq(4).index();
    var preindex = index+1;
    if(preindex>6) preindex=0;

    $(".shop-sales-in").css({
        width:"1512px",
        left:"0px"
    })
    $(".shop-sales-in").children("li").eq(index).after($(".shop-sales-in").children("li").eq(preindex))
    $(".shop-sales-in").stop().animate({
        left:"-252px"
    },function(){
        $(".shop-sales-in").children("li").eq(6).after($(".shop-sales-in").children("li").eq(0));
        $(".shop-sales-in").css({
            width:"1260px",
            left:"0px"
        })
    })
    bool = false; 
}
})



// 表单验证加登录
$(".log-close").on("click", function () {
    $(".login-main").hide();
    return false;
})

var namebar = 0;
var passbar = 0;

$(".login-name").on("blur", function () {
    if (/^[0-9]{11}$/.test(this.value)) {
        $(".name-error").html("");
        namebar = 1;
    } else {
        $(".name-error").html("请输入正确的手机号登录");
        namebar = 0;
    }
})


$(".login-pass").on("blur", function () {
    if (/^[a-zA-Z0-9]{6,20}$/.test(this.value)) {
        $(".pass-error").html("");
        passbar = 1;
    } else {
        $(".pass-error").html("请填写密码,密码为6-20个字符");
        passbar = 0;
    }
})

$(".btn").on("click", function () {
    $(".login-name,.login-pass").trigger("blur");
    if (namebar && passbar) {
        $.ajax({
            url: "http://www.liyangyf.com/ctrl/login.php",
            data: {
                user: $(".login-name").val(),
                pass: $(".login-pass").val()
            },
            success: function (res) {
                if (res == 0) {
                    alert("用户名密码不符，请重新输入!");
                } else {
                    localStorage.setItem("user", res);
                    alert("登录成功, 点击确认跳转到会员中心页面！");
                    location.href = "./vip.html"
                }
            }

        })
    } else {
        $(".login-name,.login-pass").trigger("blur");
    }
})









// 右侧固定导航栏与头部固定搜索栏
//     $(document).ready(function(){
//          console.log($(".shop-show").eq(0)[0].offsetTop)
//     })

//     $(window).load(function(){
//         console.log($(".shop-show").eq(0)[0].offsetTop)
//    })
