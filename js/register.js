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

(function () {   // 只在这个域中
    var usernameFlag = false,		// 用户名验证
        passwordFlag = false, 		// 密码验证
        repasswordFlag = false, 	// 确认密码验证
        phoneFlag = true,	        // 手机号验证
        captchaFlag = false;       // 验证码
//检查用户名是否为email邮箱
    function isEmail(text) {

        // 整个用户名的命名规则
        var pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/img;

        // 判断整个用户名是否符合上述规则
        var flag = pattern.test(text);

        var temp = text;
        if (typeof(text) == "object") {
            temp = text.toString();
        }

        // 1.判断用户名的首字符 --- 字母(a-z)或数字
        // 截取用户名的首字符
        var first_char = temp.substring(0, 1);
        // 用户名首字符规则 --- 字母(a-z)或数字
        var reg_first = /^[a-zA-Z0-9]{1}$/;
        // 判断用户名首字符是否满足正则表达式 --- 字母(a-z)或数字
        var first_bool = reg_first.test(first_char);

        // 2.判断@以前的最后一个字符 --- 字母(a-z)或数字
        // 截取@以前部分字符串
        var email_uname = temp.split('@')[0];
        // 截取@以前的最后一个字符
        var last_uname = email_uname.substring(email_uname.length - 1);
        // @以前最后一个字符的规则 --- 字母(a-z)或数字
        var reg_last = /^[a-zA-Z0-9]{1}$/;
        // 判断@以前最后一个字符是否符合要求 --- 字母(a-z)或数字
        var last_bool = reg_last.test(last_uname);

        // 判断用户名是否满足规则并返回值
        if (flag && last_bool && first_bool) {
            $("#usererror").text("邮箱格式正确");
            $("#userDiv").removeClass("error");
            $("#userDiv").addClass("success");
            return true;
        } else {							// 设置错误提示格式
            $("#usererror").text("邮箱格式不正确");
            $("#userDiv").removeClass("success");
            $("#userDiv").addClass("error");
            return false;
        }
    }

    /*验证用户是否存在*/
    function validataUsername(username) {
        Gdata.validataUsername({
            "username": username,
            "success": function (data) {
                if (data) {       // 存在用户名
                    hasUsername();
                } else {
                    successUsername();
                }
            }
        });
    }

    /*用户名可以使用*/
    function successUsername() {
        usernameFlag = true;					//  用户名验证成功
        $("#userDiv").removeClass("error");
        $("#usererror").text("用户名可以使用");
        $("#userDiv").addClass("success");
    }

    /*用户名已存在*/
    function hasUsername() {
        usernameFlag = false;
        $("#userDiv").removeClass("success");
        $("#usererror").text("用户名已存在");
        $("#userDiv").addClass("error");
    }

    /*计算出当前密码当中一共有多少种模式 */
    function bitTotal(num) {
        var Modes = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) Modes++;
            num >>>= 1;
        }
        return Modes;
    }

    /*判断某个字符是属于哪一类 */
    function CharMode(iN) {
        if (iN >= 48 && iN <= 57) //数字
            return 1;
        if (iN >= 65 && iN <= 90) //大写字母
            return 2;
        if (iN >= 97 && iN <= 122) //小写
            return 4;
        else
            return 8; //特殊字符
    }

    /*设置进度条*/
    function updatePasswordBar(rating) {
        var ratingClasses = new Array(5);
        ratingClasses[0] = 'short';
        ratingClasses[1] = 'weak';
        ratingClasses[2] = 'fair';
        ratingClasses[3] = 'strong';
        ratingClasses[4] = 'notRated';

        var ratingMessages = new Array(5);
        ratingMessages[0] = '太短';
        ratingMessages[1] = '弱';
        ratingMessages[2] = '一般';
        ratingMessages[3] = '强';
        ratingMessages[4] = '未评级';
        if (rating >= 0 && rating <= 3) {
            $("#passerror").text("密码强度：" + ratingMessages[rating]);
        } else {
            console.log("updatePasswordBar level ");
        }
    }

    /*返回密码的强度级别*/
    function checkStrong(spw) {
        if (spw.length < 6) {
            updatePasswordBar(0); //太短
            $("#passDiv").removeClass("success");
            $("#passDiv").addClass("error");
            $("#reg").addClass("disabled");
        } else {
            passwordFlag = true; 				// 密码验证成功
            $("#passDiv").removeClass("error");
            $("#passDiv").addClass("success");
            var modes = 0;
            for (i = 0; i < spw.length; i++) {
                //测试每一个字符的类别并统计一共有多少种模式.
                modes |= CharMode(spw.charCodeAt(i));
            }
            return bitTotal(modes);
        }
    }

    /*当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色*/
    function checkPass(pwd) {
        if (pwd == null || pwd == '') {
            updatePasswordBar(0);
        } else {
            S_level = checkStrong(pwd);
            switch (S_level) {
                case 1:
                    updatePasswordBar(1); //弱 一种
                    break;
                case 2:
                    updatePasswordBar(2); //一般 两种
                    break;
                case 3:
                    updatePasswordBar(3); //强 三种
                    break;
                case 4:
                    updatePasswordBar(3); //强 四种
                    break;
                default:
                    updatePasswordBar(0);
            }
        }
        return;
    }

    /*验证码非空验证*/
    function checkCaptchaEmpty() {
        var input = $("#captchaInput").val();
        if (input == "请输入验证码") {      // 这里使用了placeholder
            captchaFlag = false;                        // 验证码输入错误
            $("#captchaerror").text("请输入验证码");
            $("#captchaDiv").removeClass("success");
            $("#captchaDiv").addClass("error");
        }
    }

    /*注册成功后进行登录*/
    function login(username, password) {
        Gdata.login({
            "username": username,
            "password": password,
            "success": function () {
                window.location.href = "web360gen/user/index.html";
            },
            "error": function (error) {
                console.log("[register.js error]");
                console.log(error);
            }
        })
    }


