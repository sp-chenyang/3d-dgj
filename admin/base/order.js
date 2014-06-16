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
 *  author : [caobin][yuxiangliang]
 *  wiki   : [这里是当前widget对应的wiki地址]
 *  description  : [订单管理 -- 订单类]
 **/

 /*
	订单类

	封装了订单相关的查询、修改状态等方法
 */

(function(window){

/*	=====================私有方法和属性======================== */

	var uid;
	if(window.parent.SpoloUser){
		uid = window.parent.SpoloUser.id;
	}
	if(uid==undefined){
		uid = Spolo.getUserId();
	}

    /**
     * 获取某用户下的订单
     * @param callback   查询完订单后的回调函数
     * @param state     订单状态
     * @param paginationData   分页查询
     * @param nocache   是否使用缓存
     */
    var getData = function (callback, state, paginationData, nocache) {
		if(!callback || !typeof(callback)=="function"){
			// ERROR
			return;
		}
		var url = "/web360/content/users.searchOrders1?1_state="+state;
		$.ajax({
			type: "GET",
			url: url,
			cache: false,
			dataType: "json",
            data : paginationData       // 用于分页
		}).done(function(data){
			if(data.totalNum==0){
				return;
			}
			Order.data = data;
			callback(data);
		});
	}

    /**
     *根据查询状态查询订单
     * @param callback  查询完订单后的回调函数
     * @param state 订单状态
     * @param paginationData    分页查询
     * @param nocache   是否使用缓存
     */
    var groupByState = function (callback, state, paginationData, nocache) {
		if(nocache==undefined){                                 // 其实可以把数据取出来之后直接分组，
                                                                 // 这样页面需要数据的时候可以直接取
			nocache = false;
		}
		if(!state){
			alert('admin/paid_confirm.js groupByState() state param is undefined!!');
			return;
		}
		getData(function(data){
			var orders = data.data;
			var grounped = {};
			var key,
				item;
			for(key in orders){
				item = orders[key];
				if(item.state == state){
					grounped[key] = item;
				}
			}
            grounped["totalNum"] = data["totalNum"] ;        // 返回总个数，用于分页
			callback(grounped);
		},state, paginationData, nocache);
	}
	/*	获取指定URL下订单的信息
	*/
	var getOrderDetail = function(url, callback){
		if(!url){
			// ERROR
			alert('order.js getOrderDetail() param url is undefined!');
			return;
		}
		url += '.detail';
		if(!callback || !typeof(callback)=="function"){
			// ERROR
			alert('order.js getOrderDetail() param callback is undefined!');
			return;
		}
		$.ajax({
			type: "GET",
			url: url,
			cache: false,
			dataType: "json"
		}).done(function(data){
			//var arr = tidyOrderTasks(data);
			callback(data);
		});
	}

	/*	整理订单详情数据，主要是获取任务列表
	*/
	var tidyOrderTasks = function(data){
		if(!data){
			return;
		}
		var tasks = [],
			key,item;
		for(key in data){
			item = data[key];
			if(item['refer']==undefined){
				continue;
			}
			tasks.push(item);
		}
		return tasks;
	}


/*	=====================公共方法和属性======================== */

	/*	声明 Order 对象 */
	var Order = {

		state : {
			PAYING : "PAYING",		// 付款确认中的订单
			MAKING : "MAKING",		// 制作中的订单
			COMPLETED : "COMPLETED"	// 已经完成的订单
		},

		data : null,

        /**
         * 获取所有等待确认付款中的订单
         * @param callback  查询完订单后的回调函数
         * @param paginationData    分页查询
         */
        getPaying: function (callback, paginationData) {
            // 获取订单数据
            groupByState(callback, this.state.PAYING, paginationData);
        },

        /**
         * 获取所有制作中的订单
         * @param callback  查询完订单后的回调函数
         * @param paginationData    分页查询
         */
        getMaking: function (callback, paginationData) {
            // 获取订单数据
            groupByState(callback, this.state.MAKING, paginationData);
        },

        /**
         * 获取所有制作完成订单
         * @param callback  查询完订单后的回调函数
         * @param paginationData    分页查询
         */
        getCompleted: function (callback, paginationData) {
            // 获取订单数据
            groupByState(callback, this.state.COMPLETED, paginationData);
        },

		/*	获取订单下的所有任务
			@param url : 订单的地址， glue360/order 类型
		*/
		getTasks : function(url, callback){
			getOrderDetail(url, callback);
		}
	}

	window.Order = Order;

})(window);
