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
	var exhibitionID = "";
	var page = 1;
	var perNum = 0;
	var pagination;
	var options = {
		"limit" : 6,
		"offset" : "0",
		"exhiName" : "",
		"success" : function(){}
	}
	function getUrlVars(parName){
		if(!parName){
			console.error("exhibition.js: getUrlVars() parName is undefined!");
			return;
		}
		var map = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			map[key] = value;
		});
		return map[parName];
	}
	var url = getUrlVars("url");
	var arr = url.split("/");
	exhibitionID = arr[arr.length-2];

	$('.search_input').focus();

	$('.search_input').keypress(function(event){
		if(event.which == 13){
			var keyword = $('.search_input').val();
			if(!keyword)return;
			
			showResPane();
			page = 1;
			options["offset"] = "0";
			options["exhiName"] = keyword;
			createElements();
		}
	});

	/* 关闭查询结果面板 */
	$('.close').click(function(){
		$('.search_result_wrap').css({"display":"none","height":"0px"});
	});
	
	/* 显示查询结果面板 */
	function showResPane(){
		$('.search_result_wrap').css("display","block");
		$('.search_result_wrap').animate({
			height : '500px'
		},300);
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
									"<a target='_blank' href='" + index + "/index.html'>" +
										"<img class='imgstyle' src='" + data["data"][index]["templateUrl"] + "/thumbnail/thumbnail.jpg'>" +
									"</a>" +
									"<div style='width:200px;	margin-left: 30px;	margin-top: 8px;	font-size: 14px;	font-weight: bold;	white-space: nowrap;	overflow: hidden;	text-overflow: ellipsis;	color: #000000;'>" +
										"名称：" + data["data"][index]["exhiName"] +
									"</div>" +
								"</div>");
			}
			$(".con").append("<div class='clear'></div>");
		};
		search(options);
	}

	/* 根据关键字查询展品 */
	function search(args){
		
		var exhiName = "";
		// 参数判断，已经参数的获取
		if(args["exhiName"]){
			exhiName = args["exhiName"];
		}
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[search ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		var url = "/web360/content/gen360/exhibitionlib.searchByExhibitionName";
		if(exhiName){
			url += "?exhiName="+exhiName;
		}
		console.log(url);
		// 发送ajax 请求
		Gdata.getExhibitsByPubE({
			"exhiName" : exhiName,
 		    "exhibitionID" : exhibitionID,         
 		      	success : function(data){      
 		            console.log("Gdata.getExhibitsByPubE success"); 
 		            console.log(data); 
 		            args["success"](data);
 		     	},
 		     	error : function(){
 		     		// 失败的回调函数
					if(args["failed"] && typeof args["failed"] == "function"){
						args["failed"](error);
						return;
					}
					console.error("[search ERROR]: failed to search!");
					console.error(error);
					return;
 		     	}
 		});
	}
});

 






