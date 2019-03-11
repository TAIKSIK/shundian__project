
// 随机生成验证码
var str="";
function radom(){
    var arr=[];   
   for(var i=49;i<123;i++){
        if(i<58 || i>64 && i<91 || i> 96 ){
            arr.push(i)
        }
   }
   arr.sort (function(){
    return Math.random()-0.5;
   })
   for(var j=0;j<4;j++){
        str+=String.fromCharCode(arr[j])
   }
}

$(".checkchange,.check").on("click",function(){
    str="";
    new radom()
    $(".check").html(str)
})





$(window).load(function () {
    $(".checkchange").trigger("click")
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


    // 表单验证 加注册
    var namebar=0;
    var checkbar=0;
    var passbar=0;
    var repassbar=0;

    $(".login-name").on("blur",function(){
        if(/^[0-9]{11}$/.test(this.value)){
            $(".name-error").html("");
            namebar = 1;
        }else{
            $(".name-error").html("请输入正确的手机号注册");
            namebar = 0;
        }
    })

    $(".log-check").on("blur",function(){
        if(this.value == $(".check").html()){
            $(".check-error").html("");
            checkbar = 1;
        }else{
            $(".check-error").html("请输入正确的验证码，验证码区分大小写");
            checkbar = 0;
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
    $(".login-repass").on("blur",function(){
        if(this.value == $(".login-pass").val()){
            $(".repass-error").html("");
            repassbar = 1;
        }else{
            $(".repass-error").html("密码与确认密码不相符，请重新输入");
            repassbar = 0;
        }
    })
    $(".btn").on("click",function(){
        $(".login-name,.log-check,.login-pass,.login-repass").trigger("blur");
        if(namebar && checkbar && passbar && repassbar){
            $.ajax({
                url:"http://www.liyangyf.com/ctrl/register.php",
                data:{
                    tel:$(".login-name").val(),
                    pass:$(".login-pass").val()
                },
                success:function(res){
                    $(".error-warning").stop().hide().html("");
                    if(res == 1){
                        console.log(res)
                        $(".error-warning").stop().show().html("恭喜注册成功，3秒后跳转到登录界面！");
                       setTimeout(function(){
                            $(".error-warning").stop().hide().html("");
                           location.href="login.html"
                       },5000)
                        
                    }else{
                        console.log(res)
                        $(".error-warning").stop().show().html("该用户名已被注册，请重新输入！");
                        setTimeout(function(){
                            $(".error-warning").stop().hide().html("");
                       },5000)                        
                    }
                },
                beforeSend:function(){
                    $(".error-warning").stop().show().html("注册中......");
                }

            })


        }else{
            $(".login-name,.log-check,.login-pass,.login-repass").trigger("blur")
        }
    })


    
})