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
	var ordernumber = '';//缓存一个订单号
	var currentPage = 1;
	var limit = 15;
	var currentUserPage = 1;
	var userlimit = 10;
	
	//遮罩
	function mask()
	{
		var newMaskID = "mask";  //遮罩层id  
		var newMaskWidth = document.body.offsetWidth;//遮罩层宽度  
		var newMaskHeight = document.body.offsetHeight;//遮罩层高度        
		var newMask = document.createElement("div");//创建遮罩层  
		newMask.id = newMaskID;//设置遮罩层id  
		newMask.style.position = "absolute";//遮罩层位置  
		newMask.style.zIndex = "1";//遮罩层zIndex  
		newMask.style.width = newMaskWidth + "px";//设置遮罩层宽度  
		newMask.style.height = newMaskHeight + "px";//设置遮罩层高度  
		newMask.style.top = "0px";//设置遮罩层于上边距离  
		newMask.style.left = "0px";//设置遮罩层左边距离  
		newMask.style.background = "#fff";//#33393C//遮罩层背景色  
		newMask.style.filter = "alpha(opacity=40)";//遮罩层透明度IE  
		newMask.style.opacity = "0.40";//遮罩层透明度FF  
		document.body.appendChild(newMask);//遮罩层添加到DOM中  
	}
	
	//获取订单列表
	function getOrderList(currentPage)
	{
		$.ajax({
			url:"/web360/content.searchOrdersByAdmin?limit=" + limit + "&&offset=" + (currentPage - 1) * limit + "",
			cache:false,
			dataType:"json"
		}).done(function(data){
			//添加分页的显示
			$("#page").pagination({
				items: data['totalNum'],
				itemsOnPage: limit,
				currentPage: currentPage,
				prevText: '上一页',
				nextText: '下一页',
				cssStyle: 'light-theme',
				selectOnClick: true,
				onPageClick : function(pageNumber){
					/*这里调用分页的方法*/
					currentPage = pageNumber;
					getOrderList(currentPage);
				}
			});
			var str = '';
			for(var key in data['data'])
			{
				var temp = data['data'][key];
				var state = '';
				if(temp['owner'] == 'anonymous')
				{
					state = "[<a title='处理订单' class=\"handleorder\" style=\"color:#1D56E7;cursor:pointer;\">处理订单</a>]";
				}
				else
				{
					state = Spolo.decodeUname(temp['owner']);
				}
				str += "<ul>" +
							"<div class='ie6_out'><div class='ie6_in'><li title=\""+temp['nodeName']+"\">"+temp['nodeName']+"</li></div></div>" +
							"<div class='ie6_out'><div class='ie6_in'><li>"+temp['contact']+"</li></div></div>" +
							"<div class='ie6_out'><div class='ie6_in'><li>"+Spolo.parseJcrCreated(temp['jcr:created'])+"</li></div></div>" +
							"<div class='ie6_out'><div class='ie6_in'><li>"+temp['phone']+"</li></div></div>" +
							"<div class='ie6_out'><div class='ie6_in'><li>"+temp['email']+"</li></div></div>" +
							"<div class='ie6_out'><div class='ie6_in'><li ordername=\""+temp['nodeName']+"\">"+state+"</li></div></div>" +
						"</ul>";
			}
			$("#orderlist").html(str);
		});
	}
	
	//检查填写的用户的信息是否为空
	function check()
	{
		var username = $.trim($("#username").val());
		var password = $.trim($("#password").val());
		var Newpassword = $.trim($("#Newpassword").val());
		var email = $.trim($("#email").val());
		var contact = $.trim($("#contact").val());
		var phone = $.trim($("#phone").val());
		if(!username)
		{
			$('#check_name').html('用户名不能为空');
			return false;
		}
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
		if(!email)
		{
			$('#check_email').html('邮箱地址不能为空');
			return false;
		}
		if(!contact)
		{
			$('#check_contact').html('联系人不能为空');
			return false;
		}
		if(!phone)
		{
			$('#check_phone').html('联系方式不能为空');
			return false;
		}
		return true;
	}
	
	//关联用户
	function referUser(userId,callback)
	{
		$.ajax({
			url:"/web360/content.orderRelateUser?userId=" + userId + "&&orderId=" + ordernumber,
			cache:false,
			dataType:"json"
		}).done(function(data){
			callback(data);
		});
	}
	
	//调用方法获取用户列表数据
	function getUser(currentUserPage)
	{
		$.ajax({
			url:"/web360/content/users.searchUsers?limit=" + userlimit + "&&offset=" + (currentUserPage - 1) * userlimit,
			cache:false,
			dataType:"json"
		}).done(function(data)
		{
			//添加分页的显示
			$("#userpage").pagination({
				items: data['totalNum'],
				itemsOnPage: userlimit,
				currentPage: currentUserPage,
				prevText: '上一页',
				nextText: '下一页',
				cssStyle: 'light-theme',
				selectOnClick: true,
				onPageClick : function(pageNumber){
					/*这里调用分页的方法*/
					currentUserPage = pageNumber;
					getUser(currentUserPage);
				}
			});
			userList(data);
		});
	}
	
	//显示用户列表
	function userList(data)
	{
		var str = '';
		for(var key in data['data'])
		{
			var temp = data['data'][key];
			var linkman,phone,email;
			if(temp['linkman'])
			{
				linkman = temp['linkman'];
			}
			else
			{
				linkman = "未知";
			}
			if(temp['phone'])
			{
				phone = temp['phone'];
			}
			else
			{
				phone = "未知";
			}
			if(temp['email'])
			{
				email = temp['email'];
			}
			else
			{
				email = "未知";
			}
			str += "<ul>" +
						"<div class='ie6_out_user'><div class='ie6_in_user'><li>"+Spolo.decodeUname(temp['nodeName'])+"</li></div></div>" +
						"<div class='ie6_out_user'><div class='ie6_in_user'><li>"+Spolo.parseJcrCreated(temp['jcr:created'])+"</li></div></div>" +
						"<div class='ie6_out_user'><div class='ie6_in_user'><li>"+linkman+"</li></div></div>" +
						"<div class='ie6_out_user'><div class='ie6_in_user'><li>"+phone+"</li></div></div>" +
						"<div class='ie6_out_user'><div class='ie6_in_user'><li>"+email+"</li></div></div>" +
						"<div class='ie6_out_user'><div class='ie6_in_user'><li user=\""+temp['nodeName']+"\"><a style='color:#1D56E7;cursor:pointer;' title='选择' class='chooseuser'>选择此用户</a></li></div></div>" +
					"</ul>";
		}
		$("#userlist").html(str);
	}
	
	//搜索用户
	function searchUser(value)
	{
		$.ajax({
			url:"/web360/content/users.search?sub=0&&isiframe=0&&0_userID=" + value + "&&limit=" + userlimit + "&&offset=" + (currentUserPage - 1) * userlimit,
			cache:false,
			dataType:"json"
		}).done(function(data){
			//添加分页的显示
			$("#userpage").pagination({
				items: data['totalNum'],
				itemsOnPage: userlimit,
				currentPage: currentUserPage,
				prevText: '上一页',
				nextText: '下一页',
				cssStyle: 'light-theme',
				selectOnClick: true,
				onPageClick : function(pageNumber){
					/*这里调用分页的方法*/
					currentUserPage = pageNumber;
					searchUser(value);
				}
			});
			userList(data);
		});
	}
	
	//清空创建用户时的表单项
	function clear(){
		$('#username').val('');
		$('#password').val('');
		$('#Newpassword').val('');
		$('#email').val('');
		$('#contact').val('');
		$('#phone').val('');
		$('.check').html('');
	}
	
	$(document).ready(function(){
	
		//获取订单列表
		getOrderList(currentPage);
		
		//点击处理订单弹出的关联界面
		$(document).on('click','.handleorder',function()
		{
			var reg = window.navigator.userAgent;
			if(!/MSIE 6.0/g.test(reg))
			{
				mask();
			}
			ordernumber = $(this).parents('li')[0].getAttribute('ordername');
			$('.relorder').css('display','block');
			getUser(currentUserPage);
		});
		
		//点击关闭关联订单的按钮触发事件
		$(document).on('click','.close',function()
		{
			var reg = window.navigator.userAgent;
			if(!/MSIE 6.0/g.test(reg))
			{
				document.body.removeChild(document.getElementById('mask'));//移除遮罩层  
			}
			$('.relorder').css('display','none');
		});
		
		//点击创建用户事件
		$(document).on('click','.createuser',function()
		{
			$('.relorder').css('zIndex',1);
			clear();
			$('.content_create').css('display','block');
		});
		
		//点击关闭创建用户事件
		$(document).on('click','.close_create',function()
		{
			$('.relorder').css('zIndex',2);
			$('.content_create').css('display','none');
		});
		
		//失去焦点事件,判断输入的信息的格式
		//验证输入的信息的格式，在失去焦点之后
		$('#username').blur(function()
		{
			//用户格式验证
			var username = $.trim($('#username').val());
			var reg = /^[A-Za-z][A-Za-z0-9]*$/;//验证只能以字母或者中文开头
			if(username != "")
			{
				if(reg.exec(username))
				{
					$.ajax({
						url:"/web360/content.validateUsername?username="+Spolo.encodeUname(username),
						cache:false,
						dataType:"json"
					}).done(function(data)
					{
						if(data['suc'])
						{
							$('#check_name').html('用户名已存在!');
						}
						else
						{
							$('#check_name').html('');
						}
					});
					
				}
				else
				{
					$('#check_name').html('您输入的姓名不符合规则!');
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
		
		//点击注册用户事件
		$('#btnregisteruser').click(function()
		{
			var flag = check();
			if(flag && 
				$('#check_password').html() == '' && 
				$('#check_name').html() == '' && 
				$('#check_Newpassword').html() == '' &&
				$('#check_email').html() == '' &&
				$('#check_contact').html() == '' &&
				$('#check_phone').html() == ''
			)
			{
				var username = Spolo.encodeUname($.trim($("#username").val()));
				var password = $.trim($("#password").val());
				var email = $.trim($("#email").val());
				var contact = $.trim($("#contact").val());
				var phone = $.trim($("#phone").val());
				$('.content_create').css('zIndex',1);
				$.ajax({
					url:"/web360/content.createUser?userID=" + username + "&&password=" + password + "&&email=" + email + "&&linkman=" + contact + "&&phone=" + phone,
					cache:false
				}).done(function(data)
				{
					var userId = Spolo.encodeUname($.trim($("#username").val()));
					referUser(userId,function(json){
						alert("注册并关联成功!");
						document.body.removeChild(document.getElementById('mask'));//移除遮罩层  
						$('.content_create').css('display','none');
						$('.relorder').css('display','none');
						$('.relorder').css('zIndex',2);
						$('.content_create').css('zIndex',9999);
						getOrderList();
					});
				});
			}
		});
		
		//点击选择用户进行关联
		$(document).on('click','.chooseuser',function()
		{
			var userId = $(this).parents('li')[0].getAttribute('user');
			$('.relorder').css('zIndex',1);
			referUser(userId,function(data){
				document.body.removeChild(document.getElementById('mask'));//移除遮罩层  
				$('.relorder').css('display','none');
				$('.relorder').css('zIndex',2);
				getOrderList();
			});
		});
		
		//搜索用户
		$('#btnsearchuser').click(function(){
			var value = $.trim($("#usertext").val());
			currentUserPage = 1;
			searchUser(value);
		});
	});
})();