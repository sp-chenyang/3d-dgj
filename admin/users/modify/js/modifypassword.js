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
		var password = $.trim($("#password").val());
		var Newpassword = $.trim($("#Newpassword").val());
		if(!password)
		{
			$('#check_password').html('密码不能为空');
			return false;
		}
		if(!Newpassword)
		{
			$('#check_Newpassword').html('确认密码不能为空');
			return false;
		}
		return true;
	}

	//清空创建用户时的表单项
	function clear(){
		$('#password').val('');
		$('#Newpassword').val('');
	}

	$(document).ready(function()
	{
		var currentUser = window.parent.currentUser;
		//点击修改密码事件
		$('#btnsure').click(function()
		{
			var flag = check();
			if(flag && $('#check_password').html() == '' && $('#check_Newpassword').html() == '')
			{
				Mask.createMask();
				var password = $.trim($("#password").val());
				$.ajax({
					url:"/web360/content/users/admin.changePwd?userName=" + currentUser + "&&password=" + password,
					cache:false,
					dataType:'json'
				}).done(function(data)
				{
					if(data['success'])
					{
						Mask.remove();
						alert('修改成功!');
						clear();
					}
				});
			}
		});

		$('#password').blur(function()
		{
			var password = $.trim($('#password').val());
			if(password != "")
			{
				if(password.length < 6)
				{
					$('#check_password').html('密码的长度在6-20个字符之间');
				}
				else
				{
					$('#check_password').html('');
				}
			}
		});
		$('#Newpassword').blur(function()
		{
			var Newpassword = $.trim($('#Newpassword').val());
			if(Newpassword != "")
			{
				$('#check_Newpassword').html('');
			}
		});

		//验证两次输入密码是否相同
		$('#Newpassword').blur(function()
		{
			var password = $.trim($('#password').val());
			var Newpassword = $.trim($('#Newpassword').val());
			if(password != Newpassword)
			{
				$('#check_Newpassword').html('两次密码不相同!');
			}
			else
			{
				$('#check_Newpassword').html('');
			}
		});

		$("#password").focus();
	});
})();