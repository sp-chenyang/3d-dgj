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

/* 在元素加载完成后设置搜索框获取焦点 */
$(document).ready(function(){

	var page = 1;
	var perNum = 0;
	var pagination;
	var options = {
		"limit" : 6,
		"offset" : "0",
		"condition" : "",
		"success" : function(){}
	}
	
	$('.search_input').focus();

	$('.search_input').keypress(function(event){
		if(event.which == 13){
			var keyword = $('.search_input').val();
			if(!keyword)
				return;
			showResPane();
			page = 1;
			options["offset"] = "0";
			options["condition"] = keyword;
			createElements();
		}
	});

	/* 关闭查询结果面板 */
	$('.close').click(function(){
		$('.search_result_wrap').css({"display":"none","height":"0px"});
	});
	
	
	$('.arrowLeft').click(function(event){
		if(page > 1){
			page --;
			options["offset"] = ((page-1)*options["limit"]).toString();
			createElements();
		}
	});
	
	
	$('.arrowRight').click(function(event){
		if(page < pagination){
			options["offset"] = (page*options["limit"]).toString();
			page ++;
			createElements();
		}
	});
	
	
	function createElements(){
		destroyElements();
		options["success"] = function(data){
			console.log(data);
			pagination = Math.ceil(data["totalNum"]/options["limit"]);
			if(pagination > page){
				perNum = 6;
			}else{
				perNum = data["totalNum"]%options["limit"];
			}

			for(var index in data["data"]){
				
				var array = index.split("/");
				var urlString = "";
				for(var i = 2; i < array.length; i ++){
					urlString += (array[i] + "/");
				}
				
				$(".con").append("<div class='imgdiv'>" +
									"<a target='_blank' href='exhibition.html?url=" + urlString + "index.html'>" +
										"<img class='imgstyle' src='" + data["data"][index]["info"]["thumbnailurl"] + "'>" +
									"</a>" +
									"<div style='width:200px;	margin-left: 30px;	margin-top: 8px;	font-size: 14px;	font-weight: bold;	white-space: nowrap;	overflow: hidden;	text-overflow: ellipsis;	color: #000000;'>" +
										"名称：" + data["data"][index]["exhibitionname"] +
									"</div>" +
								"</div>");
			}
			$(".con").append("<div class='clear'></div>");
		};
		search(options);
	}
	
	
	function destroyElements()
	{
		var con = $(".con");
		for(var index = 0; index < con[0].childNodes.length; index ++)
		{
			$(con[0].childNodes[index]).remove();
			index --;
		}
	}
	
	/* 显示查询结果面板 */
	function showResPane(){
		$('.search_result_wrap').css("display","block");
		$('.search_result_wrap').animate({
			height : '500px'
		},300);
	}

	/* 根据关键字查询展厅 */
	function search(args){
		
		// 参数判断，已经参数的获取
		if(args["condition"]){
			var condition = args["condition"];
		}
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[search ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		// var url = "/web360/content/gen360/exhibitionlib.searchByExhibitionName";
		var url = "/web360/content/gen360/publish.searchByExhibitionName";
		if(condition){
			url += "?1_exhibitionname="+condition;
		}
		url = encodeURI(url);
		var data = {};
		if(args["offset"]){
			data["offset"] = args["offset"];
		}
		if(args["limit"]){
			data["limit"] = args["limit"];
		}

		// 发送ajax 请求
		$.ajax( {    
			url:url,// 跳转到 action
			data:data,
			cache:false,
			type:'get',
			dataType:'json',
			success:function(data){
				// 成功的回调函数
				args["success"](data);
			},
			error : function(error){
				// 失败的回调函数
				if(args["failed"] && typeof args["failed"] == "function"){
					args["failed"](error);
					return;
				}
				return;
			}    
		});  
	}

});