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
 **/

/* 左侧分类的相关处理代码 */

(function(){

	var currentCategory = "";
	
	$(document).ready(function(){
		var length = 0;
		// Gdata.getExhibitionCategory({
			// "success" : function(data){
				// console.log("Gdata.getExhibitionCategory success");
				// console.log(data);
				// for(var index in data){
					// for(var i in data[index]){
						// var bbb = data[index][i]["categoryname"];
						// length ++;
						// if(length%2){
							// $(".cate_list").append("<li id='" + i + "' class='cate_li li_b item1'><span></span>" + bbb + "</li>");
						// }else{
							// $(".cate_list").append("<li id='" + i + "' class='cate_li li_a item1'><span></span>" + bbb + "</li>");
						// }
					// }
				// }
				// $('.cate_list>li').mouseenter(function(){
					// currentCategory = $(this);
					// var text = currentCategory.context.childNodes[1].data.replace(/\s/g,'');
					// $('.cate_con_title').html(text);
					// $('.categoryTwo').remove();
					// for(var index in exhibitionName){
						// if(index == currentCategory[0].id){
							// for(var j in exhibitionName[index]["data"])
							// {
								// $(".category").append("<div class='categoryTwo' id='" + j + "'>" + exhibitionName[index]["data"][j]["exhibitionname"] + "</div>");
							// }
							// break;
						// }
					// } 
					
					// $('.categoryTwo').mouseenter(function(){
						// this.style["text-decoration"] = "underline";
						// this.style["cursor"] = "pointer";
					// });
					// $('.categoryTwo').mouseleave(function(){
						// this.style["text-decoration"] = "none";
						// this.style["cursor"] = "default";
					// });
					// $(".categoryTwo").click(function(){
						// var currentSonCategory = $(this);
						// console.log("当前点击的为：" + currentSonCategory[0].id);
						// window.open("exhibition.html"+"?url=" + currentSonCategory[0].id + "/index.html");
					// });
					// showCategoryDetail();
				// });
			// }
		// });
		$('.categoryTwo').mouseenter(function(){
			this.style["text-decoration"] = "underline";
			this.style["cursor"] = "pointer";
		});
		$('.categoryTwo').mouseleave(function(){
			this.style["text-decoration"] = "none";
			this.style["cursor"] = "default";
		});
		var isIE=/*@cc_on!@*/0;      //是否IE浏览器
		if(isIE){
			$(window).scroll(function(){
				var st = $(document).scrollTop();
				console.log(st);
				if(st < 80){
					$(".category_wrap").css("top", 0 );
				}else{
					$(".category_wrap").css("top", st - 80);
				}
			});
		}else{
			//获取要定位元素距离浏览器顶部的距离
			var navH = $(".category_wrap").offset().top;
			//滚动条事件
			$(window).scroll(function(){
				//获取滚动条的滑动距离
				var scroH = $(this).scrollTop();
				//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
				if(scroH>=navH){
					$(".category_wrap").css({"position":"fixed","top":0});
				}else if(scroH<navH){
					$(".category_wrap").css({"position":"static"});
				}
			});
		}
		
		$('.category_wrap').mouseenter(function(){
			showCategoryDetail();
			
		});
		$('.category_wrap').mouseleave(function(){
			hideCategoryDetail();
		});
	});

	function showCategoryDetail(){
		// if(currentCategory==""){
			// return;
		// }
		//alert(1);
		//$('.category_detail').css({"width":"0px"});
		//______________________________________________________
		//$('.category_detail').css("display","block");
		//$('.category_detail').animate({
		//	'width':'745px'
		//},300);
	}

	function hideCategoryDetail(){
		$('.category_detail').css({"display":"none","width":"0px"});
		// currentCategory = "";
	}
	
	/* 获取所有分类数据 */
	function getCategory(args){
		// 参数判断，已经参数的获取

		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[search ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		// 查询一级分类
		if(!args["url"]){
			var url = "/web360/content/gen360/category.search?limit=0&sub=0&type=glue360/folder";
		}else{
		// 查询二级分类 
			var url = args["url"];
			url += ".search?limit=0&sub=0&type=glue360/folder";
		}
		
		// 发送ajax 请求
		$.ajax( {    
			url:url,// 跳转到 action
			// data:data,
			// cache:false,
			type:'get',      
			dataType:'json',    
			success:function(data) {
				// 成功的回调函数
				console.log("[getCategory SUCC]: success to getCategory!");
				console.log(data);
				args["success"](data);
			},    
			error : function(error) {
				// 失败的回调函数
				if(args["failed"] && typeof args["failed"] == "function"){
					args["failed"](error);
					return;
				}
				console.error("[getCategory ERROR]: failed to getCategory!");
				console.error(error);
				return;
			}    
		});  
	
	}
	
	/* 获取指定分类下的所有展厅 */
	function getAllExhibitionbyCategory(args){
		// 参数的判断
		if(!args["condition"]){
			console.error("[getAllExhibitionbyCategory ERROR]: args['condition'] is undefined!");
			return;
		}
		
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[search ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		// 拼接查询参数
		var condition = args["condition"];
		var url = "/web360/content/gen360/exhibitionlib.searchByCategory?condition=" + condition;
		
		console.log(url);
		// 发送ajax 请求
		$.ajax( {    
			url:url,// 跳转到 action
			// data:data,
			// cache:false,
			type:'get',      
			dataType:'json',    
			success:function(data) {
				// 成功的回调函数
				console.log("[getAllExhibitionbyCategory SUCC]: success to getAllExhibitionbyCategory!");
				console.log(data);
				args["success"](data);
			},    
			error : function(error) {
				// 失败的回调函数
				if(args["failed"] && typeof args["failed"] == "function"){
					args["failed"](error);
					return;
				}
				console.error("[getAllExhibitionbyCategory ERROR]: failed to getAllExhibitionbyCategory!");
				console.error(error);
				return;
			}    
		});
	}
	

})();