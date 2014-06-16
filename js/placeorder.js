/* 
 *  This file is part of the SPP(Superpolo Platform).
 *  Copyright (C) by SanPolo Co.Ltd.
 *  All rights reserved.
 *
 *  See http://spp.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://spp.spolo.org/
 *  Any copyright issues, please contact: copr@spolo.org
 */

(function() {

	//验证填写的信息是否为空
	function check()
	{
		var name = $.trim($('#name').val());
		var phone = $.trim($('#phone').val());
		var email = $.trim($('#email').val());
		var code = $.trim($('#code').val());
		if(!name)
		{
			$('#check_name').html('用户名不能为空');
			return false;
		}
		if(!phone)
		{
			$('#check_phone').html('联系方式不能为空');
			return false;
		}
		if(!email)
		{
			$('#check_email').html('邮箱地址不能为空');
			return false;
		}
		if(!code)
		{
			$('#check_code').html('验证码不能为空');
			return false;
		}
		return true;
	}
	
	//获取验证码
	function getVeriCode()
	{
		var dateTime = new Date().valueOf();    // IE8 不支持Date.now()
        var imgPic = "/web360/content.captchaCreate?t=" + dateTime;
        $("#imgcode").attr("src", imgPic);
	}
	
	//生成订单
	function getOrder()
	{
		var name = $.trim($('#name').val());
		var phone = $.trim($('#phone').val());
		var email = $.trim($('#email').val());
		var url = "/web360/content.saveOrderInfo?contact=" + name + "&&phone=" + phone + "&&email=" + email;
		$.ajax({
			url:url,
			cache:false,
			dataType:"json"
		}).done(function(data){
			if(data['suc'])
			{
				$("#ordernumber").html(data['info']);
				$("#sucessimg").attr('src','image/suc.png');
			}
			else
			{
				$("#order").html('');
				$("#inform").html('');
				$("#ordernumber").html("对不起，订单生成失败，请重新下单！");
				$("#sucessimg").attr('src','image/error.png');
				$("#sucessimg").css('width','82px');
				$("#sucessimg").css('height','82px');
			}
			$('.usermess').css('display','none');
			$('.placeorder').css('display','block');
			//发邮件功能，先注释
			// var newurl = "/web360/content.sendOrderInfo?contact=" + name + "&&phone=" + phone + "&&email=" + email;
			// $.ajax({
				// url:newurl,
				// cache:false
			// }).done(function(){
								
			// });		
		});
	}
	//清空下单时填写的信息
	function clear()
	{
		$('#name').val('');
		$('#phone').val('');
		$('#email').val('');
		$('#code').val('');
		console.log($('#code').val('') + "  suzigang");
		$('.check').html('');
	}

	$(document).ready(function() {
	
		//获取当前用户
		var currentUser = Spolo.getUserId();
		//点击我要下单事件
		$('#btnPlaceOrder').click(function()
		{
			$('.usermess').css('display','block');
			if(currentUser != "anonymous")
			{
				$.ajax({
					url:"/web360/content.searchUsers?20_userID=" + currentUser,
					cache:false,
					dataType:"json"
				}).done(function(data){
					//获取验证码
					getVeriCode();
					$('#name').val(data['data']['/web360/content/users/' + currentUser]['linkman']);
					$('#phone').val(data['data']['/web360/content/users/' + currentUser]['phone']);
					$('#email').val(data['data']['/web360/content/users/' + currentUser]['email']);
					$('#code').val('');
				});
			}
			else
			{
				clear();
				getVeriCode();
			}
			
		});
		
		//点击关闭按钮
		$('#close').click(function()
		{
			$('.usermess').css('display','none');
		});
		
		//验证填写的信息，都是必填项，并且按照一定的格式
		//点击提交订单的时候进行判断
		$('#submitorder').click(function()
		{
			var flag = check();
			if(flag && $('#check_name').html() == '' && $('#check_phone').html() == '' && $('#check_email').html() == "")
			{
				//验证码验证
				var code = $.trim($("#code").val());
				var url = "/web360/content.captchaCheck?input=" + code;
				$.ajax({
					url: url,
					cache: false      // 不使用缓存
				}).done(function (data) {
					data = eval("("+data+")");
					if (data["success"]) 
					{
						$("#check_code").html("");
						//调用后端方法提交订单
						/*TODO*/
						getOrder();
					} 
					else 
					{          
						$("#check_code").html("验证码输入错误!");
						getVeriCode();
					}
				});
			}
		});
		
		//验证输入的信息的格式，在失去焦点之后
		$('#name').blur(function()
		{
			//用户格式验证
			var name = $.trim($('#name').val());
			var reg = /^[\u4E00-\u9FA5A-Za-z][\u4E00-\u9FA5A-Za-z0-9]*$/;//验证只能以字母或者中文开头
			if(name != "")
			{
				if(reg.exec(name))
				{
					$('#check_name').html('');
				}
				else
				{
					$('#check_name').html('您输入的姓名不符合规则!');
				}
			}
		});
		$('#phone').blur(function()
		{
			//电话格式验证，只能是数字组成 
			var phone = $.trim($('#phone').val());
			var reg = /^[0-9][0-9]*$/;
			if(phone != "")
			{
				if(reg.exec(phone))
				{
					$('#check_phone').html('');
				}
				else
				{
					$('#check_phone').html('您输入的电话号码有误!');
				}
			}
		});
		$('#email').blur(function()
		{
			//电子邮箱验证
			var email = $.trim($('#email').val());
			var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if(email != "")
			{
				if(reg.exec(email))
				{
					$('#check_email').html('');
				}
				else
				{
					$('#check_email').html('您输入的邮箱格式有误!');
				}
			}
		});
		
		//刷新验证码
		$("#refreshimg").click(function()
		{
			getVeriCode();
		});
		
		//生成订单之后，点击确定，隐藏div
		$("#ordersure").click(function(){
			$('.placeorder').css('display','none');
		});
	});

})();