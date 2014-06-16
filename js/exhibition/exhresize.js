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
 *  description  : [保持页面整体布局的自适应]
 **/


window.onload = function(){

	function resize(){
		var header_height = $('#header').height();
		var footer_height = $('#footer').height();               
		var h = $(window).height()-header_height-footer_height;
		
		$('#center_ifrmain').height(h);
		$('#center_ifrmain').css('display','block');
		/* $('#div_ifr').height(h);
		$('#div_ifr').css('display','block'); */
	}
	resize();
	$(window).resize(function(){
		resize();
	});

};  