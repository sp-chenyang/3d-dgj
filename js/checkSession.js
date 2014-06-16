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
var checkloged = true;
(function(){
	var uid = Spolo.getUserId();
	$(document).ready(function(){
		if(!checkloged){
			showLoginDom();
		}
	})
	function showLoginDom(){
		$("body").removeClass("checkloging");
	}
	if(uid=='anonymous'){
		checkloged = false;
		return;
	}
	uid = Spolo.decodeUname(uid);	//TODO: 这个地方太别扭了，需要修改
	Gdata.getUserRole({
		userID: uid,
		success: function(data){
			var role = data.role;
			switch(role){
				case 'admin':
				case 'normalAdmin':
					href = 'admin/index.html';
					break;
				case 'user':
					href = 'login.html';
					break;
				case 'maker':
					href = 'maker/index.html';
					break;
			}
			window.location.href = href;
		},
		error: function(err){
			checkloged = false;
			showLoginDom();
		}
	});
	
})();