// ==================================================================
// 程序的入口
    $(document).ready(function () {
        $("#username").focus();
        var imgRandom = Math.random() ;
        var imgSrc = "/web360/content.captchaCreate?t=" + imgRandom;
        $("#imgPic").attr("src", imgSrc);
        /*用户名验证*/
        $("#password").focusout(function () {		// 非空验证
            var val = $(this).val();
            if (val == "") {
                $("#passerror").text("密码不能为空");
                $("#passDiv").removeClass("success");
                $("#passDiv").addClass("error");
            }
        });

        $("#repassword").focusout(function () {	// 非空验证
            var val = $(this).val();
            if (val == "") {
                $("#repasserror").text("确认密码不能为空");
                $("#repassDiv").removeClass("success");
                $("#repassDiv").addClass("error");
            }
        });


        $("#username").focusout(function () {		// 用户名验证
            var val = $(this).val();
            var result = isEmail(val);
            if (result) {
                validataUsername(val);
            }
        });
        /*密码验证*/
        $("#password").bind("keyup",function () {		// 键盘抬起
            var val = $(this).val();
            var repw = $("repassword").val();
            if (val != "") {
                checkPass(val);
            }
            if (repw != val && val != "" && repw != "") {
                repasswordFlag = false;
                $("#repasserror").text("两次输入不相等");
                $("#repassDiv").removeClass("success");
                $("#repassDiv").addClass("error");
            }
        });

        /*确认密码验证*/
        $("#repassword").keyup(function () {
            var val = $(this).val();
            var pw = $("#password").val();
            if (pw != val) {
                repasswordFlag = false;
                $("#repasserror").text("两次输入不相等");
                $("#repassDiv").removeClass("success");
                $("#repassDiv").addClass("error");
            }
            if (pw == val && pw != "" && val != "") {
                repasswordFlag = true;
                $("#repasserror").text("两次输入相同");
                $("#repassDiv").removeClass("error");
                $("#repassDiv").addClass("success");
            }
        });

        /*联系方式*/
        $("#phone").focusout(function () {
            var pattern = /^1[3|4|5|8][0-9]\d{4,11}$/;
            var phone = $("#phone").val();
            if (phone == "") {
                phoneFlag = true;
                $("#phoneerror").text("联系方式");
                $("#phoneDiv").removeClass("error");
                return;        // 允许为空
            }
            var result = pattern.test(phone);
            if (!result) {
                phoneFlag = false;
                $("#phoneerror").text("请输入手机号");
                $("#phoneDiv").removeClass("success");
                $("#phoneDiv").addClass("error");
            } else {
                phoneFlag = true;
                $("#phoneerror").text("联系方式");
                $("#phoneDiv").removeClass("error");
            }
        });

        /*验证码*/
        $("#captchaInput").focusout(function () {
            var input = $(this).val();          // 用户输入的验证码
            var url = "/web360/content.captchaCheck?input=" + input;
            $.ajax({
                url: url,
                cache: false      // 不使用缓存
            }).done(function (data) {
					data = eval("("+data+")");
                    if (data["success"]) {    // 这里返回的字符串出现了一个换行
                        captchaFlag = true;                       // 验证码输入正确
                        $("#captchaerror").text("验证码输入正确");
                        $("#captchaDiv").removeClass("error");
                        $("#captchaDiv").addClass("success");
                    } else {
                        captchaFlag = false;                      // 验证码输入错误
                        $("#captchaerror").text("验证码输入错误");
                        $("#captchaDiv").removeClass("success");
                        $("#captchaDiv").addClass("error");
                    }
                });
        });

        /*注册按钮*/
        $("#registerIn").click(function () {
            checkCaptchaEmpty();
            if (usernameFlag && passwordFlag && repasswordFlag && phoneFlag && captchaFlag) {
                var username = $("#username").val();
                var password = $("#password").val();
                var company = $("#company").val();
                var linkman = $("#linkman").val();
                var phone = $("#phone").val();
                Gdata.register({
                    "userID": username,
                    "password": password,
                    "phone": phone,
                    "company": company,
                    "linkman": linkman,
                    "success": function (data) {
                        usernameFlag = false;     // 注册成功后不能再注册
                        passwordFlag = false;
                        repasswordFlag = false;
                        phoneFlag = false;
                        captchaFlag = false;
                        $("#register_success").html("注册成功，即将跳转");             // 注册成功
                        $("#register_success").css("color", "red");
                        login(username, password); // 进行登录
                    },
                    "error": function (error) {
                        console.log("Gdata.register failed");
                        console.log(error);
                    }
                });
            }
        });
        /*刷新验证码*/
        $("#captchaCreate").click(function () {
            var dateTime = new Date().valueOf();    // IE8 不支持Date.now()
            var imgPic = "/web360/content.captchaCreate?t=" + dateTime;
            $("#imgPic").attr("src", imgPic);
        });

    });


})();