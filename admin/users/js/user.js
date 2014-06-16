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
	var currentPage = 1;
	var limit = 12;
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
	
	//获取所有用户
	function getAllUsers(currentPage)
	{
		$.ajax({
			url:"/web360/content/users.searchUsers?limit=" + limit + "&&offset=" + (currentPage - 1) * limit,
			cache:false,
			dataType:"json"
		}).done(function(data)
		{
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
					getAllUsers(currentPage)
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
			var modify,del;
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
			if(temp['nodeName'] == 'admin')
			{
				modify = '';
				del = '';
			}
			else
			{
				modify = "<img src='image/modify.png' style='width:25px;height:25px;cursor:pointer;' title='修改用户信息' class=\"moduser\" user=\""+temp['nodeName']+"\"/>";
				del = "<img src='image/delete.png' style='width:25px;height:25px;cursor:pointer;' title='删除' class='deluser'/>";
			}
			str += "<ul>" +
						"<div class='ie6_out'><div class='ie6_in'><li>"+Spolo.decodeUname(temp['nodeName'])+"</li></div></div>" +
						"<div class='ie6_out'><div class='ie6_in'><li>"+Spolo.parseJcrCreated(temp['jcr:created'])+"</li></div></div>" +
						"<div class='ie6_out'><div class='ie6_in'><li>"+linkman+"</li></div></div>" +
						"<div class='ie6_out'><div class='ie6_in'><li>"+phone+"</li></div></div>" +
						"<div class='ie6_out'><div class='ie6_in'><li>"+email+"</li></div></div>" +
						"<div class='ie6_out'><div class='ie6_in'><li>"+modify+"</li></div></div>" +
						"<div class='ie6_out'><div class='ie6_in'><li user='"+temp['nodeName']+"'>"+del+"</li></div></div>" +
					"</ul>";
		}
		$("#userlist").html(str);
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
	
	//搜索用户
	function searchUser(value)
	{
		$.ajax({
			url:"/web360/content/users.search?sub=0&&isiframe=0&&0_userID=" + value + "&&limit=" + limit + "&&offset=" + (currentPage - 1) * limit,
			cache:false,
			dataType:"json"
		}).done(function(data)
		{
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

	//获取被编辑用户的初始信息
	function getCurrMess(currentUser,callback)
	{
		if(currentUser != "anonymous")
		{
			$.ajax({
				url:"/web360/content.searchUsers?20_userID=" + currentUser,
				cache:false,
				dataType:"json"
			}).done(function(data){
				callback(data);
				
			});
		}
	}

	//获取用户的角色
	function getUserRole(currentUser,callback)
	{
		$.ajax({
				url:"/web360/content/users/" + currentUser +".getRole?userID=" + currentUser,
				cache:false,
				dataType:"json"
			}).done(function(data){
				callback(data);
			});
	}
		
	$(document).ready(function(){
		
		//获取用户列表
		getAllUsers(currentPage);
		
		//点击创建用户事件
		$(document).on('click','.createuser',function()
		{
			mask();
			clear();
			$('.content_create').css('display','block');
			
		});
		
		//点击关闭创建用户事件
		$(document).on('click','.close_create',function()
		{
			$('.content_create').css('display','none');
			document.body.removeChild(document.getElementById('mask'));//移除遮罩层     
		});

		/*-------------------------注册用户部分---------------------------------*/
		
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
				$.ajax({
					url:"/web360/content.createUser?userID=" + username + "&&password=" + password + "&&email=" + email + "&&linkman=" + contact + "&&phone=" + phone,
					cache:false
				}).done(function(data)
				{
					alert("注册成功!");
					document.body.removeChild(document.getElementById('mask'));//移除遮罩层     
					$('.content_create').css('display','none');
					getAllUsers(1);
				});
			}
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
		
		/*-------------------------搜索用户部分---------------------------------*/

		//搜索用户
		$('#btnsearchuser').click(function(){
			var value = $.trim($("#usertext").val());
			currentPage = 1;
			searchUser(value);
		});

		/*-------------------------删除用户部分---------------------------------*/
		
		//删除用户
		$(document).on('click','.deluser',function(){
			var dthis = $(this);
			var user = dthis.parents('li')[0].getAttribute('user');
			var flag = window.confirm("确定删除该用户么？");
			if(flag)
			{
				$.ajax({
					url:"/web360/content/users/admin.deleteUsers?userName=" + user,
					cache:false
				}).done(function(){
					getAllUsers(1);
				});
			}
			
		});

		/*-------------------------修改用户信息部分---------------------------------*/

		//修改用户信息
		$(document).on('click','.moduser',function()
		{
			Mask.createMask();
			window['currentUser'] = $(this)[0].getAttribute('user');
			getCurrMess(window['currentUser'],function(data)
			{
				if(data['totalNum'] > 0)
				{
					for(var key in data['data'])
					{
						var linkman = data['data'][key]['linkman'];
						var phone = data['data'][key]['phone'];
						var email = data['data'][key]['email'];
					}
				}
				$('.content_modify').css('display','block');
				$('#modifyiframe').attr('src','modify/modifymess.html?linkman=' + linkman + "&&phone=" + phone + "&&email=" + email);
			});

		});
		//关闭修改窗口
		$('#close_modify').click(function(){
			Mask.remove();
			$('.content_modify').css('display','none');
		});
		//修改信息之间的切换
		$('#modify_basicmess').click(function()
		{
			if(!$(this).hasClass('active'))
			{
				getCurrMess(window['currentUser'],function(data)
				{
					$(this).addClass('active');
					$('#modify_role').removeClass('active');
					$('#modify_password').removeClass('active');
					if(data['totalNum'] > 0)
					{
						for(var key in data['data'])
						{
							var linkman = data['data'][key]['linkman'];
							var phone = data['data'][key]['phone'];
							var email = data['data'][key]['email'];
						}
					}
					$('#modifyiframe').attr('src','modify/modifymess.html?linkman=' + linkman + "&&phone=" + phone + "&&email=" + email);
				});
			}
		});

		$('#modify_role').click(function()
		{
			if(!$(this).hasClass('active'))
			{
				getUserRole(window['currentUser'],function(data){
					var role = data['role'];
					$(this).addClass('active');
					$('#modify_basicmess').removeClass('active');
					$('#modify_password').removeClass('active');
					$('#modifyiframe').attr('src','modify/modifyrole.html?role=' + role);
				});
				
				// $('#modifyiframe').attr('src','modify/modifyexhibit.html?pano=' + currentExhibition['path'] + "/publishdata/edit.html");
			}
		});

		$('#modify_password').click(function()
		{
			if(!$(this).hasClass('active'))
			{
				$(this).addClass('active');
				$('#modify_basicmess').removeClass('active');
				$('#modify_role').removeClass('active');
				$('#modifyiframe').attr('src','modify/modifypassword.html');
				// $('#modifyiframe').attr('src','modify/modifylogo.html?pano=' + currentExhibition['path'] + "/publishdata/update/0.jpg" + "&&name=" + currentExhibition['name']);
			}
		});
	});
})();