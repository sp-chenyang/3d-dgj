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


/* 处理置顶的三个展厅 */

$(document).ready(function(){

	// 初始化大图列表，设置默认显示的大图
	var curIndex = 0;
	var previewList = $('.content.preview360>li');
	showPreview(previewList[curIndex]);

	// var p3handle = setInterval(function(){
	// 	playTop3();
	// },5000);

	/* 获取置顶的三个展厅数据 */
	function getTop3Data(){
		
	}

	function playTop3(){
		var index = curIndex + 1;
		if(index == previewList.length){
			index = 0;
		}
		var id = "preview_"+index;
		var src = $('#'+id).attr('src');
		hidePreview(previewList[curIndex]);
		showPreview(previewList[index]);
		previewList[index].style.backgroundImage = src;
		curIndex = index;
	}

	function changePreview(index, previewList){
		if(!index || isNaN(index)){
			console.error('changePreview index parameter is invalid!');
			return;
		}
		var id = "preview_"+index;
		var src = $('#'+id).attr('src');
		hidePreview(previewList[curIndex]);
		showPreview(previewList[index]);
		previewList[index].style.backgroundImage = src;
		curIndex = index;
	}

	function hidePreview(domObj){
		domObj.style.opacity = 0;
		domObj.style.zIndex = 1;
	}

	function showPreview(domObj){
		domObj.style.opacity = 1;
		domObj.style.zIndex = 9;
	}


	$('.top3').find('img').hover(
		function(){
			var index = $(this).attr('id').replace('preview_','');
			changePreview(index, previewList);
		},
		function(){

		}
	);
});

