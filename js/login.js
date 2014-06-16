/**
 *  This file is part of the Glue(Superpolo Glue).
 *  Copyright (C) by SanPolo Co.Ltd.
 *  All rights reserved.
 *
 *  See http://www.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://www.spolo.org/
 *  Any copyright issues, please contact: spolo@spolo.org
 *
 **/
(function () {
    /**
     * 获取用户角色，根据用户角色跳转相应页面
     * @param username  用户名称
     */
    function getUserRole(username) {     // 取得用户角色
        Gdata.getUserRole({
            "userID": username,
            "success": function (data) {
                var role = data["role"];
                if (role == "maker") {
                    window.location.href = "web360core/maker/index.html";
                } else if (role == "admin") {
                    window.location.href = "admin/index.html";
                } else if (role == "normalAdmin") {
                    window.location.href = "admin/index.html";
                } else {
                    window.location.href = "web360gen/user/index.html";
                }
            },
            "error": function (err) {
            }
        });
    }

    /**
     * 刷新验证码
     */
    function refreshCaptcha(){
        var dateTime = new Date().valueOf();    // IE8 不支持Date.now()
        var imgPic = "/web360/content.captchaCreate?t=" + dateTime;
        $("#imgPic").attr("src", imgPic);
    }

    /**
     * login 登录
     * @param username  用户名
     * @param password  密码
     */
    function login(username, password) {
        Gdata.login({
            "username": username,
            "password": password,
            "success": function () {
                $("#loginError").html("登录成功");
                $("#loginError").css("color", "green");
                getUserRole(username);
            },
            "error": function (error) {
                $("#loginError").html("用户名或密码错误,请重新输入");
                $("#loginError").css("color", "red");
                refreshCaptcha() ;
            }
        });
    }

    /**
     * 验证用户名、密码、验证码是否为空
     */
    function checkEmpty() {
        var username = $("#username").val();
        var password = $("#password").val();
        var captchaInput = $("#captchaInput").val();
        if (username == "") {
            $("#loginError").html("请输入用户名");
            $("#loginError").css("color", "red");
            return false;
        }
        if (password == "") {
            $("#loginError").html("请输入密码");
            $("#loginError").css("color", "red");
            return false;
        }
        if (captchaInput == "") {
            $("#loginError").html("请输入验证码");
            $("#loginError").css("color", "red");
            return false;
        }
        return true;
    }

    /**
     * 验证用户输入的验证码是否正确，
     * 正确的话直接验证用户名和密码
     * @param loginFlag 判断是否进行登录
     */
    function checkCaptcha(loginFlag) {
        var username = $("#username").val();
        var password = $("#password").val();
        var input = $("#captchaInput").val();          // 用户输入的验证码
        var url = "/web360/content.captchaCheck?input=" + input;
        $.ajax({
            url: url,
            cache: false      // 不使用缓存
        }).done(function (data) {
				data = eval("("+data+")");
                if (data["success"]) {
                    $("#loginError").text("");
                    if(loginFlag){
                        login(username, password);
                    }

                } else {                  // 验证码输入错误
                    $("#loginError").text("验证码输入错误");
                    $("#loginError").css("color", "red");
                    refreshCaptcha() ;
                }
            });
    }

// ==================================================================
// 程序的入口
    $(document).ready(function () {

		 $("#username").attr("maxlength","30");
		 $("#password").attr("maxlength","30");

		 $("#username").focus();
        var imgRandom = Math.random() ;
        var imgSrc = "/web360/content.captchaCreate?t=" + imgRandom;
        $("#imgPic").attr("src", imgSrc);
        /**
         * 输入用户名，键盘抬起时触发
         */
        $("#username").keyup(function (event) {           
            if (event.keyCode == 13) {
                var checkFlag = checkEmpty();  // 非空验证
                if(checkFlag){
                    checkCaptcha(true);        // 验证验证码，并判断用户名和密码
                }                
            }
        });
        /**
         * 输入密码，键盘按下时触发
         */
        $("#password").keydown(function (event) {            
            if (event.keyCode == 13) {
                var checkFlag = checkEmpty();  // 非空验证
                if(checkFlag){
                    checkCaptcha(true);        // 验证验证码，并判断用户名和密码
                }                
            }
        });

        /**
         * 输入验证码，键盘按下时触发
         */
        $("#captchaInput").keydown(function (event) {            
            if (event.keyCode == 13) {
                var checkFlag = checkEmpty();  // 非空验证
                if(checkFlag){
                    checkCaptcha(true);        // 验证验证码，并判断用户名和密码
                }                
            }
        });
        /**
         * 输入验证码，丢失光标时触发
         */
        $("#captchaInput").focusout(function () {
            var checkFlag = checkEmpty();  // 非空验证
            if (checkFlag) {
                checkCaptcha(false);        // 验证验证码，并判断用户名和密码    // 全部填写正确，也不能直接进行登录
            }
        });

        /**
         * 刷新验证码
         */
        $("#captchaCreate").click(function () {
            refreshCaptcha() ;
        });
        /**
         * 点击登录按钮
         */
        $("#signIn").click(function () {
            var checkFlag = checkEmpty();//  非空验证
            if (checkFlag) {
                checkCaptcha(true);          // 验证验证码，并判断用户名和密码
            }

        });

    });
})();
