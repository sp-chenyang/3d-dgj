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
 **/
 (function()
{		
	//检查填写的用户的信息是否为空
	function check()
	{
		var contact = $.trim($("#contact").val());
		var phone = $.trim($("#phone").val());
		var email = $.trim($("#email").val());
		if(!contact)
		{
			$('#check_contact').html('联系人不能为空');
			return false;
		}
		if(!phone)
		{
			$('#check_phone').html('联系电话不能为空');
			return false;
		}
		if(!email)
		{
			$('#check_email').html('邮箱地址不能为空');
			return false;
		}
		return true;
	}

	//清空创建用户时的表单项
	function clear(){
		$('#contact').val('');
		$('#phone').val('');
		$('#email').val('');
	}

	//获取被编辑用户的初始信息
	function getCurrMess(map)
	{
		var linkman = map['linkman'];
		var phone = map['phone'];
		var email = map['email'];
		$('#contact').val(linkman);
		$('#phone').val(phone);
		$('#email').val(email);

	}

	$(document).ready(function()
	{
		var currentUser = window.parent.currentUser;

		//获取修改用户的初始信息
		var map = Spolo.getUrlVars();
		getCurrMess(map);
		
		//点击修改基本信息事件
		$('#btnbassure').click(function()
		{
			var flag = check();
			if(flag && $('#check_contact').html() == '' && $('#check_phone').html() == '' && $('#check_email').html() == '')
			{
				Mask.createMask();
				var contact = $.trim($("#contact").val());
				var phone = $.trim($("#phone").val());
				var email = $.trim($("#email").val());
				$.ajax({
					url:"/web360/content/users/" + currentUser + ".updatePro?phone=" + phone + "&&contact=" + contact + "&&email=" + email,
					cache:false,
					dataType:'json'
				}).done(function(data)
				{
					if(data['suc'])
					{
						Mask.remove();
						alert('修改成功!');
						//clear();
					}
				});
			}
		});

		$('#contact').blur(function()
		{
			var contact = $.trim($('#contact').val());
			var reg = /^[A-Za-z][A-Za-z0-9]*$/;//验证只能以字母或者中文开头
			if(contact != "")
			{
				if(reg.exec(contact))
				{
					$('#check_contact').html('');
				}
				else
				{
					$('#check_contact').html('您输入的联系人有误!');
				}
				
			}
		});

		$('#phone').blur(function()
		{
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
	});
})();