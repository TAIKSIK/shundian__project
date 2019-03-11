window.onload = function () {
    // 检测登录状态
    var log = false;

    if (JSON.parse(localStorage.getItem("user"))!=undefined && JSON.parse(localStorage.getItem("user")).length !=0) {
        log = true;
        $(".search-right-4,.search-right-5").hide();
        $(".search-vip").show().children("span").html(JSON.parse(localStorage.getItem("user")).user);
        // 购物车功能 
        var car = localStorage.getItem("car") ? JSON.parse(localStorage.getItem("car")) : [];
        var carNum = 0;
        if (JSON.parse(localStorage.getItem("car")) !=undefined && JSON.parse(localStorage.getItem("car")) != 0) {
            for (var x = 0; x < car.length; x++) {
                carNum += car[x].num

            }
            $(".car-num").html(carNum);

        }
    } else {
        log = false;
        $(".search-right-4,.search-right-5").show();
        $(".search-vip").hide();
    };






    // 点击搜索栏内购物车 检测登录状态




    // 点击购物车 检测登录状态

    $(".search-right-6").on("click", function () {
        if (log) {
            location.href = "car.html"
        } else {
            location.href = "login.html"
        }
    })

    // 点击退出当前账号功能

    $(".del-vip").on("click", function () {
        localStorage.removeItem("user");
        location.reload();
        return false;
    })

    // 头部活动页关闭功能
    $(".head-close").click(function () {
        $(".head-inOut").hide();
    })

    // 二级菜单左侧背景图片加载与切换
    var navI = -1;
    $.each($(".main-nav-classify").find(".classify-in-a"), function () {
        navI++;
        $(this).css({
            backgroundImage: "url(./images/nav-" + navI + "-1.png)"
        })
    });
    //二级菜单右侧数据请求与交互 
    $(".main-nav-right").hide();
    $(".main-nav-classify").children("li").on("mouseenter", function () {
        // 关灯效果
        $(".light-off").show();
        // 切换背景图
        $(this).children("a").css({
            backgroundImage: "url(./images/nav-" + $(this).index() + "-2.png)",
            backgroundColor: "rgba(255, 255, 255,1)",
            color: "#00bbd7"
        });

        // 显示相应二级菜单
        $(".main-nav-right").show().children(".main-nav-right-in").eq($(this).index()).show().siblings().hide();
        event.stopPropagation()
    });
    $(".main-nav-classify").children("li").on("mouseleave", function () {
        //关灯效果关闭 
        $(".light-off").hide();

        // 切换背景图
        $(this).children("a").css({
            backgroundImage: "url(./images/nav-" + $(this).index() + "-1.png)",
            backgroundColor: "rgba(240, 240, 240, 0.8)",
            color: "#333333"
        });

        $(".main-nav-right").children(".main-nav-right-in").on("mouseenter", function () {
            $(".main-nav-right").children(".main-nav-right-in").off("mouseenter")
            $(".main-nav-classify").children("li").eq($(this).index()).children("a").css({
                backgroundImage: "url(./images/nav-" + $(this).index() + "-2.png)",
                backgroundColor: "rgba(255, 255, 255,1)",
                color: "#00bbd7"
            });
            $(".light-off").show();
            $(".main-nav-right").show();
            event.stopPropagation()
        });
        $(".main-nav-right").children(".main-nav-right-in").on("mouseleave", function () {
            $(".main-nav-right").children(".main-nav-right-in").off("mouseleave");
            $(".main-nav-classify").children("li").eq($(this).index()).children("a").css({
                backgroundImage: "url(./images/nav-" + $(this).index() + "-1.png)",
                backgroundColor: "rgba(240, 240, 240, 0.8)",
                color: "#333333"
            });
            $(".light-off").hide();
            $(".main-nav-right").hide();
            event.stopPropagation()
        })
        $(".main-nav-right").hide();
        event.stopPropagation()
    });

    // 三级菜单数据请求与加载
    $.ajax({
        url: "./json/nav.json",
        success: function (res) {
            var str = "";
            var str1 = "";
            var str2 = "";
            // console.log(res[1]);
            // console.log(res[1].t);
            // console.log(res[1].t[1][1]);
            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < res[i].t.length; j++) {
                    for (var z = 0; z < res[i].t[j][1].length; z++) {
                        str += `
                        <a href="#">${res[i].t[j][1][z]}</a> 
                        `
                    }
                    str1 += `                   
                        <li>
                        <span><a href="#">${res[i].t[j][0]}</a></span>
                    ` + str + `
                        </li>                   
                   `;
                    str = "";
                }
                str2 += `
                <div class="main-nav-right-in">
                    <ul class="main-nav-right-in-t">
                ` + str1 + `
                    </ul>
                    <div class="main-nav-right-in-b">
                        <a href="#"><img src="${res[i].b1}" /></a>
                        <a href="#"><img src="${res[i].b2}" /></a>
                        <a href="#"><img src="${res[i].b3}" /></a>
                    </div>
                </div>
                `
                str1 = "";
            }
            // console.log(str2)
            $(".main-nav-right").html(str2)
        }
    })

}