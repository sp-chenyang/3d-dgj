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
var currentUser = Spolo.getUserId();
if(currentUser == "anonymous")
{
	window.parent.location.href = "../login.html";
	return;
}
if(currentUser != 'admin')
{
	alert("对不起，您不是管理员，拒绝访问");
	window.parent.location.href = "/web360/web360gen/user/index.html";
}