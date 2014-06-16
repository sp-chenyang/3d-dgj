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
 *  author : [caobin]
 *  wiki   : [这里是当前widget对应的wiki地址]
 *  description  : [保持页面整体布局的自适应]
 **/

 /*
	用户类

	封装了相关的查询、修改等方法
 */

(function(window){

/*	=====================私有方法和属性======================== */

	var uid = window.parent.SpoloUser.id;
	if(uid==undefined){
		alert("无法获取用户身份:[order.js -> window.parent.SpoloUser.id]!");
	}

	/*	获取某用户下的所有订单
	*/
	var getData = function(callback,nocache){
		if(!callback || !typeof(callback)=="function"){
			// ERROR
			return;
		}
		// 这里想做缓存
		if(User.data && !nocache){
			callback(User.data);
		}
		var url = "/web360/content/users/"+uid+".searchOrders";
		$.ajax({
			type: "GET",
			url: url,
			cache: false,
			dataType: "json"
		}).done(function(data){
			if(data.totalNum==0){
				return;
			}
			User.data = data;
			callback(data);
		});
	}

/*	=====================公共方法和属性======================== */

	/*	声明 User 对象 */
	var User = {

		
	}

	window.User = User;

})(window);
