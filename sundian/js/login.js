





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


    

     // 表单验证加登录
     var namebar=0;
     var passbar=0;
 
     $(".login-name").on("blur",function(){
         if(/^[0-9]{11}$/.test(this.value)){
             $(".name-error").html("");
             namebar = 1;
         }else{
             $(".name-error").html("请输入正确的手机号登录");
             namebar = 0;
         }
     })
 
    
     $(".login-pass").on("blur",function(){
         if(/^[a-zA-Z0-9]{6,20}$/.test(this.value)){
             $(".pass-error").html("");
             passbar = 1;
         }else{
             $(".pass-error").html("请填写密码,密码为6-20个字符");
             passbar = 0;
         }
     })
     
     $(".btn").on("click",function(){
         $(".login-name,.login-pass").trigger("blur");
         if(namebar && passbar){
            $.ajax({
                url:"http://www.liyangyf.com/ctrl/login.php",
                data:{
                    user:$(".login-name").val(),
                    pass:$(".login-pass").val()
                },
                success:function(res){
                    $(".error-warning").stop().hide().html("");
                    if(res == 0){
                        $(".error-warning").stop().show().html("用户名密码不符，请重新输入!");
                        setTimeout(function(){
                            $(".error-warning").stop().hide().html("");
                       },3000)       
                        
                    }else{
                        localStorage.setItem("user",res);
                        $(".error-warning").stop().show().html("登录成功, 3 秒后跳转到会员中心页！");
                        setTimeout(function(){
                            $(".error-warning").html("登录成功, 2 秒后跳转到会员中心页！");
                        },1000);
                        setTimeout(function(){
                            $(".error-warning").html("登录成功, 1 秒后跳转到会员中心页！");
                        },2000);
                        setTimeout(function(){
                            $(".error-warning").html("登录成功, 0 秒后跳转到会员中心页！");
                        },3000);
                       setTimeout(function(){
                            $(".error-warning").stop().hide().html("");
                           location.href="vip.html"
                       },4000)
                        
                    }
                },
                beforeSend:function(){
                    $(".error-warning").stop().show().html("登录中......");
                }

            })
         }else{
            $(".login-name,.login-pass").trigger("blur");
         }
     })
 
    //  console.log(JSON.parse(localStorage.getItem("user")).pass);
})