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
		
	$(document).ready(function(){
		//初始化用户的角色
		var role = Spolo.getUrlVars()['role'];
		$('#role').val(role);

		//获取当前正编辑的用户
		var currentUser = window.parent.currentUser;
		$('#edituser').html(currentUser.substring(1));

		//修改角色事件
		$('#btnsurerole').click(function()
		{
			$.ajax({
				url:"/web360/content/users/" + currentUser + ".setUserRole?userID=" + currentUser + "&role=" + $('#role').val(),
				cache:false,
				dataType:"json"
			}).done(function(data){
				if(data['suc'])
				{
					alert("修改成功！");
				}
			});
		});

	});
})();