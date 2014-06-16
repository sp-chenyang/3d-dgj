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

$(document).ready(function(){
	resize();
	function resize(){
		var header_height = $('.header').height();
		var main_height = $('.mainInner').height();
		var footer_height = $('.footer').height();
		var h = $(window).height();
		var top_height = h - header_height - main_height - footer_height ;
		if(top_height >= 0){
			$("body").eq(0).css("padding-top",top_height / 3) ;
		}else{
			$("body").eq(0).css("padding-top",0) ;
		}
	}
	
	$(window).resize(function(){
		resize();
	});
});

