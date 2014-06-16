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
		$(".nav").click(function(){
			if(!$(this).hasClass('active'))
			{
				$(".nav").removeClass('active');
				$(this).addClass('active');
			}
		});
		$("#ordermgr").click(function(){
			$("#mgrcont").attr('src','orders/index.html');
		});
		$("#usermgr").click(function(){
			$("#mgrcont").attr('src','users/index.html');
		});
		
				//获取当前用户
		var currentUser = Spolo.getUserId();
		if(currentUser != 'anonymous')
		{
			$('#currentUser').html(Spolo.decodeUname(currentUser));
			$('#currentUser').attr("title",Spolo.decodeUname(currentUser));
		}
		$("#logout").click(function()
		{
			var url = "/system/sling/logout.html";
			var hrefStr = "";
			hrefStr = "../login.html";
			$.ajax({
				"url" : url,
				"cache" : false,
				"success" : function(){
					window.location.href = hrefStr;
				},
				"error" : function(error){
					console.error(error);
				}
			});
		});
	});
})();