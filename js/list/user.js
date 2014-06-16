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
 *  author : [yangxiuwu]
 **/


$(document).ready(function(){
	var currentUser = Spolo.getUserId();
	if(currentUser == "anonymous")
	{
		// $(".header_right").append("<a href='register.html'>注册</a>");
		$(".header_right").append("<a href='login.html'>登录</a>");
	}else{
		var url = '';
		if(currentUser == 'admin')
		{
			url = '/web360/admin/index.html';
		}
		else
		{
			url = '/web360/web360gen/user/index.html';
		}
		$(".header_right").append("<a id='logout'>退出</a>");
		$(".header_right").append("<a target='_blank' href=\""+url+"\">" + Spolo.decodeUname(currentUser) + "</a>");
		
		$("#logout").click(function()
		{
			Gdata.logout({
				"success" : function()
				{
					window.location.href = "login.html";
				},
				"error" : function(error){
					console.log("Gdata.logout failed!");
					console.log(error);
				}
			});
		});
	}
});

